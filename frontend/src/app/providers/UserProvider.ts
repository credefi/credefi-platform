import { Injectable, Inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiProvider } from 'src/app/providers/ApiProvider';
import { MapProvider } from 'src/app/providers/MapProvider';
import { IObjectKeys } from '../helpers/interfaces';
import { BasicUser } from '../model';
import { LOCAL_STORAGE } from '../modules/local-storage';

@Injectable({
  providedIn: 'root'
})

export class UserProvider {

  private path = 'user';

  constructor(
    private MapProvider: MapProvider,
    private ApiProvider: ApiProvider,
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
  ) { }

  authenticate({ email, password }: IObjectKeys) {
    return this.ApiProvider.post(`${this.path}/authenticate`, {
      email,
      password
    });
  }

  validateToken({ token }: IObjectKeys) {
    return this.ApiProvider.get(`${this.path}/token?token=${token}`).pipe(map(({ result, errors }) => {
      if (result) {
        const [user, token] = result.user as IObjectKeys[];

        this.MapProvider.set(MapProvider.USER, new BasicUser(user));
        this.MapProvider.set(MapProvider.TOKEN, token);
        this.localStorage.setItem(MapProvider.TOKEN, token as any);
      }

      return { result, errors };

    }));
  }

  validate2faToken({ token, code }: { token: string, code: number }) {
    return this.ApiProvider.post(`${this.path}/2fa-token?token`, { token, code }).pipe(map(({ result, errors }) => {

      if (result) {

        const { user, token } = result;

        this.MapProvider.set(MapProvider.USER, new BasicUser(user));
        this.MapProvider.set(MapProvider.TOKEN, token);
        this.localStorage.setItem(MapProvider.TOKEN, token);
      }

      return { result, errors };

    }));
  }

  logout() {
    return this.ApiProvider.get(`${this.path}/logout`).pipe(map(({ result }) => {
      this.MapProvider.set(MapProvider.USER, null);
      this.MapProvider.set(MapProvider.TOKEN, null);
      this.localStorage.removeItem(MapProvider.TOKEN);
    }));
  }

  async init() {

    const token = this.localStorage.getItem(MapProvider.TOKEN);

    if (token == null) {
      return;
    }

    this.MapProvider.set(MapProvider.TOKEN, token);

    return firstValueFrom(this.get()).then(({ result }) => {
      if (result) {
        this.MapProvider.set(MapProvider.USER, new BasicUser(result));
      }
      return result;
    });

  }

  get() {
    return this.ApiProvider.get(`${this.path}/authenticate`);
  }

  post(data: IObjectKeys) {
    return this.ApiProvider.post(this.path, data);
  }

  updatePassword({ currentPassword, password }: { currentPassword: string, password: string }) {
    return this.ApiProvider.put(`${this.path}/update-password`, { currentPassword, password });
  }

  resetPassword({ email }: IObjectKeys) {
    return this.ApiProvider.post(`${this.path}/reset-password`, { email });
  }

  changePassword({ token, password }: IObjectKeys) {
    return this.ApiProvider.post(`${this.path}/change-password`, { token, password });
  }

  prepareKYC() {
    return this.ApiProvider.get(`${this.path}/kyc-prepare`);
  }

  gaActivate({ code }: IObjectKeys) {
    return this.ApiProvider.post(`${this.path}/ga/activate`, { code });
  }

  gaDeactivate() {
    return this.ApiProvider.post(`${this.path}/ga/deactivate`);
  }

  lastLogin() {
    return this.ApiProvider.get(`${this.path}/last-login`);
  }

  postReferral({ address }: { address: string }) {
    return this.ApiProvider.post(`${this.path}/referral`, { address });
  }

  getReferral({ hash }: { hash: string }) {
    return this.ApiProvider.get(`${this.path}/referral?hash=${hash}`);
  }

  getKYC() {
    return this.ApiProvider.get(`${this.path}/kyc-verified`);
  }

}
