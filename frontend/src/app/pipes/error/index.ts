import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error } from './pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        Error
    ],
    exports: [
        Error
    ]
})

export class ErrorModule { }