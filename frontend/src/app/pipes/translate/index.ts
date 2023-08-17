import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Translate } from './pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        Translate
    ],
    providers: [
        Translate
    ],
    exports: [
        Translate
    ]
})

class TranslatePipeModule { }

export{
    Translate,
    TranslatePipeModule
}