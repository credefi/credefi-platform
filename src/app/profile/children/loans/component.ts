import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'loans-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoansComponent {

  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  constructor(private activateRoute: ActivatedRoute) { }

}
