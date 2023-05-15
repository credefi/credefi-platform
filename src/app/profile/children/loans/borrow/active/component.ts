import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, PLATFORM_ID, Inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { skip, Subscription } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { trackById } from 'src/app/helpers/track';
import { LoanProvider } from 'src/app/profile/providers';
import { Web3ClientProvider } from 'src/app/providers/web3';
import { Statuses } from 'src/globals/config';

@Component({
  selector: 'loans-borrow-active-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoansBorrowActiveComponent implements OnInit, OnDestroy {

  routeListenr!: Subscription;
  trackByFn = trackById;

  page = 0;
  limit = 20;
  Statuses = Statuses;

  _list: { count: number, data: IObjectKeys[] } = { count: 0, data: [] }

  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  constructor(
    private router: Router,
    private web3: Web3ClientProvider,
    private change: ChangeDetectorRef,
    private loanProvider: LoanProvider,
    private activateRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const { list } = this.activateRoute.snapshot.data;
    this.list = list;
    this.parsePage();
  }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {

      this.routeListenr = this.activateRoute.queryParams.pipe(skip(1)).subscribe((params) => {
        this.parsePage();
        this.setList();
      });

    }

  }

  ngOnDestroy() {
    if (this.routeListenr) {
      this.routeListenr.unsubscribe();
    }
  }

  parsePage() {
    const { skip = 0 } = this.activateRoute.snapshot.queryParams;
    this.page = Math.round(skip / this.limit);
  }

  get pages() {

    const countPages = this.pagesCount;
    const array = [];

    for (let i = 0; i < countPages; i++) {

      if (i >= this.page - 2 && i <= this.page + 2) {
        array.push({
          name: `${i + 1}`,
          index: i
        });
      }

    }

    let { 0: first, [array.length - 1]: last } = array;

    if (first && first.index != 0) {
      array.unshift({
        name: `..`,
        index: -1
      });
      array.unshift({
        name: `1`,
        index: 0
      });
    }

    if (last && last.index != countPages - 1) {
      array.push({
        name: `..`,
        index: -1
      });
      array.push({
        name: `${countPages}`,
        index: countPages - 1
      });
    }

    return array;
  }

  get pagesCount() {
    const limit = this.limit;
    const count = this.list.count;
    const countPages = Math.ceil(count / limit);
    return countPages;
  }

  setPage(p: number) {
    if (p > -1) {
      this.page = p;
      this.setNavigation();
      this.change.markForCheck();
    }
  }

  setNavigation() {

    const query: IObjectKeys = {
      skip: this.page * this.limit,
    };

    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParamsHandling: "merge",
      replaceUrl: true,
      queryParams: query,
    });
  }

  setList() {

    const filter: {
      skip: number,
      limit: number,
      text?: string | null
    } = {
      skip: this.page * this.limit,
      limit: this.limit,
    };

    this.loanProvider.getList(filter).subscribe((data) => {
      this.list = data;
      this.change.markForCheck();
    });
  }

  set list(list: IObjectKeys) {
    this._list.count = list.count;
    this._list.data = list.data.map((item: IObjectKeys) => {
      const currencyIndex = this.web3.currencies.findIndex((e: IObjectKeys) => e.address == item.currencyAddress);

      item.currency = this.web3.currencies[currencyIndex];
      return item;
    });
  }

  get list() {
    return this._list;
  }


}
