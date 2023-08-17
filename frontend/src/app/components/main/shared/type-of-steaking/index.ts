import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-type-of-steaking',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [MatIconModule],
  standalone: true
})
export class TypeOfSteakingComponent {

  @Input() logoMobile;
  @Input() steakingTitle;
}
