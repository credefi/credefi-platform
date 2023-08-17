import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Address } from './pipe';

@NgModule({
    imports: [],
    declarations: [
        Address
    ],
    exports: [
        Address
    ]
})

export class AddressPipeModule { }