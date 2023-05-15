import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, AfterViewInit, Inject, PLATFORM_ID, ChangeDetectorRef, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Subscription } from 'rxjs';
import { WINDOW } from './modules/window';
import { LoaderProvider } from './providers';

@Component({
  selector: 'application',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements AfterViewInit, OnDestroy {

  isOnline = true;
  update = false;
  subscription!: Subscription;
  translations: { [key: string]: string } = this.activated.snapshot.data.translations;

  constructor(
    private SwUpdate: SwUpdate,
    private activated: ActivatedRoute,
    private change: ChangeDetectorRef,
    private LoaderProvider: LoaderProvider,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.LoaderProvider.load();
    if (isPlatformBrowser(this.platformId)) {
      this.isOnline = navigator.onLine;
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && this.SwUpdate.isEnabled) {

      this.subscription = this.SwUpdate.versionUpdates.subscribe((event) => {
        switch (event.type) {
          case ('VERSION_READY'): {
            this.update = true;
            this.change.markForCheck();
            break;
          }
        }

      });

    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @HostListener('window:online', ['$event'])
  online(): void {
    this.isOnline = true;
    this.change.markForCheck();
  }

  @HostListener('window:offline', ['$event'])
  offline(): void {
    this.isOnline = false;
    this.change.markForCheck();
  }

  onUpdate() {
    this.window.location.reload();
  }

}
