import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'address'
})

export class Address implements PipeTransform {

    constructor() { }

    transform(data: string): string {
        const first = data.slice(0, 5);
        const last = data.slice(data.length - 4, data.length);
        return `${first}...${last}`;
    }
}
