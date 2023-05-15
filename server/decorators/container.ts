import { ClassProvider, constructor, InjectionToken, Registration, RegistrationOptions, DependencyContainer, Types } from "./interfaces";

class Container implements DependencyContainer {

  private _registry = new Map<InjectionToken<any>, Registration>();

  public resolve<T>(token: InjectionToken<T>): T {

    const registration = this.getRegistration(token);

    switch (registration?.options?.type) {
      case (Types.SINGLETON): {
        if (registration?.instance) {
          return registration.instance
        }
        registration.instance = this.construct(<constructor<T>>token);
        return registration.instance;
      }
      default: {
        return this.construct(<constructor<T>>token);
      }
    }

  }

  public reset(): void {
    this._registry.clear();
  }

  public isRegistered<T>(token: InjectionToken<T>): boolean {
    return this._registry.has(token);
  }

  private construct<T>(ctor: constructor<T>): T {

    const paramInfo = typeInfo.get(ctor);

    if (!paramInfo || paramInfo.length === 0) {
      if (ctor.length === 0) {
        return new ctor();
      } else {
        throw new Error(`TypeInfo not known for "${ctor.name}"`);
      }
    }

    const params = paramInfo.map(param => this.resolve(param));

    return new ctor(...params);
  }

  public registerSingleton<T>(from: constructor<T>): DependencyContainer {
    return this.register(from, {
      useClass: from
    }, { type: Types.SINGLETON });
  }

  public register<T>(token: InjectionToken<T>, provider: ClassProvider<T>, options: RegistrationOptions): DependencyContainer {

    this._registry.set(token, { provider, options });

    return this;
  }

  private getRegistration<T>(token: InjectionToken<T>): Registration | null {
    if (this.isRegistered(token)) {
      return this._registry.get(token)!;
    }

    return null;
  }

}

const typeInfo = new Map<constructor<any>, any[]>();
const container = new Container();

export { typeInfo, container };