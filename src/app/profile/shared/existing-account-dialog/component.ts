import { ChangeDetectorRef, Component, Inject, Renderer2 } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AccountProvider } from '../../providers';
import { validateKeyStore } from 'src/app/helpers/keyStoreValidator';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'existing-account-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})

export class ExistingAccountDialog {

  submit = false;

  accountForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [
      Validators.required,
    ]),
    keyStore: new UntypedFormControl('', [
      validateKeyStore,
      Validators.required,
    ])
  });

  translations: { [key: string]: string | Function | any } = this.data.translations;

  constructor(
    private router: Router,
    private render: Renderer2,
    private change: ChangeDetectorRef,
    private AccountProvider: AccountProvider,
    @Inject(MAT_DIALOG_DATA) private data: IObjectKeys,
    private ref: MatDialogRef<ExistingAccountDialog>,
  ) { }

  onUpload() {
    const input = this.render.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.multiple = false;
    input.onchange = this.handleFile.bind(this);
    input.click();
    input.remove();
  }

  handleFile(event: Event) {
    const target = event?.target as HTMLInputElement;
    const files = target?.files;
    if (files) {

      for (let key = 0; key < files.length; key++) {

        const file = files?.[key];
        const fr = new FileReader();

        fr.onloadend = (e) => {
          const result = e?.target?.result;
          this.accountForm.controls.keyStore.setValue(result);
        }

        fr.readAsText(file);

      }

    }
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const value = this.accountForm.value;
      value.keyStore = JSON.parse(this.accountForm.controls.keyStore.value);
      value.address = value.keyStore.address;
      this.submit = true;
      this.change.markForCheck();

      this.AccountProvider.post(value).subscribe(({ result }) => {
        this.submit = false;
        this.change.markForCheck();
        if (result) {
          this.ref.close();
          this.router.navigateByUrl('/profile/wallet/info');
        }
      });
    }
  }

  close(){
    this.ref.close();
  }

}
