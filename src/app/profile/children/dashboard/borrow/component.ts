import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dashboard-borrow-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardBorrowComponent {

  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  constructor(private activateRoute: ActivatedRoute) { }

}
