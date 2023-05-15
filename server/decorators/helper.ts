import { Dictionary, constructor, InjectionToken } from './interfaces';
import { Reflection } from './reflection'

export const INJECTION_TOKEN_METADATA_KEY = 'injectionTokens';

export function getParamInfo(target: constructor<any>): any[] {

  const params: any[] = Reflection.getMetadata('design:paramtypes', target) || [];
  const injectionTokens: Dictionary<InjectionToken<any>> = Reflection.getOwnMetadata(INJECTION_TOKEN_METADATA_KEY, target) || {};

  Object.keys(injectionTokens).forEach(key => {
    params[+key] = injectionTokens[key];
  });

  return params;
}
