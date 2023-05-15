import { Component, ChangeDetectorRef, Inject, PLATFORM_ID, ElementRef, HostListener, Input, ChangeDetectionStrategy, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

import { IObjectKeys } from 'src/app/helpers/interfaces';

@Component({
  selector: 'drawer-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DrawerComponent implements OnInit {

  readonly buttonTypes = {
    link: {
      key: 'link'
    },
    button: {
      key: 'button'
    }
  }

  active = true;
  isMobile = false;
  @Output('toggle') toogleEvent = new EventEmitter();

  @Input('navigation') navigation!: {
    name: string,
    hidden?: boolean,
    children: {
      name: string,
      link?: string,
      image: string,
      type: string,
      key?: string,
      active?: boolean,
      click?: Function,
      queryParamsHandling?: 'merge' | 'preserve' | '' | undefined,
    }[]
  }[];

  @ViewChild('container', { static: true }) container!: ElementRef;

  constructor(
    private change: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: IObjectKeys,
    @Inject(PLATFORM_ID) private platform: number,
  ) { }

  get isActive() {
    if (this.isMobile) {
      return true;
    }
    return this.active;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platform)) {
      if (this.document.body.offsetWidth < 450) {
        this.isMobile = true;
        this.active = false;
        this.elementRef.nativeElement.classList.add('mobile');
      } else {
        this.elementRef.nativeElement.classList.add('desktop');
        this.elementRef.nativeElement.classList.add('active');

      }
    }
  }

  toggle(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.active = !this.active;
    if (this.active) {
      this.elementRef.nativeElement.classList.add('active');
    } else {
      this.elementRef.nativeElement.classList.remove('active')
    }
    this.toogleEvent.emit();
    this.change.markForCheck();
  }

  checkMobile() {
    if (this.isMobile) {
      this.toggle();
    }
  }

  handler(child: IObjectKeys){
    child?.click();
    this.checkMobile()
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: MouseEvent) {
    const clickedInside = this.container.nativeElement.contains(targetElement);
    if (!clickedInside && this.isMobile && this.active) {
      this.toggle();
    }
  }

  track(index: number, item: IObjectKeys) {
    return index;
  }

}
