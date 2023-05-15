import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'loading-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoadingPage {

  constructor() { }

}
 