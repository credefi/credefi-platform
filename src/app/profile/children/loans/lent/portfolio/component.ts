import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, PLATFORM_ID, Inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { skip } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { IObjectKeys } from 'src/app/helpers/interfaces';
import { LendingProvider } from '../../../../providers';
import { trackById } from 'src/app/helpers/track';
import { Statuses } from 'src/globals/config';
import { Web3ClientProvider } from 'src/app/providers/web3';
import { networks } from 'src/environments/environment';

@Component({
  selector: 'loans-let-portfolio-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoansLentPortfolioComponent implements OnInit, OnDestroy {

  trackByFn = trackById;
  routeListenr!: Subscription;

  page = 0;
  limit = 50;
  types = ['One', 'Two', 'Three', 'Four'];

  statuses = Statuses;

  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;
  _list: { count: number, data: IObjectKeys[] } = { count: 0, data: [] }
  _items: IObjectKeys[] = [];

  constructor(
    private router: Router,
    private web3: Web3ClientProvider,
    private change: ChangeDetectorRef,
    private lendings: LendingProvider,
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

  get items(){
    return this._items;
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

    this.lendings.getList(filter).subscribe((data) => {
      this.list = data;
      this.change.markForCheck();
    });
  }

  set list(list: IObjectKeys) {
    this._list.count = list.count;
    this._items = [];
    this._list.data = list.data.map((item: IObjectKeys) => {

      const currencyIndex = networks[item.chain as keyof typeof networks]?.currencies.findIndex((e) => e.address == item.currencyAddress);
      const { additionalInterest = 0 } = item;

      item.groupOneProfit = Number((item.groupOneAmount * (item.months / 12) * ((item.configuration.groupOneInterest + additionalInterest) / 100)).toFixed(6));
      item.groupTwoProfit = Number((item.groupTwoAmount * (item.months / 12) * ((item.configuration.groupTwoInterest + additionalInterest) / 100)).toFixed(6));
      item.groupThreeProfit = Number((item.groupThreeAmount * (item.months / 12) * ((item.configuration.groupThreeInterest + additionalInterest) / 100)).toFixed(6));
      item.groupFourProfit = Number((item.groupFourAmount * (item.months / 12) * ((item.configuration.groupFourInterest + additionalInterest) / 100)).toFixed(6));

      item.profit = Number(item.groupOneProfit) + Number(item.groupTwoProfit) + Number(item.groupThreeProfit) + Number(item.groupFourProfit);

      const date = new Date();

      for (const p of item.payments) {
        const d = new Date(p.paymentDate);
        if (date.getTime() < d.getTime()) {
          item.nextPaymentDate = d;
          item.nextPaymentGroupOneAmount = p.groupOneAmount;
          item.nextPaymentGroupTwoAmount = p.groupTwoAmount;
          item.nextPaymentGroupThreeAmount = p.groupThreeAmount;
          item.nextPaymentGroupFourAmount = p.groupFourAmount;
          break;
        }
      }

      item.currency = networks[item.chain as keyof typeof networks]?.currencies[currencyIndex];

      for(let type of this.types){
        if(item[`group${type}Amount`] > 0 && item.configuration[`group${type}Status`] != this.statuses.rejected.key){

          this._items.push({
            createdAt: item.createdAt,
            name: item.configuration[`group${type}Name`],
            interest: item.configuration[`group${type}Interest`],
            status: item.configuration[`group${type}Status`],
            amount: item[`group${type}Amount`],
            totalInterest: item[`group${type}Profit`],
            duration: item.months,
            nextPaymentDate: item.nextPaymentDate,
            nextPayment: item[`nextPaymentGroup${type}Amount`]
          });

        }

      }
      

      return item;
    });
  }

  get list() {
    return this._list;
  }

}
