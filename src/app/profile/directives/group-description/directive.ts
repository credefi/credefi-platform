import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfigurationProvider } from '../../providers';
import { GroupDialog } from './dialog/component';

@Directive({
    selector: '[group-description]',
})

export class GroupDescriptionDirective {

    group!: string;

    constructor(
        private dialog: MatDialog,
        private configuration: ConfigurationProvider
    ) { }

    @Input('group-description') set type(gr: string) {
        this.group = gr;
    }

    @HostListener('click', ['$event']) onClick($event: Event) {
        this.configuration.getDescription(this.group).subscribe(({ result }) => {
            this.dialog.open(GroupDialog, {
                scrollStrategy: new NoopScrollStrategy(),
                data: {
                    group: result[this.group]
                }
            });
        })
    }

}