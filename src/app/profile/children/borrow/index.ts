import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import { BorrowComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver, SharedLanguageResolver } from 'src/app/resolvers';
import { UserMenuComponentModule } from '../../shared/user-menu';
import { SelectComponentModule } from '../../shared/select-component';
import { InputModule } from 'src/app/shared/input-component';

@NgModule({
  declarations: [
    BorrowComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: BorrowComponent,
      data: {
        languagePath: 'profile/borrow',
        sharedLanguagePaths: {
          userMenu: 'shared/user-menu'
        }
      },
      resolve: {
        translations: LanguageResolver,
        sharedTranslations: SharedLanguageResolver
      },
    }]),
    ReactiveFormsModule,
    LazyImageModule,
    MatRippleModule,
    UserMenuComponentModule,
    MatStepperModule,
    SelectComponentModule,
    InputModule,
    MatRadioModule
  ]
})

export class BorrowModule { }
