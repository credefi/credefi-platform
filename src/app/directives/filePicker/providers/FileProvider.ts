import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProvidersModule } from './module'
import { Environment } from '../../../../globals/config';
import { MapProvider } from 'src/app/providers';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Injectable({
  providedIn: ProvidersModule
})

export class FileProvider {

  constructor(
    private Http: HttpClient,
    private MapProvider: MapProvider,
  ) { }

  post({ formData }: { formData: FormData }): Observable<{ result: IObjectKeys, error?: IObjectKeys | string, errors?: IObjectKeys }> {
    return <Observable<{ result: IObjectKeys, error: IObjectKeys, errors?: IObjectKeys }>>this.Http
      .post(`${Environment.api_url}/api/${Environment.api_version}/upload/file/image`, formData, { headers: this.getHaders(), withCredentials: true })
  }

  postPDF({ formData }: { formData: FormData }): Observable<{ result: IObjectKeys, error?: IObjectKeys | string, errors?: IObjectKeys }> {
    return <Observable<{ result: IObjectKeys, error: IObjectKeys, errors?: IObjectKeys }>>this.Http
      .post(`${Environment.api_url}/api/${Environment.api_version}/upload/file/pdf`, formData, { headers: this.getHaders(), withCredentials: true })
  }


  private getHaders() {
    const token = this.MapProvider.get(MapProvider.TOKEN);

    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`).set('ngsw-bypass', `true`);
    }

    return new HttpHeaders().set('ngsw-bypass', `true`);

  }


}
