import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Component({
  selector: 'option-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OptionComponent {

  _key!: IObjectKeys | string;
  _selected!: IObjectKeys | null;

  _sizes: number = 14;
  _item!: IObjectKeys;
  _name!: string;

  @Output() select = new EventEmitter();

  constructor(private change: ChangeDetectorRef) { }

  @Input()
  set key(key: IObjectKeys | string) {
    this._key = key;
  }

  get key() {
    return this._key;
  }

  @Input()
  set item(item: IObjectKeys) {
    this._item = item;
  }

  get item() {
    return this._item;
  }

  @Input()
  set sizes(sizes: number) {
    this._sizes = sizes;
    this.change.markForCheck();
  }

  get sizes() {
    return this._sizes;
  }

  @Input()
  set name(name: string) {
    this._name = name;
    this.change.markForCheck();
  }

  get name() {
    return this._name;
  }

  @Input()
  set selected(selected: IObjectKeys | null) {
    this._selected = selected;
    this.change.markForCheck();
  }

  get selected() {
    return this._selected;
  }

  click() {
    this.select.emit(this);
  }

}
