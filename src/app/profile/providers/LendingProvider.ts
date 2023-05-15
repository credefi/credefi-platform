import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { ApiProvider } from '../../providers/ApiProvider';
import { ProfileProvidersModule } from './module';

@Injectable({
  providedIn: ProfileProvidersModule
})

export class LendingProvider {

  private path: string = 'lending'
  private paths: string = 'lendings'

  constructor(
    private ApiProvider: ApiProvider
  ) { }

  getStatus() {
    return this.ApiProvider.get(`${this.path}/status`);
  }

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

  getNextPayment() {
    return this.ApiProvider.get(`${this.path}/next-payment`);
  }

  getUserStatus() {
    return this.ApiProvider.get(`${this.path}/user-status`);
  }

  putTransaction({ data, key, name }: IObjectKeys) {
    return this.ApiProvider.put(`${this.path}/transaction/${key}/${name}`, data);
  }

}
