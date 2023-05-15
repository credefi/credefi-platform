import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { ApiProvider } from '../../../providers/ApiProvider';
import { AdminPanelProvidersModule } from './module';

@Injectable({
  providedIn: AdminPanelProvidersModule
})

export class LoanProvider {

  private path: string = 'loan'
  private paths: string = 'loans'

  constructor(
    private ApiProvider: ApiProvider
  ) { }

  post(data: IObjectKeys) {
    return this.ApiProvider.post(this.path, data);
  }

  getList({ skip, limit, text }: { skip: number, limit: number, text?: string }) {

    let params = new HttpParams().append('skip', skip.toString()).append('limit', limit.toString());

    if (text != null) {
      params = params.append('text', (text as string));
    }

    return this.ApiProvider.get(`${this.paths}/admin/list?${params.toString()}`).pipe(map((res: any) => {
      if (res.result) {
        return res.result;
      }
      return [];
    }));
  }

  put({ loanKey, update }: IObjectKeys) {
    return this.ApiProvider.put(`${this.path}/admin/${loanKey}`, update);
  }

  get({ loanKey }: IObjectKeys) {
    return this.ApiProvider.get(`${this.path}/admin/${loanKey}`);
  }

}
