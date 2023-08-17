import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacebookDirective } from './directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FacebookDirective
    ],
    exports: [
        FacebookDirective
    ]
})

export class FacebookDirectiveModule { }