import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { WINDOW } from 'src/app/modules/window';
import { MapProvider, UserProvider } from 'src/app/providers';
import { Environment } from 'src/globals/config';
import { DrawerComponent } from '../drawer-component/component';

@Component({
  selector: 'toolbar-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})

export class ToolbarComponent {

  active = false;

  readonly buttonTypes = {
    link: {
      key: 'link'
    },
    blank: {
      key: 'blank'
    },
    button: {
      key: 'button'
    }
  }

  _menus!: {
    name: string,
    link?: string,
    image?: string,
    type: string,
    key?: string,
    active?: boolean,
    hanbdler?: Function,
    queryParamsHandling?: 'merge' | 'preserve' | '' | undefined,
  }[];

  @Input('drawer') drawer!: DrawerComponent;
  @ViewChild('menu', { static: true }) menu!: ElementRef;

  translations: { [key: string]: string } = this.activated.snapshot.data.translations;

  constructor(
    private router: Router,
    private mapProvider: MapProvider,
    private activated: ActivatedRoute,
    private change: ChangeDetectorRef,
    private userProvider: UserProvider,
    @Inject(WINDOW) private window: Window,
  ) { }

  @Input('menus') set menus(data: {
    name: string,
    link?: string,
    image?: string,
    type: string,
    key?: string,
    active?: boolean,
    hanbdler?: Function,
    queryParamsHandling?: 'merge' | 'preserve' | '' | undefined,
  }[]) {
    this._menus = data;
    this.change.markForCheck();
  };

  get menus() {
    return this._menus;
  }

  get isSignIn() {
    if (this.mapProvider.get(MapProvider.USER)) {
      return true;
    }
    return false;
  }

  toggleDrawer(event: Event) {
    this.drawer.toggle(event);
  }

  handler(child: IObjectKeys) {
    child?.handler();
  }

  toggleMenu(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.active = !this.active;
    this.change.markForCheck();
  }

  logout(){
    this.userProvider.logout();
    this.window.location.replace(Environment.api_url);
    this.toggleMenu();
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: MouseEvent) {

    const clickedInside = this.menu.nativeElement.contains(targetElement);
    if (!clickedInside && this.active) {
      this.toggleMenu();
    }

  }

  track(index: number, item: IObjectKeys) {
    return index;
  }

}
