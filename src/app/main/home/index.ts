import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

import { HomeComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver } from 'src/app/resolvers';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: HomeComponent,
      data: {
        languagePath: 'main/home',
      },
      resolve: {
        translations: LanguageResolver,
      },
    }]),
    LazyImageModule,
    MatRippleModule
  ]
})

export class HomeModule { }
