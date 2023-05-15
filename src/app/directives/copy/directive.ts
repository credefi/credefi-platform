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
            const selection = this.window.getSelection();
            const range = this.window?.document?.createRange();
            const element = this.ElementRef.nativeElement;

            range.setStartBefore(element);
            range.setEndAfter(element);

            selection?.removeAllRanges();
            selection?.addRange(range);

            await this.window.navigator.clipboard.writeText(this.ElementRef.nativeElement.innerText);

            this.openSnackBar();
        } catch (err) {
            console.error('Failed to copy: ', err);
        }

    }

    openSnackBar() {
        const message = this.message?.length == 0 ? 'Item is copied!' : this.message;
        this.MatSnackBar.open(message, 'OK', {
            duration: 3000
        });

    }

}