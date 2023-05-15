export type constructor<T> = { new(...args: any[]): T };
export type Dictionary<T> = { [key: string]: T };
export type InjectionToken<T = any> = constructor<T> | string;

export const enum Types {
    SINGLETON
}

export interface ClassProvider<T> {
    useClass: constructor<T>;
}

export interface DependencyContainer {

    register<T>(token: InjectionToken<T>, provider: ClassProvider<T>, options: RegistrationOptions): DependencyContainer;

    registerSingleton<T>(from: constructor<T>): DependencyContainer;

    resolve<T>(token: InjectionToken<T>): T;
    isRegistered<T>(token: InjectionToken<T>): boolean;
    reset(): void;
}

export type RegistrationOptions = {
    type: Types
};

export type Provider<T> = ClassProvider<T>;

export type Registration<T = any> = {
    provider: Provider<T>;
    options: RegistrationOptions;
    instance?: T;
};
