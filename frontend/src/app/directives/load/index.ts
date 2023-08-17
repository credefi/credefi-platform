import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadDirective } from './directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoadDirective
    ],
    exports: [
        LoadDirective
    ]
})

export class LoadModule { }