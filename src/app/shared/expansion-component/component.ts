import { Component, ChangeDetectionStrategy, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { trackByIndex } from 'src/app/helpers/track';

@Component({
  selector: 'expansion-component',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExpansionComponent {

  _sub!: string;
  _title!: string;
  _description!: string;
  _opened = false;

  track = trackByIndex;

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

  constructor() { }

  ngAfterViewInit() {
    if (this.opened) {
      this.toggle(true);
    }
  }

  @Input()
  set opened(opened: boolean) {
    this._opened = opened;
  }

  get opened() {
    return this._opened;
  }

  @Input()
  set title(title: string) {
    this._title = title;
  }

  get title() {
    return this._title;
  }

  @Input()
  set description(description: string) {
    this._description = description;
  }

  get description() {
    return this._description;
  }

  @Input()
  set sub(sub: string) {
    this._sub = sub;
  }

  get sub() {
    return this._sub;
  }

  toggle(disableEvent?: boolean) {
    if (!disableEvent) {
      this.opened = !this.opened;
    }
    if (this.opened) {
      const height = this.container.nativeElement.scrollHeight;
      this.container.nativeElement.style.height = `${height}px`;
    } else {
      this.container.nativeElement.style.height = `0px`;
    }
  }

}
