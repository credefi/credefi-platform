import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AdminUsersPage } from './component';
import { UsersResolver } from '../resolvers';
import { TranslatePipeModule } from 'src/app/pipes/translate';
import { LanguageResolver } from 'src/app/resolvers';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';

@NgModule({
  declarations: [
    AdminUsersPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{
      path: '',
      component: AdminUsersPage,
      data: {
        languagePath: 'admin/panel/users'
      },
      resolve: {
        users: UsersResolver,
        translations: LanguageResolver
      }
    }]),
    MatInputModule,
    MatSelectModule,
    TranslatePipeModule,
    AutoCompleteModule
  ]
})

export class AdminUsersModule { }
