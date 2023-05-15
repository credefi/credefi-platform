import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';

import { ModuleXComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver, SharedLanguageResolver } from 'src/app/resolvers';
import { UserMenuComponentModule } from '../../shared/user-menu';
import { InputModule } from 'src/app/shared/input-component';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog';
import { ConfigurationResolver, GeckoResolver } from '../../resolvers';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ModuleXComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ModuleXComponent,
      data: {
        languagePath: 'profile/modulex',
        sharedLanguagePaths: {
          userMenu: 'shared/user-menu'
        }
      },
      resolve: {
        translations: LanguageResolver,
        sharedTranslations: SharedLanguageResolver,
        configuration: ConfigurationResolver,
        price: GeckoResolver
      },
    }]),
    FormsModule,
    ReactiveFormsModule,
    LazyImageModule,
    MatRippleModule,
    MatSliderModule,
    UserMenuComponentModule,
    InputModule,
    MatDialogModule,
    ConfirmDialogModule,
    MatTooltipModule
    
  ]
})

export class ModuleXModule { }
