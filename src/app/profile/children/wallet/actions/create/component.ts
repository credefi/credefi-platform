import { Component, ChangeDetectionStrategy, Renderer2, ChangeDetectorRef } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AccountProvider } from 'src/app/profile/providers';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { passwordMatchValidator } from 'src/app/helpers/passwordConfirmValidator';
import { Web3ClientProvider } from 'src/app/providers/web3';

@Component({
  selector: 'wallet-create-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WalletCreateComponent {

  submit = false;

  accountForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255)
    ]),
    passwordConfirm: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255)
    ])
  }, passwordMatchValidator('password', 'passwordConfirm'));

  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  constructor(
    private router: Router,
    private render: Renderer2,
    private change: ChangeDetectorRef,
    private web3: Web3ClientProvider,
    private activateRoute: ActivatedRoute,
    private accountProvider: AccountProvider
  ) { }

  onSubmit() {
    if (this.accountForm.valid) {
      const { password } = this.accountForm.value;
      const account = this.web3.createAccount({ password });
      this.submit = true;
      this.change.markForCheck();

      const value = this.accountForm.value;
      value.address = account?.address;
      value.keyStore = account;

      this.accountProvider.post(value).subscribe((res: any) => {
        this.submit = false;
        this.change.markForCheck();
        if (res.result) {
          this.generateFile(value);
          this.router.navigateByUrl('/profile/wallet/info');
        }
      });

    }

  }

  generateFile(data: IObjectKeys) {
    const element = this.render.createElement('a');

    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data.keyStore)));
    element.setAttribute('download', `0x${data.keyStore.address}.json`);
    element.click();
    element.remove();

  }

}
