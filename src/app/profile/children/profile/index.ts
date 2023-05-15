import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

import { ProfileComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver } from 'src/app/resolvers';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ProfileComponent,
      data: {
        languagePath: 'profile/information',
      },
      resolve: {
        translations: LanguageResolver,
      },
      children: [
        {
          path: '',
          loadChildren: () => import('./info').then(m => m.InfoProfileModule),
          data: {
            preload: true
          },
        },
        {
          path: 'security',
          loadChildren: () => import('./security').then(m => m.SecurityModule),
          data: {
            preload: true
          },
        },
        {
          path: 'overview',
          loadChildren: () => import('./overview').then(m => m.OverViewModule),
          data: {
            preload: true
          },
        }
      ]
    }]),
    LazyImageModule,
    MatRippleModule
  ]
})

export class ProfileModule { }
