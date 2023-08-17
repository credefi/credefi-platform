import { NgFor, SlicePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { passwordMatchValidator } from 'src/app/helpers/passwordConfirmValidator';
import { strongPasswordValidator } from 'src/app/helpers/strongPasswordValidator';
import { ErrorModule } from 'src/app/pipes/error';
import { WalletProvider } from 'src/app/providers/wallet/WalletProvider';
import { AccountProvider } from '../../providers';

@Component({
  selector: 'app-create-wallet-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [MatIconModule, MatRippleModule, MatButtonModule, MatInputModule, ReactiveFormsModule, SlicePipe, ErrorModule, AutoCompleteModule, NgFor],
  standalone: true
})

export class CreateWalletDialog {

  isSubmit = false;

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(255)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255),
      strongPasswordValidator
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255)
    ]),
  }, passwordMatchValidator('password', 'passwordConfirm'));

  constructor(
    private render: Renderer2,
    public ref: MatDialogRef<CreateWalletDialog>,
    private wallet: WalletProvider,
    private change: ChangeDetectorRef,
    private accountProvider: AccountProvider
    ) { }

  async onSubmit() {
    if (this.form.valid) {
      const { password } = this.form.value;
      const account = await this.wallet.createAccount({ password });
      this.isSubmit = true;
      this.change.markForCheck();

      const value: IObjectKeys = this.form.value;
      value.address = account?.address;
      value.keyStore = account;

      this.accountProvider.post(value).subscribe((res: any) => {
        this.isSubmit = false;
        this.change.markForCheck();
        if (res.result) {
          this.generateFile(value);
          this.ref.close();
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
