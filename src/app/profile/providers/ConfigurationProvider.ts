import { Injectable } from '@angular/core';

import { ApiProvider } from '../../providers';
import { ProfileProvidersModule } from './module';

@Injectable({
    providedIn: ProfileProvidersModule
})

export class ConfigurationProvider {

    private path = 'configuration'

    constructor(
        private ApiProvider: ApiProvider
    ) { }

    get() {
        return this.ApiProvider.get(`${this.path}`)
    }

    getTVL() {
        return this.ApiProvider.get(`${this.path}/tvl`)
    }

    getDescription(description: string) {
        return this.ApiProvider.get(`${this.path}/description/${description}`)
    }

}
