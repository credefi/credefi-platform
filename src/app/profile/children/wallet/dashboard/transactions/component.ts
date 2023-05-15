import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnDestroy, OnInit, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { trackById } from 'src/app/helpers/track';
import { SocketProvider } from 'src/app/profile/providers';
import { Web3ClientProvider } from 'src/app/providers/web3';
import { TransactionTypes } from 'src/globals/config';

@Component({
  selector: 'transactions-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TransactionsComponent implements OnInit, OnDestroy {

  postTransaction!: Subscription;
  transactions!: IObjectKeys[];

  trackById = trackById;
  types = TransactionTypes;
  currenciesObject = this.web3.currenciesObject;
  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  constructor(
    private web3: Web3ClientProvider,
    private activateRoute: ActivatedRoute,
    private change: ChangeDetectorRef,
    private socketProvider: SocketProvider,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const { transactions = [] } = this.activateRoute.snapshot.data;
    this.transactions = transactions.map((item: IObjectKeys) => {
      item.from = this.web3.toHex(item.from);
      item.transaction = this.web3.toHex(item.transaction);
      item.to = this.web3.toHex(item.to);
      return item;
    });
  }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {

      this.postTransaction = this.socketProvider.postTransaction.subscribe((item) => {
        item.from = this.web3.toHex(item.from);
        item.transaction = this.web3.toHex(item.transaction);
        item.to = this.web3.toHex(item.to);
        this.transactions.unshift(item);
        this.change.markForCheck();
      });

    }

  }

  ngOnDestroy() {
    if (this.postTransaction) {
      this.postTransaction.unsubscribe();
    }
  }

}
