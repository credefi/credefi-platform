import { Component, ChangeDetectionStrategy, ChangeDetectorRef, PLATFORM_ID, Inject, HostListener, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { UserProvider, SocketProvider } from '../providers';
import { UserRoles } from 'src/globals/config';
import { BasicUser } from 'src/app/model';
import { WINDOW } from 'src/app/modules/window';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'admin-users-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminUsersPage implements OnInit, OnDestroy {

  users: BasicUser[];
  postUser!: Subscription;
  putUser!: Subscription;
  translations: { [key: string]: string | Function | any } = this.ActiveRoute.snapshot.data.translations;

  text = '';
  skip = 50;
  limit = 50;
  loaded = false;
  isLoading = false;
  selectUserRoles = {
    all: {
      id: -1,
      key: 'all'
    },
    ...UserRoles
  };

  userRoles = UserRoles;

  readonly loadHeight = 1500;

  filterRole = this.selectUserRoles.all.key;
  @ViewChild('loadMore') loadMore!: ElementRef;

  constructor(
    private Router: Router,
    private ActiveRoute: ActivatedRoute,
    private UserProvider: UserProvider,
    private SocketProvider: SocketProvider,
    @Inject(WINDOW) private window: Window,
    private ChangeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const { users = [] } = ActiveRoute.snapshot.data;
    const { skip = 50, role = this.selectUserRoles.all.key, search = '' } = ActiveRoute.snapshot.queryParams;

    this.text = search;
    this.users = users;
    this.skip = Number(skip);
    this.filterRole = role;

    if (users.length < this.limit) {
      this.loaded = true;
    }
  }

  @HostListener("window:scroll", ['$event']) onWindowScroll(event: Event) {

    const height = this.window.pageYOffset;

    if (this.isLoading || this.loaded) {
      return;
    }

    if (this.loadHeight > this.loadMore.nativeElement.offsetTop - height) {
      this.isLoading = true;
      this.skip += this.limit;
      this.setNavigation()
    }

  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      this.ActiveRoute.queryParams.pipe(skip(1)).subscribe((params) => {
        if (params.search) {
          return this.search();
        }
        if (Object.keys(params).length == 0) {
          this.setDefault();
        }
        this.onLoadUsers();
      });

      this.postUser = this.SocketProvider.postUser.subscribe((user) => {

        this.skip++;

        const query: IObjectKeys = {
          skip: 0,
          limit: this.skip
        };

        if (this.filterRole != null && this.filterRole != this.selectUserRoles.all.key) {
          query.role = this.filterRole;
        }

        this.UserProvider.get(query).subscribe((data) => {
          this.users = [];
          this.setUsers(data);
        });

      });
      this.putUser = this.SocketProvider.putUser.subscribe((user) => {
        if (this.updateUsers(user)) {
          this.ChangeDetectorRef.markForCheck();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.postUser) {
      this.postUser.unsubscribe();
    }
    if (this.putUser) {
      this.putUser.unsubscribe();
    }
  }

  setDefault() {
    this.text = '';
    this.users = [];
    this.loaded = false
    this.skip = this.limit;
    this.filterRole = this.selectUserRoles.all.key;
  }

  updateUsers(user: IObjectKeys) {
    for (let i = 0; i < this.users.length; i++) {
      if (user.userId === this.users[i]._id) {
        this.users[i] = new BasicUser({
          ...this.users[i],
          ...user.data
        })
        return true;
      }
    }
    return false;
  }

  onLoadUsers() {
    if (!this.loaded) {

      if (this.filterRole != this.selectUserRoles.all.key) {
        return this.UserProvider.get({ skip: this.skip - this.limit, limit: this.limit, role: this.filterRole }).subscribe((data) => {
          this.isLoading = false;
          this.setUsers(data);
        });
      }

      this.UserProvider.get({ skip: this.skip - this.limit, limit: this.limit }).subscribe((data) => {
        this.isLoading = false;
        this.setUsers(data);
      });

    }
  }

  setUsers(users: BasicUser[]) {

    this.users = [...this.users, ...users];

    if (users.length < this.limit) {
      this.loaded = true;
    }

    this.ChangeDetectorRef.markForCheck();
  }

  setNavigation() {

    if (this.text.length > 0) {
      return this.Router.navigate([], {
        relativeTo: this.ActiveRoute,
        replaceUrl: true,
        queryParams: {
          search: this.text
        },
      });
    }

    const query: { [key: string]: any } = {
      skip: this.skip,
    };

    if (this.filterRole != null && this.filterRole != this.selectUserRoles.all.key) {
      query.role = this.filterRole;
    }

    this.Router.navigate([], {
      relativeTo: this.ActiveRoute,
      replaceUrl: true,
      queryParams: query,
    });
  }

  onChangeRole(event: MatSelectChange, index: number) {
    const user = this.users[index];
    this.UserProvider.updateRole(user._id, {
      role: event.value
    }).subscribe();
  }

  onFilter(event: MatSelectChange) {
    this.filterRole == event.value;
    this.skip = this.limit;
    this.loaded = false;
    this.text = '';
    this.users = [];
    this.setNavigation();
  }

  onKeyUp() {
    if (this.text.length == 0) {
      this.setDefault();
    }
    this.setNavigation();
  }

  search() {
    return this.UserProvider.searchUser({ email: this.text }).subscribe((data) => {
      this.users = data;
      this.ChangeDetectorRef.markForCheck();
    });
  }

  orderKeyValue(akv: any, bkv: any) {
    return 0;
  }

  trackById(index: number, item: IObjectKeys) {
    return item._id;
  }

}
