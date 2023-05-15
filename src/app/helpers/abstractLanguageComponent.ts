import { Directive } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { Languages } from 'src/globals/config';

@Directive({
    selector: '[abstract-language-component]'
})

export abstract class AbstractLanguageComponent {

    abstract transliterationObjects: TransliterationObject;
    supportedLanguages = Languages.map(e => e.key);
    abstract setTransliterations(): void;

}

export  interface TransliterationObject{
    [key: string]: ValidatorFn[];
}