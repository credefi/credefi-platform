import { Component, ChangeDetectionStrategy, Inject, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { LOCAL_STORAGE } from 'src/app/modules/local-storage';
import { WINDOW } from 'src/app/modules/window';
import { MapProvider, UserProvider } from 'src/app/providers';
import { METAMASK_ACTIONS } from 'src/environments/environment';
import { Environment } from 'src/globals/config';

@Component({
  selector: 'referral-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ReferralDialog implements OnInit, OnDestroy {

  userData!: IObjectKeys;
  address!: string;
  subscription!: Subscription;
  userSubscription!: Subscription;

  disabled = false;
  url = `${Environment.client_url}/l`;
  translations: { [key: string]: string | Function | any } = this.data?.translations;

  constructor(
    private matSnack: MatSnackBar,
    private user: UserProvider,
    private mapProvider: MapProvider,
    private change: ChangeDetectorRef,
    private ref: MatDialogRef<ReferralDialog>,
    @Inject(WINDOW) private window: IObjectKeys,
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    @Inject(MAT_DIALOG_DATA) public data: IObjectKeys
  ) {
   }

  connect() {

    if (this.window?.ethereum?.isMetaMask) {
      return this.window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((data: string[]) => {
          const item: string = data?.[0];
          if (item != null) {
            this.mapProvider.set(MapProvider.METAMASK, item);
            this.localStorage.setItem(MapProvider.METAMASK, METAMASK_ACTIONS.initialized);
          }
        })
        .catch((err: Error) => {
          console.error(err);
        });
    }

  }

  ngOnInit() {
    this.address = this.mapProvider.get(MapProvider.METAMASK);
    this.userData = this.mapProvider.get(MapProvider.USER);

    this.subscription = this.mapProvider.setSubsription(MapProvider.METAMASK).subscribe((item: string) => {
      this.address = item;
      this.change.markForCheck();
    });

    this.userSubscription = this.mapProvider.setSubsription(MapProvider.USER).subscribe((item: IObjectKeys) => {
      this.userData = item;
      this.change.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  posReferral() {
    if (this.address) {
      this.disabled = true;
      this.change.markForCheck();
      this.user.postReferral({ address: this.address }).subscribe(({ result }) => {
        if (result) {
          this.userData = result
          this.mapProvider.set(MapProvider.USER, result);
        }
        this.disabled = false;
        this.change.markForCheck();
      });
    }
  }

  async copyCode() {
    try {

      await this.window.navigator.clipboard.writeText(this.userData?.referral?.hash);
      this.openSnackBarCode()
    } catch (err) {
      console.error('Failed to copy: ', err);
    }

  }

  openSnackBarCode() {
    this.matSnack.open(this.translations['code-snack'], this.translations['ok'], {
      duration: 3000
    });
  }

  async copyUrl() {
    try {

      await this.window.navigator.clipboard.writeText(`${this.url}/${this.userData?.referral?.hash}`);
      this.openSnackBarCode()
    } catch (err) {
      console.error('Failed to copy: ', err);
    }

  }
  openSnackBarLink() {
    this.matSnack.open(this.translations['link-snack'], this.translations['ok'], {
      duration: 3000
    });

  }


  close() {
    this.ref.close();
  }

}
