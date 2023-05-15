import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { validateKeyStore } from 'src/app/helpers/keyStoreValidator';
import { UserProvider } from '../providers';

@Component({
  selector: 'admin-wallet-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminWalletPage {

  isSubmit = false;

  form = new FormGroup({
    keystore: new FormControl('', [
      Validators.required,
      validateKeyStore
    ])
  });

  translations: { [key: string]: string | Function | any } = this.activated.snapshot.data.translations;

  constructor(
    private change: ChangeDetectorRef,
    private activated: ActivatedRoute,
    private userProvider: UserProvider,
  ) {
    const { keystore } = this.activated.snapshot.data;
    if (keystore) {
      try {
        this.form.patchValue({ keystore: JSON.stringify(keystore) })
      } catch (e) { }
    }
  }

  submit() {
    if (this.form.valid) {
      const { keystore = ""} = this.form.value;
      this.isSubmit = true;
      this.change.markForCheck();
      this.userProvider.setKeyStore(JSON.parse(keystore as string)).subscribe(({ result }) => {
        this.isSubmit = false;
        this.change.markForCheck();
      });
    }
  }

}
