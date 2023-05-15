import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';

import { ApiProvider } from '../../providers';
import { ProfileProvidersModule } from './module';

@Injectable({
  providedIn: ProfileProvidersModule
})

export class StakingProvider {

  private path: string = 'staking'

  constructor(
    private ApiProvider: ApiProvider
  ) { }

  post(data: IObjectKeys) {
    return this.ApiProvider.post(this.path, data);
  }

  getBalance({ address, chain }: IObjectKeys): Observable<number> {
    return <Observable<number>>this.ApiProvider.get(`${this.path}/balance?address=${address}&chain=${chain}`).pipe(map(({ result, error }) => {
      if (error) {
        return 0;
      }
      return result;
    }));

  }

}
