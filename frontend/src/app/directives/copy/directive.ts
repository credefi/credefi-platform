import { Directive, ElementRef, HostListener, Input, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WINDOW } from 'src/app/modules/window';

@Directive({
    selector: '[copy]'
})

export class CopyDirective {

    @Input('copy') message!: string;

    constructor(
        private ElementRef: ElementRef,
        private MatSnackBar: MatSnackBar,
        @Inject(WINDOW) private window: Window,
    ) { }

    @HostListener('click') async onClick() {
        try {
            await this.window.navigator.clipboard.writeText(this.message);
            this.openSnackBar();
        } catch (err) {
            console.error('Failed to copy: ', err);
        }

    }

    openSnackBar() {
        this.MatSnackBar.open('Address is copied in  clipboard', 'OK', {
            duration: 3000
        });

    }

}