import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog';
import { KeystoreDialogModule } from '../keystore-dialog';
import { SendDialogModule } from '../send-dialog';
import { AddressDialogModule } from '../address-dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SendMetaMaskDialogModule } from '../send-metamask-dialog';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    LazyImageModule,
    ConfirmDialogModule,
    KeystoreDialogModule,
    SendDialogModule,
    AddressDialogModule,
    MatTooltipModule,
    SendMetaMaskDialogModule
  ],
  declarations: [
    WalletComponent
  ],
  exports: [
    WalletComponent
  ]
})

export class WalletModule { }
