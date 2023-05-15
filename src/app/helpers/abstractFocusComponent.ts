import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[abstract-focus-component]'
})

export abstract class FocusComponent {

    isActive = true;

    @HostListener('window:focus', ['$event'])
    onFocus(): void {
        if (!this.isActive) {
            this.isActive = true;
            this.update();
        }
    }

    @HostListener('window:blur', ['$event'])
    onBlur(): void {
        this.isActive = false;
    }

    abstract update(): boolean

}