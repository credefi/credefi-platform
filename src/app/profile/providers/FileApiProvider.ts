import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ProfileProvidersModule } from './module';
import { MapProvider } from 'src/app/providers';
import { Environment } from 'src/globals/config';

@Injectable({
  providedIn: ProfileProvidersModule
})

export class FileApiProvider {

  constructor(
    private HttpClient: HttpClient,
    private MapProvider: MapProvider
  ) { }

  get(path: string): Observable<ArrayBuffer> {
    return <Observable<ArrayBuffer>>this.HttpClient
      .get(`${Environment.api_url}/api/${Environment.api_version}/${path}`, { withCredentials: true, headers: this.getHaders(), responseType: 'arraybuffer' })
  }

  private getHaders() {
    const token = this.MapProvider.get(MapProvider.TOKEN);
    
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;

  }

}
