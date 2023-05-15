import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleDirective } from './directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        GoogleDirective
    ],
    exports: [
        GoogleDirective
    ]
})

export class GoogleDirectiveModule { }