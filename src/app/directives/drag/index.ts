import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDirective } from './directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DragDirective
    ],
    exports: [
        DragDirective
    ]
})

export class DragModule { }