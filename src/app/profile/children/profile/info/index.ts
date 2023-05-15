import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InfoProfileComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver, SharedLanguageResolver } from 'src/app/resolvers';
import { ErrorComponentModule } from 'src/app/profile/shared/error-component';
import { UserMenuComponentModule } from 'src/app/profile/shared/user-menu';
import { LastLoginResolver, LendingStatusResolver } from 'src/app/profile/resolvers';

@NgModule({
  declarations: [
    InfoProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: InfoProfileComponent,
      data: {
        languagePath: 'profile/information/info',
        sharedLanguagePaths: {
          userMenu: 'shared/user-menu'
        }
      },
      resolve: {
        translations: LanguageResolver,
        sharedTranslations: SharedLanguageResolver,
        lastLogin: LastLoginResolver,
        status: LendingStatusResolver,
      },
    }]),
    LazyImageModule,
    ErrorComponentModule,
    UserMenuComponentModule
  ]
})

export class InfoProfileModule { }
