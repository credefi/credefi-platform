import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { WalletXRPLProvider } from 'src/app/providers/wallet/WalletXRPLProvider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MapProvider, UserProvider } from 'src/app/providers';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { MatRippleModule } from '@angular/material/core';
import { ConnectXRPLDialog } from 'src/app/helpers/connectXRPLDialog';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [MatIconModule, MatRippleModule, CommonModule, MatButtonModule, MatDialogModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent extends ConnectXRPLDialog implements OnInit, OnDestroy {

  user: string;
  userData: IObjectKeys;

  title: string | null;
  email: string;
  routeSubscrion: Subscription
  public show = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private change: ChangeDetectorRef,
    private mapProvider: MapProvider,
    public walletProvider: WalletXRPLProvider,
    private userProvider: UserProvider
  ) {
    super();
    const user = this.mapProvider.get(MapProvider.USER);
    const index = user.email.indexOf('@');
    this.user = user.email.slice(0, index);
    this.title = this.route.snapshot.children?.[0]?.routeConfig?.title as string;
    this.email = user.email;
    this.userData = this.mapProvider.get(MapProvider.USER);
  }

  ngOnInit(): void {
    this.routeSubscrion = this.router.events.pipe(filter(e => e instanceof ActivationStart)).subscribe((route: ActivationStart) => {
      this.title = route.snapshot.routeConfig?.title as string;
      this.change.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscrion) {
      this.routeSubscrion.unsubscribe();
    }
  }

  changeEarnIcon(): void {
    this.show = !this.show;
    // if (this.iconArrow === 'ArrowDown') {
    //   this.iconArrow = 'ArrowUp';
    // } else {
    //   this.iconArrow = 'ArrowDown';
    // }
    this.change.markForCheck();
  }

  validateKyc(){
    
  }
  
  logOut(){
    console.log('test')
    this.userProvider.logout().subscribe(() => {
      this.router.navigateByUrl('/authentication')
    });
  }
}

