import { Component, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { WINDOW } from 'src/app/modules/window';
import { UserProvider } from 'src/app/providers';

@Component({
  selector: 'authneticator-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthneticatorDialog {

  isSubmit = false;
  qrCode: string;
  translations: { [key: string]: string | Function | any } = this.data.translations;

  form = new UntypedFormGroup({
    code: new UntypedFormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    private userProvider: UserProvider,
    private change: ChangeDetectorRef,
    @Inject(WINDOW) public window: IObjectKeys,
    private MatDialogRef: MatDialogRef<AuthneticatorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IObjectKeys
  ) {
    const { qrCode } = data;

    const blob = new Blob([qrCode], { type: "image/svg+xml" });
    const urlCreator = this.window.URL || this.window.webkitURL;
    this.qrCode = urlCreator.createObjectURL(blob);
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmit = true;
      this.change.markForCheck();
      this.userProvider.gaActivate(this.form.value).subscribe(({ errors, result }) => {
        this.isSubmit = false;
        this.change.markForCheck();
        if (result) {
          return this.MatDialogRef.close(result);
        }
        if (errors) {
          for (let key in errors) {
            const parsedErrors = errors[key].map((item: string) => {
              return this.translations[item];
            });
            this.form.controls[key].setErrors({ 'incorrect': parsedErrors });
          }
        }
      });
    }
  }

  close() {
    this.MatDialogRef.close();
  }

}
