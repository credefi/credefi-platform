import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RegistrationPage } from './component';
import { RegistrationComponentModule } from 'src/app/shared/registration-component';
import { LanguageResolver } from 'src/app/resolvers';

@NgModule({
  declarations: [
    RegistrationPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ 
      path: '', 
      component: RegistrationPage,
      data: {
        languagePath: 'authentication/registration'
      },
      resolve: {
        translations: LanguageResolver
      },
    }]),
    RegistrationComponentModule
  ]
})

export class RegistrationModule { }
