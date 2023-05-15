import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { Environment } from 'src/globals/config';

@Component({
  selector: 'address-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class AddressDialog {

  address: string;
  api_url = Environment.api_url

  constructor(
    private MatDialogRef: MatDialogRef<AddressDialog>,
    @Inject(MAT_DIALOG_DATA) private data: IObjectKeys
  ) {
    const { address } = this.data;
    this.address = address;
  }

  close() {
    this.MatDialogRef.close();
  }

}
