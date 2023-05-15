import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { IObjectKeys } from 'src/app/helpers/interfaces';
import { LendingProvider, SocketProvider, ConfigurationProvider } from '../providers';
import { Statuses } from 'src/globals/config';
import { networks } from 'src/environments/environment';
import { DecryptDialog } from 'src/app/profile/shared/decrypt-dialog/component';
import { Web3ClientProvider } from 'src/app/providers/web3';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog';
import { MaturityDialog } from '../shared/maturity-dialog/component';

@Component({
  selector: 'admin-lent-loan-requests-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminLentLoanRequestsPage implements OnInit, OnDestroy {

  postLending!: Subscription;
  putLending!: Subscription;

  sending = false;
  processing = false;
  statuses = Statuses
  routeListenr!: Subscription;

  timeOutListener!: any;
  timeOut = 250;

  text: string = '';
  page = 0;
  limit = 20;

  year!: number | undefined | null;
  month!: number | undefined | null;
  day!: number | undefined | null;

  _list: { count: number, data: IObjectKeys[] } = { count: 0, data: [] }
  translations: { [key: string]: string | Function | any } = this.activatedRoute.snapshot.data.translations;

  date!: Date | null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private render: Renderer2,
    private socket: SocketProvider,
    private web3: Web3ClientProvider,
    private change: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private lendingProvider: LendingProvider,
    private configuration: ConfigurationProvider,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    const { processing, year, month, day } = this.activatedRoute.snapshot.queryParams;

    if (processing) {
      this.processing = processing;
    }

    this.year = year;
    this.month = month;
    this.day = day;

    if (year != null && month != null && day != null) {
      this.date = new Date(year, month - 1, day);
    }

    this.list = this.activatedRoute.snapshot.data.list;

    this.parsePage();
  }

  set list(list: IObjectKeys) {
    this._list.count = list.count;
    this._list.data = list.data.map((item: IObjectKeys) => {
      const currencyIndex = networks[item.chain as keyof typeof networks].currencies.findIndex((e) => e.address == item.currencyAddress);
      let { additionalInterest = 0, processing = 0 } = item;

      item.groupOneProfit = (item.groupOneAmount * (item.months / 12) * ((item.configuration.groupOneInterest + additionalInterest) / 100)).toFixed(6);
      item.groupTwoProfit = (item.groupTwoAmount * (item.months / 12) * ((item.configuration.groupTwoInterest + additionalInterest) / 100)).toFixed(6);
      item.groupThreeProfit = (item.groupThreeAmount * (item.months / 12) * ((item.configuration.groupThreeInterest + additionalInterest) / 100)).toFixed(6);
      item.groupFourProfit = (item.groupFourAmount * (item.months / 12) * ((item.configuration.groupFourInterest + additionalInterest) / 100)).toFixed(6);

      if (item.configuration.groupOneStatus == Statuses.confirmed.key) {
        processing += (Number(item.groupOneProfit) + item.groupOneAmount);
      }

      if (item.configuration.groupTwoStatus == Statuses.confirmed.key) {
        processing += (Number(item.groupTwoProfit) + item.groupTwoAmount);
      }

      if (item.configuration.groupThreeStatus == Statuses.confirmed.key) {
        processing += (Number(item.groupThreeProfit) + item.groupThreeAmount);
      }

      if (item.configuration.groupFourStatus == Statuses.confirmed.key) {
        processing += (Number(item.groupFourProfit) + item.groupFourAmount);
      }

      item.processing = processing;
      item.currency = networks[item.chain as keyof typeof networks].currencies[currencyIndex];
      item.prevDate = item.createdAt;
      return item;
    });
  }

  get list() {
    return this._list;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      this.postLending = this.socket.postLending.subscribe((data) => {
        this.setList();
      });

      this.putLending = this.socket.putLending.subscribe(() => {
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
    if (this.postLending) {
      this.postLending.unsubscribe();
    }
    if (this.putLending) {
      this.putLending.unsubscribe();
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
      text: this.text?.length > 0 ? this.text : null,
      processing: this.processing ? true : null,
      year: this.year,
      month: this.month,
      day: this.day
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
      text?: string,
      processing?: boolean,
      year?: number | null,
      month?: number | null,
      day?: number | null,
    } = {
      skip: this.page * this.limit,
      limit: this.limit,
      text: this.text,
      year: this.year,
      month: this.month,
      day: this.day
    };

    if (this.processing) {
      filter.processing = true;
    }

    this.lendingProvider.getList(filter).subscribe((data) => {
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
    this.lendingProvider.put({
      lendingKey: item.key, update: {
        configuration: item.configuration
      }
    }).subscribe();
  }

  onClear() {
    this.text = '';
    this.setNavigation();
  }

  showProcessing(event: MatCheckboxChange) {
    this.page = 0;
    this.processing = event.checked;
    if (!this.processing) {
      this.date = null;
      this.year = null;
      this.month = null;
      this.day = null;
    }
    this.setNavigation();
  }

  send(index: number) {
    this.sending = true;
    this.configuration.getCurrencyWallet().subscribe(({ result, error }) => {
      if (result) {
        const item = this.list.data[index];
        return this.dialog.open(DecryptDialog, {
          scrollStrategy: new NoopScrollStrategy(),
          data: {
            translations: this.translations,
            keyStore: result,
            callback: (data: string) => {
              return this.web3.sendCustomCoin({ amount: item.processing / item.months, privateKey: data, from: result.address, contract: item.currency, to: item.walletAddress, noncePlus: 0 });
            }
          }
        }).afterClosed().subscribe((data) => {
          this.sending = false;
          this.change.markForCheck();
        });
      }
      this.sending = false;
      this.change.markForCheck();
    });
  }

  trackByKey(index: number, item: IObjectKeys) {
    return item.key;
  }

  orderKeyValue() {
    return 0;
  }

  onDateChange(item: IObjectKeys) {

    return this.dialog.open(ConfirmDialog, {
      width: '350px',
      scrollStrategy: new NoopScrollStrategy(),
      disableClose: true,
      data: {
        title: this.translations['alert-title'],
        message: this.translations['alert-text'],
        buttons: [
          {
            label: this.translations['alert-button'],
            handler: () => {
              item.createdAt = item.prevDate;
              this.change.markForCheck();
            }
          },
          {
            label: this.translations['ok-button'],
            handler: () => {
              item.prevDate = item.createdAt;
              this.lendingProvider.put({
                lendingKey: item.key,
                update: {
                  createdAt: item.createdAt
                }
              }).subscribe();
            }
          }
        ]
      }
    });

  }

  export() {
    const filter: IObjectKeys = {};
    if (this.year != null && this.month != null && this.day != null) {
      filter.year = this.year;
      filter.month = this.month;
      filter.day = this.day;
    }

    this.lendingProvider.getExport(filter).subscribe((data) => {
      this.generateFile(data)
    });
  }

  generateFile(data: ArrayBuffer) {

    const item = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const element = this.render.createElement('a');
    const date = new Date();
    const day = date.getDate()
    const month = date.getMonth();
    const year = date.getFullYear();


    element.setAttribute('href', URL.createObjectURL(item));
    element.setAttribute('download', `export ${day}_${month}_${year}.xlsx`);
    element.click();
    element.remove();

  }

  onSortDate() {
    this.year = (this.date as Date).getFullYear();
    this.month = (this.date as Date).getMonth() + 1;
    this.day = (this.date as Date).getDate();
    this.page = 0;
    this.setNavigation();
  }

  openMaturity(item: IObjectKeys) {
    return this.dialog.open(MaturityDialog, {
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        payments: item.payments
      }
    });
  }

}
