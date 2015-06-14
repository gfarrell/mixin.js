'use strict';

jest.dontMock('../mixin.js');
jest.dontMock('object-assign');

describe('mixin', function() {
    var mixin = require('../mixin.js');

    function createBlank() {
        return mixin.create('TestMixin');
    }

    // Basic properties of a mixin
    // ---------------------------
    it('has a name', function() {
        var x = createBlank();
        expect(x.name).toEqual('TestMixin');
    });

    it('has a prototype object', function() {
        expect(typeof createBlank().prototype).toBe('object');
    });

    it('has a `mix()` function', function() {
        expect(typeof createBlank().mix).toBe('function');
    });

    it('has a `inheritedBy()` function', function() {
        expect(typeof createBlank().inheritedBy).toBe('function');
    });

    // Mixing functionality
    // --------------------
    it('can use module-level `mix()` to mix in', function() {
        var x = mixin.create('TestMixin', {
            getName() {
                return this.name;
            }
        });
        var z = {
            name: 'Mixable Object'
        };

        mixin.mix(z, x);

        expect(typeof z.getName).toBe('function');
        expect(z.getName()).toBe('Mixable Object');
    });

    it('can use instance-level `mix()` to mix in', function() {
        var x = mixin.create('TestMixin', {
            getName() {
                return this.name;
            }
        });
        var z = {
            name: 'Mixable Object'
        };

        x.mix(z);

        expect(typeof z.getName).toBe('function');
        expect(z.getName()).toBe('Mixable Object');
    });

    it('can augment an object with multiple mixins', function() {
        var m1 = mixin.create('FirstMixin', {
            name: 'Some Name'
        });
        var m2 = mixin.create('SecondMixin', {
            getName() {
                return this.name;
            }
        });

        var z = {};

        mixin.mix(z, m1, m2);
        expect(z.name).toBe('Some Name');
        expect(typeof z.getName).toBe('function');
        expect(z.getName()).toBe('Some Name');
    });

    // Inheritance checking
    // --------------------
    it('checks inheritance at the module level', function() {
        var m1 = mixin.create('First', {});
        var m2 = mixin.create('Second', {});
        var z = {};
        mixin.mix(z, m1);

        expect(mixin.doesInherit(z, m1.name)).toBeTruthy();
        expect(mixin.doesInherit(z, m2.name)).toBeFalsy();
    });

    it('checks inheritance at the instance level', function() {
        var m1 = mixin.create('First', {});
        var m2 = mixin.create('Second', {});
        var z = {};
        mixin.mix(z, m1);

        expect(m1.inheritedBy(z)).toBeTruthy();
        expect(m2.inheritedBy(z)).toBeFalsy();
    });
});
