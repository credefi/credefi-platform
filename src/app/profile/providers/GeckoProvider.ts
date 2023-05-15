import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { ProfileProvidersModule } from './module';

@Injectable({
    providedIn: ProfileProvidersModule
})
 
export class GeckoProvider {

    api = `https://api.coingecko.com/api/v3/simple/price?ids=credefi&vs_currencies=USD`;

    constructor(
        private HttpClient: HttpClient
    ) { }

    get(): Observable<{ result: IObjectKeys, error: IObjectKeys, errors?: IObjectKeys, params?: IObjectKeys, functions?: IObjectKeys }> {
        return <Observable<{ result: IObjectKeys, error: IObjectKeys, errors?: IObjectKeys, params?: IObjectKeys, functions?: IObjectKeys }>>this.HttpClient
            .get(this.api)
    }

}
