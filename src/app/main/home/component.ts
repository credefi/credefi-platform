import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapProvider } from 'src/app/providers';
import { Environment } from 'src/globals/config';

@Component({
  selector: 'home-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent {

  user = this.mapProvider.get(MapProvider.USER);
  api_url = Environment.api_url;
  video_url = `${Environment.api_url}/video/intro.mp4`
  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  constructor(
    private mapProvider: MapProvider,
    private activateRoute: ActivatedRoute,
  ) { }

  async toggle(video: HTMLVideoElement) {
    const isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > video.HAVE_CURRENT_DATA;
    if (!isPlaying) {
      try {
        await video.play();
      } catch (e) {
        console.log(e)
      }
    } else {
      video.pause();
    }
  }

}
