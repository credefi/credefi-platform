import { Component, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IObjectKeys } from 'src/app/helpers/interfaces';

import { Web3ClientProvider } from 'src/app/providers/web3';

@Component({
  selector: 'private-key-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PrivateKeyDialog {

  privateKey!: string | null;

  privateKeyForm = new UntypedFormGroup({
    password: new UntypedFormControl('', [
      Validators.required
    ])
  });

  translations: { [key: string]: string | Function | any } = this.data.translations;

  constructor(
    private web3: Web3ClientProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private ref: MatDialogRef<PrivateKeyDialog>,
    @Inject(MAT_DIALOG_DATA) private data: IObjectKeys,
  ) { }

  exportPrivateKey() {

    this.privateKey = null;

    if (this.privateKeyForm.valid) {
      const { password } = this.privateKeyForm.value;
      return this.web3.getPrivKey(this.data.keyStore, password)
        .then((data) => {
          this.privateKey = data.privateKey;
          this.ChangeDetectorRef.markForCheck();
        }).catch((e) => {
          this.privateKeyForm.get('password')?.setErrors({
            walletPassword: true
          });
          this.ChangeDetectorRef.markForCheck();
        });

    }

  }

  close(){
    this.ref.close();
  }

}
