import { ChangeDetectorRef, Component, Inject, Renderer2 } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { passwordMatchValidator } from 'src/app/helpers/passwordConfirmValidator';
import { Web3ClientProvider } from 'src/app/providers/web3';
import { AccountProvider } from '../../providers';

@Component({
  selector: 'import-privatekey-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})

export class ImportPrivateKeyDialog {

  submit = false;

  accountForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    privateKey: new UntypedFormControl('', [
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

  translations: { [key: string]: string | Function | any } = this.data.translations;

  constructor(
    private router: Router,
    private render: Renderer2,
    private web3: Web3ClientProvider,
    private change: ChangeDetectorRef,
    private accountProvider: AccountProvider,
    private ref: MatDialogRef<ImportPrivateKeyDialog>,
    @Inject(MAT_DIALOG_DATA) private data: IObjectKeys,
  ) { }

  onSubmit() {
    if (this.accountForm.valid) {
      const { privateKey, password } = this.accountForm.value;
      const account = this.web3.privateKeyToAccount({ privateKey, password } );
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
    this.ref.close();

  }

  close(){
    this.ref.close();
  }


}
