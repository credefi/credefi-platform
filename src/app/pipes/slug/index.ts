import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Slug } from './pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        Slug
    ],
    exports: [
        Slug
    ]
})

export class SlugModule { }