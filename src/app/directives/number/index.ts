import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumberDirective } from './directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        InputNumberDirective
    ],
    exports: [
        InputNumberDirective
    ]
})

export class InputNumberModule { }