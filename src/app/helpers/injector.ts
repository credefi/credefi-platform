import { Injector } from "@angular/core";

let appInjectorRef: Injector;

export function appInjector (injector?: Injector): Injector {
    if (!injector) {
        return appInjectorRef;
    }
    appInjectorRef = injector;
    return appInjectorRef;
}