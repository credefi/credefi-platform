import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { ApiProvider } from '../../../providers';
import { AdminPanelProvidersModule } from './module';
import { BasicUser } from 'src/app/model';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Injectable({
    providedIn: AdminPanelProvidersModule
})

export class UserProvider {

    private path = 'user'
    private paths = 'users'

    constructor(
        private ApiProvider: ApiProvider
    ) { }


    get({ skip = 0, limit = 50, role }: IObjectKeys) {

        let params = new HttpParams().append('skip', skip.toString()).append('limit', limit.toString());

        if (role) {
            params = params.append(`role`, role.toString());
        }

        return this.ApiProvider.get(`${this.paths}?${params.toString()}`).pipe(map(({ result, error }) => {
            if (error) {
                return [];
            }
            return result.map((user: IObjectKeys) => new BasicUser(user));
        }));
    }

    searchUser({ email }: { email: string }) {
        return this.ApiProvider.get(`${this.paths}/search/${email}`).pipe(map(({ result, error }) => {
            if (error) {
                return [];
            }
            return result.map((user: IObjectKeys) => new BasicUser(user));
        }));
    }

    setKeyStore(keystore: IObjectKeys) {
        return this.ApiProvider.put(`${this.path}/keystore`, {
            keystore
        });
    }

    getKeyStore() {
        return this.ApiProvider.get(`${this.path}/keystore`);
    }


    updateRole(userId: string, data: IObjectKeys) {
        return this.ApiProvider.put(`${this.path}/update-role`, {
            userId,
            data
        });
    }

}
