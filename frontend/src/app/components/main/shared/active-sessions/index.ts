import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-active-sessions',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class ActiveSessionsComponent {
  @Input() svgIcon;
  @Input() sessionName;
  @Input() sessionLocation;
  @Input() showxClose;
}
