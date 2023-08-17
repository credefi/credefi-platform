import { ChangeDetectionStrategy, Component, Input, SkipSelf } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationProvider } from '../providers/AuthenticationProvider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-activation',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, RouterLink],
  standalone: true
})

export class ActivationComponent {

  @Input() token: string;

  constructor(
    @SkipSelf() private authenticationProvider: AuthenticationProvider
  ) { }

  ngOnInit() {
    this.authenticationProvider.postActivation(this.token).subscribe();
  }

}
