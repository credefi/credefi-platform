import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConfirmDialog {

  constructor(
    private MatDialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IObjectKeys
  ) {
  }

  handler(index: number) {
    if (this.data.buttons && this.data.buttons instanceof Array) {
      const button = this.data.buttons[index];
      if (button.handler instanceof Function) {
        button.handler();
      }
    }
    this.MatDialogRef.close({ action: false })
  }

}
