import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

import { HelpComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver, SharedLanguageResolver } from 'src/app/resolvers';
import { UserMenuComponentModule } from '../../shared/user-menu';
import { InputModule } from 'src/app/shared/input-component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpansionModule } from 'src/app/shared/expansion-component';

@NgModule({
  declarations: [
    HelpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: HelpComponent,
      data: {
        languagePath: 'profile/help',
        sharedLanguagePaths: {
          userMenu: 'shared/user-menu'
        }
      },
      resolve: {
        translations: LanguageResolver,
        sharedTranslations: SharedLanguageResolver
      }
    }]),
    LazyImageModule,
    MatRippleModule,
    UserMenuComponentModule,
    InputModule,
    MatRippleModule,
    ExpansionModule
  ]
})

export class HelpModule { }
