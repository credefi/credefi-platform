import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'error-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErrorComponent {

  _text!: string;

  constructor() { }

  @Input()
  set text(text: string) {
    this._text = text;
  }

  get text() {
    return this._text;
  }

}
