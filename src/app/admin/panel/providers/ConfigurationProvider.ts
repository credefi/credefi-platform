import { Injectable } from '@angular/core';
import { IObjectKeys } from 'src/app/helpers/interfaces';

import { ApiProvider } from '../../../providers';
import { AdminPanelProvidersModule } from './module';

@Injectable({
    providedIn: AdminPanelProvidersModule
})

export class ConfigurationProvider {

    private path = 'configuration'

    constructor(
        private ApiProvider: ApiProvider
    ) { }

    get() {
        return this.ApiProvider.get(`${this.path}/admin`)
    }

    getCurrencyWallet() {
        return this.ApiProvider.get(`${this.path}/currency-wallet`);
    }

    put({ update }: IObjectKeys) {
        return this.ApiProvider.put(`${this.path}`, update);
    }

    putCSV({ item, update }: IObjectKeys) {
        return this.ApiProvider.put(`${this.path}/csv/${item}`, update);
    }

    updateContract() {
        return this.ApiProvider.get(`${this.path}/update-contract`);
    }
}
