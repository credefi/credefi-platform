import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { ApiProvider } from '../../providers/ApiProvider';
import { ProfileProvidersModule } from './module';

@Injectable({
  providedIn: ProfileProvidersModule
})

export class TransactionProvider {

  private path: string = 'transaction'
  private paths: string = 'transactions'

  constructor(
    private ApiProvider: ApiProvider
  ) { }

  post(data: IObjectKeys) {
    return this.ApiProvider.post(this.path, data);
  }

  getList({ skip, limit }: { skip: number, limit: number }) {
    return this.ApiProvider.get(`${this.paths}/list?skip=${skip}&limit=${limit}`).pipe(map((res: any) => {
      if (res.result) {
        return res.result;
      }
      return [];
    }));
  }

}
