import { typeInfo, container } from "./container";
import { constructor } from "./interfaces";
import { getParamInfo } from "./helper";

export function injectable<T>(): (target: constructor<T>) => void {
  return function (target: constructor<T>): void {
    typeInfo.set(target, getParamInfo(target));
  };
}

export function singleton<T>(): (target: constructor<T>) => void {
  return function (target: constructor<T>): void {
    typeInfo.set(target, getParamInfo(target));
    container.registerSingleton(target);
  };
}