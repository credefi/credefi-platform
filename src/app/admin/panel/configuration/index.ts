import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminConfigurationPage } from './component';
import { LanguageResolver } from 'src/app/resolvers';
import { ErrorModule } from 'src/app/pipes/error';
import { InputNumberModule } from 'src/app/directives/number';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';

@NgModule({
  declarations: [
    AdminConfigurationPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ 
      path: '', 
      component: AdminConfigurationPage,
      data: {
        languagePath: 'admin/panel/configuration'
      },
      resolve: {
        translations: LanguageResolver
      },
    }]),
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    ErrorModule,
    InputNumberModule,
    MatButtonModule,
    AutoCompleteModule,
    MatSnackBarModule
  ]
})

export class AdminConfigurationModule { }
