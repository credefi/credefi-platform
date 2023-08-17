import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hextodec'
})

export class HexToDec implements PipeTransform {

    constructor() { }

    transform(data: string): string {
        return `${Number(data)}`;
    }
}
