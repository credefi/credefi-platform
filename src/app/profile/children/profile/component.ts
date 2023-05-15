import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-profile-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileComponent {

  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  constructor(private activateRoute: ActivatedRoute) { }

}
