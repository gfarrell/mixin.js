'use strict';

jest.dontMock('../mixin.js');

describe('mixin', function() {
    var mixin = require('../mixin.js');

    it('has a name, prototype and mix method', function() {
        var x = mixin.create('TestMixin', {});
        expect(x.name).toEqual('TestMixin');
        expect(typeof x.prototype).toBe('object');
        expect(typeof x.mix).toBe('function');
    });
});
