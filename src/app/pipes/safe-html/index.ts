import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeHTML } from './pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SafeHTML
    ],
    exports: [
        SafeHTML
    ]
})

export class SafeHTMLModule { }