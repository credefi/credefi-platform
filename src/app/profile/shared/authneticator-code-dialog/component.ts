import { Component, ChangeDetectionStrategy, Inject, HostListener, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { WINDOW } from 'src/app/modules/window';

@Component({
  selector: 'authneticator-code-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class AuthneticatorCodeDialog {

  submitted = false;
  translations: { [key: string]: string | Function | any } = this.data.translations;

  form = new UntypedFormGroup({
    code: new UntypedFormControl({
      value: this.data.code,
      disabled: true
    }, [
      Validators.required,
    ]),
    read: new UntypedFormControl(false, [
      Validators.requiredTrue,
    ]),
  });

  constructor(
    private MatSnackBar: MatSnackBar,
    @Inject(WINDOW) public window: IObjectKeys,
    private MatDialogRef: MatDialogRef<AuthneticatorCodeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IObjectKeys
  ) {
    this.MatDialogRef.disableClose = true;
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeClose($event: IObjectKeys) {
    return this.form.value.read;
  }

  onSubmit(){
    this.submitted = true;
    this.close();
  }

  close() {
    if (this.form.valid) {
      this.MatDialogRef.close();
    }
  }

  async copy() {
    try {
      await this.window.navigator.clipboard.writeText(this.data.code);
      this.MatSnackBar.open(this.translations['snackbar'], this.translations['ok'], {
        duration: 3000
      });
    } catch (e) {
      console.log(e);
    }
  }

}
