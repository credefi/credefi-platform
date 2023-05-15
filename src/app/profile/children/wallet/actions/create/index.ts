import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

import { WalletCreateComponent } from './component';
import { LanguageResolver } from 'src/app/resolvers';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { InputModule } from 'src/app/shared/input-component';

@NgModule({
  declarations: [
    WalletCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: WalletCreateComponent,
      data: {
        languagePath: 'profile/wallet/actions/create'
      },
      resolve: {
        translations: LanguageResolver,
      },
    }]),
    ReactiveFormsModule,
    LazyImageModule,
    InputModule,
    MatRippleModule
  ]
})

export class WalletCreateModule { }
