import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, Inject, ChangeDetectionStrategy, Renderer2 } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { PrivateKeyDialog } from '../private-key-dialog'

@Component({
  selector: 'keystore-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class KeystoreDialog {

  keyStore = '';
  translations: { [key: string]: string | Function | any } = this.data.translations.keyStoreDialog;

  constructor(
    private render: Renderer2,
    private MatDialog: MatDialog,
    private ref: MatDialogRef<KeystoreDialog>,
    @Inject(MAT_DIALOG_DATA) private data: IObjectKeys
  ) {
    try {
      this.keyStore = JSON.stringify(data.keyStore);
    } catch (e) {
      console.log(e);
    }
  }

  exportPrivate() {
    this.MatDialog.open(PrivateKeyDialog, {
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        translations: this.data.translations.privateKeyDialog,
        keyStore: this.data.keyStore
      }
    });
  }

  download() {

    let element = this.render.createElement('a');

    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.data.keyStore)));
    element.setAttribute('download', `0x${this.data.keyStore.address}.json`);
    element.click();
    element.remove();
  }

  close(){
    this.ref.close();
  }

}
