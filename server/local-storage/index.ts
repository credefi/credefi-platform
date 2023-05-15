import { ClassProvider } from '@angular/core';
import { LOCAL_STORAGE } from '../../src/app/modules/local-storage';

export class StorageMock implements Storage {

    get length(): number {
        return 0;
    }

    getItem(key: string): string | null {
        return null;
    }

    setItem(key: string, value: string) {

    }

    clear() {

    }

    key(index: number): string | null {
        return null;
    }

    removeItem(key: string): void {

    }
}

export const UNIVERSAL_LOCAL_STORAGE: ClassProvider = {
    provide: LOCAL_STORAGE,
    useClass: StorageMock,
};