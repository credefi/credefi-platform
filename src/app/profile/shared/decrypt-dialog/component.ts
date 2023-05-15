import { Component, ChangeDetectionStrategy, Inject, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { Web3ClientProvider } from 'src/app/providers/web3';

@Component({
  selector: 'decrypt-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DecryptDialog {

  validate = false;
  submit = false;
  form = new UntypedFormGroup({
    password: new UntypedFormControl('', [
      Validators.required,
    ])
  });

  @ViewChild('loader', { static: true }) loader!: ElementRef<HTMLDivElement>;

  translations: { [key: string]: string | Function | any } = this.data.translations;

  constructor(
    private web3: Web3ClientProvider,
    private change: ChangeDetectorRef,
    private MatDialogRef: MatDialogRef<DecryptDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IObjectKeys
  ) { }

  handler(privateKey: string) {
    const { callback } = this.data;
    return callback(privateKey).then(() => {
      this.form.reset();
      this.form.get('password')?.setErrors(null);
      this.form.get('password')?.markAsUntouched();
      this.form.markAsUntouched();
      this.MatDialogRef.close(true);
    }).catch((e: string) => {
      console.log(e)
      this.form.get('password')?.setErrors({
        gasError: true
      });
    });
  }

  onSubmit() {
    if (this.form.valid) {

      this.submit = true;
      this.change.markForCheck();
      this.getPrivateKey().finally(() => {
        this.submit = false;
        this.validate = false;
        this.MatDialogRef.disableClose = false;
        this.loader.nativeElement.style.display = 'none';
        this.change.markForCheck();
      });
    }
  }

  getPrivateKey() {

    const { keyStore } = this.data;
    const { password } = this.form.value;

    return this.web3.getPrivKey(keyStore, password).then((data) => {
      this.validate = true;
      this.MatDialogRef.disableClose = true;
      this.loader.nativeElement.style.display = 'block';
      this.change.markForCheck();
      return this.handler(data.privateKey);
    }).catch((e) => {
      console.log(e)
      this.form.get('password')?.setErrors({
        walletPassword: true
      });
    });

  }

}
