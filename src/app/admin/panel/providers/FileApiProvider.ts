import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Environment } from '../../../../globals/config';
import { MapProvider } from '../../../providers';
import { IObjectKeys } from '../../../helpers/interfaces';
import { AdminPanelProvidersModule } from './module';

@Injectable({
  providedIn: AdminPanelProvidersModule
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

  post(path: string, body?: IObjectKeys): Observable<ArrayBuffer> {
    return <Observable<ArrayBuffer>>this.HttpClient
      .post(`${Environment.api_url}/api/${Environment.api_version}/${path}`, body, { withCredentials: true, headers: this.getHaders(), responseType: 'arraybuffer' })
  }

  put(path: string, body?: IObjectKeys): Observable<ArrayBuffer> {
    return <Observable<ArrayBuffer>>this.HttpClient
      .put(`${Environment.api_url}/api/${Environment.api_version}/${path}`, body, { withCredentials: true, headers: this.getHaders(), responseType: 'arraybuffer' })
  }

  patch(path: string, body?: IObjectKeys): Observable<ArrayBuffer> {
    return <Observable<ArrayBuffer>>this.HttpClient
      .patch(`${Environment.api_url}/api/${Environment.api_version}/${path}`, body, { withCredentials: true, headers: this.getHaders(), responseType: 'arraybuffer' })
  }

  delete(path: string): Observable<ArrayBuffer> {
    return <Observable<ArrayBuffer>>this.HttpClient
      .delete(`${Environment.api_url}/api/${Environment.api_version}/${path}`, { withCredentials: true, headers: this.getHaders(), responseType: 'arraybuffer' })
  }

  private getHaders() {
    const token = this.MapProvider.get(MapProvider.TOKEN);
    const language = this.MapProvider.get(MapProvider.LANGUAGE);
    
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    if (language) {
      headers = headers.set('language', language);
    }

    return headers;

  }

}
