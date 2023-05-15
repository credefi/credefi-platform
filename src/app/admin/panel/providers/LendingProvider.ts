import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { FileApiProvider } from '.';
import { ApiProvider } from '../../../providers/ApiProvider';
import { AdminPanelProvidersModule } from './module';

@Injectable({
  providedIn: AdminPanelProvidersModule
})

export class LendingProvider {

  private path: string = 'lending'
  private paths: string = 'lendings'

  constructor(
    private ApiProvider: ApiProvider,
    private FileApiProvider: FileApiProvider
  ) { }

  post(data: IObjectKeys) {
    return this.ApiProvider.post(this.path, data);
  }

  getList({ skip, limit, text, processing, year, month, day }: { skip: number, limit: number, text?: string, processing?: boolean, year?: number | null, month?: number | null, day?: number | null }) {

    let params = new HttpParams().append('skip', skip.toString()).append('limit', limit.toString());

    if (text != null) {
      params = params.append('text', (text as string));
    }

    if (processing) {
      params = params.append('processing', 'true');
    }

    if (year) {
      params = params.append('year', year);
    }

    if (month) {
      params = params.append('month', month);
    }

    if (day) {
      params = params.append('day', day);
    }

    return this.ApiProvider.get(`${this.paths}/admin/list?${params.toString()}`).pipe(map((res: any) => {
      if (res.result) {
        return res.result;
      }
      return [];
    }));
  }

  put({ lendingKey, update }: IObjectKeys) {
    return this.ApiProvider.put(`${this.path}/admin/${lendingKey}`, update);
  }

  getExport({ year, month, day }: IObjectKeys) {
    let params = new HttpParams()

    if (year != null && month != null && day != null) {
      params = params.append('year', year).append('month', month).append('day', day);
    }
    
    return this.FileApiProvider.get(`${this.paths}/export?${params.toString()}`);
  }

}
