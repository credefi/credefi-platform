import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { GroupDescriptionDirective } from './directive';
import { GroupDialogModule } from './dialog';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        GroupDialogModule
    ],
    declarations: [
        GroupDescriptionDirective
    ],
    exports: [
        GroupDescriptionDirective
    ]
})

export class GroupDescriptionModule { }