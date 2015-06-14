# Simple mixins for javascript

Being free of rigid class inheritance in javascript is great. Using mixins helps promote the single responsibility principle and keeps your code as DRY as possible (or necessary). This library doesn't do anything particularly fancy, it just allows you to easily create mixins and check inheritance for them. It tries to stay as close as possible to a simple `Object.assign` call, while making it slightly easier to keep everything organised.

## Usage

### Creating a mixin

    var MyMixin = mixin.create('MyMixin', {
        // some methods and maybe some state?
    });

This creates a mixin object with defined state / functionality.

### Applying a mixin

    var Person = function Person(name) {
        this.rename(name);
    };
    Person.prototype.name = null;
    Person.prototype.rename = function rename(name) {
        this.name = name;
    };

    var Greeter = mixin.create('Greeter', {
        greet(other) {
            return `Hello, ${other}, my name is {this.name}`;
        }
    });

    Greeter.mix(Person.prototype);
    // or: mixin.mix(Person.prototype, Greeter);

    console.log((new Person('Jane')).greet('John')); // "Hello John, my name is Jane"

Multiple mixins can be applied to a single object in one function call to `mixin.mix()`:

    mixin.mix(objectToAugment, Mixin1, Mixin2, ...);

### Checking inheritance

    var MyMixin = mixin.create('MyMixin', {
        // ...
    });

    MyMixin.inheritedBy(someObject); // true if MyMixin has been applied to someObject, otherwise false

This can also be checked with just the name of the mixin using `doesInherit()`:

    mixin.doesInherit(someObject, MyMixin.name);

## Tests

To run tests use `npm test`

## Node version

This module uses some ES6 features, so can be used in the browser using `babel` to transform it, or requires node>=2.x
