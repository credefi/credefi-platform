import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OverViewComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver, SharedLanguageResolver } from 'src/app/resolvers';
import { ErrorComponentModule } from 'src/app/profile/shared/error-component';
import { UserMenuComponentModule } from 'src/app/profile/shared/user-menu';

@NgModule({
  declarations: [
    OverViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: OverViewComponent,
      data: {
        languagePath: 'profile/information/overview',
        sharedLanguagePaths: {
          userMenu: 'shared/user-menu'
        }
      },
      resolve: {
        translations: LanguageResolver,
        sharedTranslations: SharedLanguageResolver
      },
    }]),
    LazyImageModule,
    ErrorComponentModule,
    UserMenuComponentModule
  ]
})

export class OverViewModule { }
