import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Directive, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { IObjectKeys } from 'src/app/helpers/interfaces';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog/component';
import { FileTypes } from 'src/globals/config';
import { FileProvider } from './providers';

@Directive({
    selector: '[file-picker]',
})

export class FilePickerDirective {

    @Output() handler: EventEmitter<IObjectKeys | IObjectKeys[]> = new EventEmitter();
    fileInput: HTMLInputElement;
    translations = this.actived.snapshot.data.sharedTranslations.filePicker;

    constructor(
        private dialog: MatDialog,
        private rendered: Renderer2,
        private actived: ActivatedRoute,
        private fileProvider: FileProvider
    ) {
        this.fileInput = this.rendered.createElement('input');
        this.fileInput.type = 'file';
    }

    @Input('file-picker') set type(type: string) {
        this.fileInput.accept = FileTypes[type as keyof typeof FileTypes]?.suportedTypes?.toString();
    }

    @HostListener('click', ['$event']) onClick($event: Event) {
        this.fileInput.click();
        this.fileInput.multiple = false;
        this.fileInput.onchange = this.handleFile.bind(this);
    }

    handleFile(event: Event) {
        const target = event?.target as HTMLInputElement;
        const files = target?.files;
        if (files) {

            for (let key = 0; key < files.length; key++) {
                const file = files[key];
                const error = this.getFileType(file);
                switch (error) {
                    case (-2): {
                        this.dialog.open(ConfirmDialog, {
                            scrollStrategy: new NoopScrollStrategy(),
                            data: {
                                title: this.translations['file-size-dialog'],
                                message: this.translations['file-size-dialog-message'],
                                buttons: [
                                    {
                                        label: this.translations['file-size-dialog-accept'],
                                    }
                                ]
                            }
                        });
                        break;
                    }
                    case (-1): {
                        this.dialog.open(ConfirmDialog, {
                            scrollStrategy: new NoopScrollStrategy(),
                            data: {
                                title: this.translations['file-type-dialog'],
                                message: this.translations['file-type-dialog-message'],
                                buttons: [
                                    {
                                        label: this.translations['file-type-dialog-accept'],
                                    }
                                ]
                            }
                        });
                        break;
                    }
                    case (FileTypes.image.key): {
                        this.uploadImageFile(file);
                        break;
                    }
                    case (FileTypes.pdf.key): {
                        this.uploadPDFFile(file);
                        break;
                    }

                }
            }

        }
    }

    getFileType(file: File) {
        for (const key in FileTypes) {
            const fileType = FileTypes[key as keyof typeof FileTypes]

            let types = fileType.suportedTypes;
            let maxSize = fileType.maxSize;

            if (file.size > maxSize) {
                return -2;
            }

            for (let j = 0; j < types.length; j++) {
                if (types[j] == file.type) {
                    return fileType.key;
                }
            }

        }

        return -1;

    }

    uploadImageFile(file: File) {
        this.uploadImageFileSubscription(file).subscribe(({ result }) => {
            if (result) {
                return this.handler.emit(result);
            }
        });
    }

    uploadImageFileSubscription(file: File) {
        const form: FormData = new FormData();
        form.append('data', file);
        return this.fileProvider.post({ formData: form });
    }

    uploadPDFFile(file: File) {
        this.uploadPDFFileSubscription(file).subscribe(({ result }) => {
            if (result) {
                return this.handler.emit(result);
            }
        });
    }

    uploadPDFFileSubscription(file: File) {
        const form: FormData = new FormData();
        form.append('data', file);
        return this.fileProvider.postPDF({ formData: form });
    }

}