import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { FilePickerDirective } from './directive';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog';
import { ProvidersModule } from './providers';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        ConfirmDialogModule,
        ProvidersModule
    ],
    declarations: [
        FilePickerDirective
    ],
    exports: [
        FilePickerDirective
    ]
})

export class FilePickerModule { }