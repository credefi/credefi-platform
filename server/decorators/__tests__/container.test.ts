import { container, injectable, singleton } from "../index";

interface IBar {
    value: string;
}

afterEach(() => {
    container.reset();
});

test("a singleton registration can be redirected", () => {

    @singleton()
    class MyService { }

    @injectable()
    class MyClass {
        constructor(public myService: MyService) { }
    }

    container.registerSingleton(MyService);
    const myClass = container.resolve(MyClass);

    expect(myClass.myService).toBeInstanceOf(MyService);
});

test("fails to resolve unregistered dependency by name", () => {
    expect(() => {
        container.resolve("NotRegistered");
    }).toThrow();
});

test("resolves transient instances when not registered", () => {
    class Bar { }

    const myBar = container.resolve(Bar);
    const myBar2 = container.resolve(Bar);

    expect(myBar instanceof Bar).toBeTruthy();
    expect(myBar2 instanceof Bar).toBeTruthy();
    expect(myBar).not.toBe(myBar2);
});


test("resolves a singleton instance when class provider registered as singleton", () => {

    @singleton()
    class Bar { }

    const myBar = container.resolve<Bar>(Bar);
    const myBar2 = container.resolve<Bar>(Bar);
    expect(myBar instanceof Bar).toBeTruthy();
    expect(myBar).toBe(myBar2);
});

test("returns true for a registered singleton class", () => {
    @injectable()
    class Bar implements IBar {
        public value = "";
    }

    @injectable()
    class Foo {
        constructor(public myBar: Bar) { }
    }
    container.registerSingleton(Foo);

    expect(container.isRegistered(Foo)).toBeTruthy();
});

test("clears cached instances from container.resolve() calls", () => {
    @singleton()
    class Foo { }
    const instance1 = container.resolve(Foo);

    container.reset();

    // Foo should still be registered as singleton
    const instance2 = container.resolve(Foo);
    const instance3 = container.resolve(Foo);

    expect(instance1).not.toBe(instance2);
    expect(instance2).toStrictEqual(instance3);
    expect(instance3).toBeInstanceOf(Foo);
});

test("resolves dependencies of superclass with no constructor", () => {
    class Dependency { }

    @injectable()
    class SuperClass {
        constructor(public dependency: Dependency) { }
    }

    @injectable()
    class SubClass extends SuperClass { }

    expect(container.resolve(SubClass).dependency).toBeInstanceOf(
        Dependency
    );

});

test("@injectable resolves when not using DI", () => {
    @injectable()
    class Bar implements IBar {
        public value = "";
    }

    @injectable()
    class Foo {
        constructor(public myBar: Bar) { }
    }
    const myValue = "test";
    const myBar = new Bar();
    myBar.value = myValue;

    const myFoo = new Foo(myBar);

    expect(myFoo.myBar.value).toBe(myValue);
});

test("@injectable resolves when using DI", () => {
    @injectable()
    class Bar implements IBar {
        public value = "";
    }

    @injectable()
    class Foo {
        constructor(public myBar: Bar) { }
    }
    const myFoo = container.resolve(Foo);

    expect(myFoo.myBar.value).toBe("");
});

test("@injectable resolves nested dependencies when using DI", () => {
    @injectable()
    class Bar implements IBar {
        public value = "";
    }
    @injectable()
    class Foo {
        constructor(public myBar: Bar) { }
    }
    @injectable()
    class FooBar {
        constructor(public myFoo: Foo) { }
    }
    const myFooBar = container.resolve(FooBar);

    expect(myFooBar.myFoo.myBar.value).toBe("");
});

test("@injectable preserves static members", () => {
    const value = "foobar";

    @injectable()
    class MyStatic {
        public static testVal = value;

        public static testFunc(): string {
            return value;
        }
    }

    expect(MyStatic.testFunc()).toBe(value);
    expect(MyStatic.testVal).toBe(value);
});

test("@injectable handles optional params", () => {
    @injectable()
    class Bar implements IBar {
        public value = "";
    }
    @injectable()
    class Foo {
        constructor(public myBar: Bar) { }
    }
    @injectable()
    class MyOptional {
        constructor(public myFoo?: Foo) { }
    }

    const myOptional = container.resolve(MyOptional);
    expect(myOptional.myFoo instanceof Foo).toBeTruthy();
});

test("@singleton registers class as singleton with the global container", () => {
    @singleton()
    class Bar { }

    const myBar = container.resolve(Bar);
    const myBar2 = container.resolve(Bar);

    expect(myBar instanceof Bar).toBeTruthy();
    expect(myBar).toBe(myBar2);
});

test("dependencies of an @singleton can be resolved", () => {
    class Foo {}
  
    @singleton()
    class Bar {
      constructor(public foo: Foo) {}
    }
  
    const myBar = container.resolve(Bar);
  
    expect(myBar.foo instanceof Foo).toBeTruthy();
  });

  test("passes through the given params", () => {
    @injectable()
    class MyViewModel {
      constructor(public a: any, public b: any, public c: any) {}
    }
  
    const a = {};
    const b = {};
    const c = {};
    const instance = new MyViewModel(a, b, c);
  
    expect(instance.a).toBe(a);
    expect(instance.b).toBe(b);
    expect(instance.c).toBe(c);
  });
  