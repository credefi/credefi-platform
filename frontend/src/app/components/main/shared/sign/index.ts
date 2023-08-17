import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { ErrorModule } from 'src/app/pipes/error';
import { WalletProvider } from 'src/app/providers/wallet/WalletProvider';

@Component({
  selector: 'app-sign-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [MatIconModule, MatRippleModule, MatButtonModule, MatInputModule, ReactiveFormsModule, SlicePipe, ErrorModule, AutoCompleteModule, NgFor, NgIf],
  standalone: true
})

export class SignDialog {

  isSubmit = false;

  form = new FormGroup({
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    public ref: MatDialogRef<SignDialog>,
    private wallet: WalletProvider,
    private change: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private rawTx: IObjectKeys
  ) { }

  async onSubmit() {

    if (this.form.valid) {
      const { password } = this.form.value;
      this.isSubmit = true;
      try {
        const data = await this.wallet.getPrivKey(this.wallet.wallet().data.keyStore, password);
        const sign = await this.wallet.signAndSend(this.rawTx, data.privateKey);
        this.ref.close();
      } catch (e) {
        this.form.get('password')?.setErrors({
          walletPassword: true
        });
        this.change.markForCheck();
      }finally{
        this.isSubmit = false;
        this.change.markForCheck();
      }
    }
  }

}
