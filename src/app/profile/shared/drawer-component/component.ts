import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Component({
  selector: 'drawer-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DrawerComponent {

  readonly buttonTypes = {
    link: {
      key: 'link'
    },
    button: {
      key: 'button'
    }
  }

  @Input('navigation') navigation!: {
    name: string,
    link: string,
    image: string,
    imageActive: string,
    type: 'button' | 'link',
    disable: boolean,
    queryParamsHandling?: 'merge' | 'preserve' | '' | undefined,
  }[];

  constructor() { }

  handler(child: IObjectKeys) {
    child?.click();
  }

  track(index: number, item: IObjectKeys) {
    return index;
  }

}
