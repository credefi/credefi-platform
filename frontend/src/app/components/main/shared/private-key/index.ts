import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';
import { ErrorModule } from 'src/app/pipes/error';
import { WalletProvider } from 'src/app/providers/wallet/WalletProvider';

@Component({
  selector: 'app-private-key-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [MatIconModule, MatRippleModule, MatButtonModule, MatInputModule, ReactiveFormsModule, SlicePipe, ErrorModule, AutoCompleteModule, NgFor, NgIf],
  standalone: true
})

export class PrivateKeyDialog {

  isSubmit = false;
  privateKey = signal('');

  form = new FormGroup({
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    public ref: MatDialogRef<PrivateKeyDialog>,
    private wallet: WalletProvider,
    private change: ChangeDetectorRef,
  ) { }

  async onSubmit() {

    this.privateKey.set('');

    if (this.form.valid) {
      const { password } = this.form.value;
      try {
        const data = await this.wallet.getPrivKey(this.wallet.wallet().data.keyStore, password);
        this.privateKey.set(data.privateKey);
        this.change.markForCheck();
      } catch (e) {
        this.form.get('password')?.setErrors({
          walletPassword: true
        });
        this.change.markForCheck();
      }
    }
  }

}
