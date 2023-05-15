import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class LoaderProvider {

    readonly time = 1200;
    spinner!: HTMLElement;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platform: Object
    ) { }

    load() {
        this.spinner = this.document.getElementById('spinner') as HTMLElement;
    }

    show() {
        this.spinner.style.display = 'flex';
    }

    hide(): Promise<void> {
        return new Promise((resolve) => {
            if (isPlatformBrowser(this.platform)) {
                return setTimeout(() => {
                    return resolve(true);
                }, this.time);
            }
            return resolve(true);
        }).then(() => {
            this.spinner.style.display = 'none';
        });
    }

}
