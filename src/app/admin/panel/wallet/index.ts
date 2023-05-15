import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { LanguageResolver } from 'src/app/resolvers';
import { AdminWalletPage } from './component';
import { ErrorModule } from 'src/app/pipes/error';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';
import { KeyStoreResolver } from '../resolvers';

@NgModule({
  declarations: [
    AdminWalletPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      data: {
        languagePath: 'admin/panel/wallet'
      },
      resolve: {
        translations: LanguageResolver,
        keystore: KeyStoreResolver
      },
      path: '',
      component: AdminWalletPage
    }]),
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    ErrorModule,
    AutoCompleteModule
  ]
})

export class AdminWalletModule { }
