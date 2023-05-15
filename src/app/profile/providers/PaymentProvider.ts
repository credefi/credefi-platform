import { Injectable } from '@angular/core';

import { ApiProvider } from '../../providers';
import { ProfileProvidersModule } from './module';

@Injectable({
    providedIn: ProfileProvidersModule
})

export class PaymentProvider {

    private path = 'payment'

    constructor(
        private ApiProvider: ApiProvider
    ) { }

    getHashedAddress() {
        return this.ApiProvider.get(`${this.path}/mercuryoio/hash`);
    }

}