import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { LoanProvider, SocketProvider } from '../providers';
import { Statuses, Environment } from 'src/globals/config';
import { networks } from 'src/environments/environment';

@Component({
  selector: 'admin-loan-requests-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminLoanRequestsPage implements OnInit, OnDestroy {

  postLoan!: Subscription;
  putLoan!: Subscription;
  routeListenr!: Subscription;

  statuses = Statuses;
  cloud_url = Environment.cloud_url;

  timeOutListener!: any;
  timeOut = 250;

  text: string = '';
  page = 0;
  limit = 20;

  _list: { count: number, data: IObjectKeys[] } = { count: 0, data: [] }
  translations: { [key: string]: string | Function | any } = this.activatedRoute.snapshot.data.translations;

  constructor(
    private router: Router,
    private socket: SocketProvider,
    private change: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private loanProvider: LoanProvider,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.list = this.activatedRoute.snapshot.data.list;
    this.parsePage();
  }

  set list(list: IObjectKeys) {
    this._list.count = list.count;
    this._list.data = list.data.map((item: IObjectKeys) => {
      const currencyIndex = networks[item.chain as keyof typeof networks].currencies.findIndex((e) => e.address == item.currencyAddress);
      item.currency = networks[item.chain as keyof typeof networks].currencies[currencyIndex];
      return item;
    });
  }

  get list() {
    return this._list;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      this.postLoan = this.socket.postLoan.subscribe((data) => {
        this.setList();
      });

      this.putLoan = this.socket.putLoan.subscribe(() => {
        this.setList();
      });

      this.routeListenr = this.activatedRoute.queryParams.pipe(skip(1)).subscribe((params) => {
        this.parsePage();
        this.setList();
      });
    }
  }

  ngOnDestroy() {
    if (this.routeListenr) {
      this.routeListenr.unsubscribe();
    }
    if (this.postLoan) {
      this.postLoan.unsubscribe();
    }
    if (this.putLoan) {
      this.putLoan.unsubscribe();
    }
  }

  parsePage() {
    const { skip = 0, text = '' } = this.activatedRoute.snapshot.queryParams;
    this.text = text;
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
      text: this.text?.length > 0 ? this.text : null
    };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: "merge",
      replaceUrl: true,
      queryParams: query,
    });
  }

  setList() {

    const filter: {
      skip: number,
      limit: number,
      text?: string
    } = {
      skip: this.page * this.limit,
      limit: this.limit,
      text: this.text
    };

    this.loanProvider.getList(filter).subscribe((data) => {
      this.list = data;
      this.change.markForCheck();
    });
  }

  onFilter() {

    if (this.timeOutListener) {
      clearTimeout(this.timeOutListener);
    }

    this.timeOutListener = setTimeout(() => {
      this.page = 0;
      this.setNavigation();
    }, this.timeOut);

  }

  onChange(i: number) {
    const item = this.list.data[i];
    this.loanProvider.put({
      loanKey: item.key, update: {
        status: item.status
      }
    }).subscribe();
  }

  onClear() {
    this.text = '';
    this.setNavigation();
  }

  trackByKey(index: number, item: IObjectKeys) {
    return item.key;
  }

  orderKeyValue() {
    return 0;
  }

}
