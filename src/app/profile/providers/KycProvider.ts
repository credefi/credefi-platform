import { Injectable, PLATFORM_ID, Inject, RendererFactory2, Renderer2 } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ProfileProvidersModule } from './module';
import { UserProvider, LoaderProvider } from '../../providers';

@Injectable({
  providedIn: ProfileProvidersModule
})

export class KycProvider {

  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    private UserProvider: UserProvider,
    private LoaderProvider: LoaderProvider,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platform: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initIframe() {
    if (isPlatformBrowser(this.platform)) {
      this.LoaderProvider.show();
      return this.UserProvider.prepareKYC().subscribe(({ result }) => {
         if (result.event && result.event === 'request.pending') {
          this.createIframe(result.verification_url)
        }
      });

    }

  }

  private createIframe(src: string) {

    if (isPlatformBrowser(this.platform)) {
      let iframe: HTMLIFrameElement = this.renderer.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.id = 'shuftipro-iframe';
      iframe.name = 'shuftipro-iframe';
      iframe.allow = 'camera';
      iframe.src = src;
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.bottom = '0';
      iframe.style.right = '0';
      iframe.style.margin = '0';
      iframe.style.padding = '0';
      iframe.style.overflow = 'hidden';
      iframe.style.border = 'none';
      iframe.style.zIndex = '2147483647';
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.dataset.removable = 'true';

      this.document.body.appendChild(iframe);

    }

  }

}
