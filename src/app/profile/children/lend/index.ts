import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';

import { LendComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver, SharedLanguageResolver } from 'src/app/resolvers';
import { UserMenuComponentModule } from '../../shared/user-menu';
import { AccountsResolver, ConfigurationResolver, KycVerifiedResolver, PromoCodeResolver, ReferralResolver } from '../../resolvers';
import { InputModule } from 'src/app/shared/input-component';
import { SelectComponentModule } from '../../shared/select-component';
import { GroupDescriptionModule } from '../../directives/group-description';
import { CopyModule } from 'src/app/directives/copy';
import { DecryptDialogModule } from '../../shared/decrypt-dialog';
import { LendAcceptDialogModule } from '../../shared/lend-accept-dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog';

@NgModule({
  declarations: [
    LendComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      children: [
        {
          path: '',
          redirectTo: 'action',
          pathMatch: 'full'
        },
        {
          path: 'action',
          component: LendComponent,
          data: {
            reuse: true,
            retrieve: true
          }
        },
        {
          path: 'action/:code',
          component: LendComponent,
          data: {
            reuse: true,
            retrieve: true
          },
          resolve: {
            code: PromoCodeResolver
          }
        },
        {
          path: ':referral',
          component: LendComponent,
          data: {
            reuse: true,
            retrieve: true
          },
          resolve: {
            referral: ReferralResolver
          }
        }
      ],
      data: {
        languagePath: 'profile/lend',
        sharedLanguagePaths: {
          userMenu: 'shared/user-menu',
          decryptDialog: 'shared/decrypt-dialog',
          lendAcceptDialog: 'shared/lend-accept-dialog'
        }
      },
      resolve: {
        translations: LanguageResolver,
        sharedTranslations: SharedLanguageResolver,
        accounts: AccountsResolver,
        configuration: ConfigurationResolver,
        kycVerified: KycVerifiedResolver
      },
    },
    ]),
    FormsModule,
    ReactiveFormsModule,
    LazyImageModule,
    MatRippleModule,
    UserMenuComponentModule,
    MatStepperModule,
    SelectComponentModule,
    InputModule,
    GroupDescriptionModule,
    MatSliderModule,
    CopyModule,
    DecryptDialogModule,
    MatDialogModule,
    LendAcceptDialogModule,
    MatTooltipModule,
    ConfirmDialogModule
  ]
})

export class LendModule { }
