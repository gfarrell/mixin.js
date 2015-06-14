'use strict';

var assign = Object.assign || require('object-assign');

/**
 * Checks if an instance inherits a mixin
 * @param  {object} instance  the object to test inheritance on
 * @param  {string} mixinName the name of the mixin to test inheritance for
 * @return {boolean}          whether the instance object inherits from the named mixin
 */
function doesInherit(instance, mixinName) {
    if('__mixins' in instance) {
        return instance.__mixins.indexOf(mixinName) !== -1;
    }

    return false;
}

/**
 * Registers a mixin on an object
 * @param  {string} mixinName the name of the mixin
 * @param  {object} object    the object to register on
 * @return {void}
 */
function registerMixinOnObject(mixinName, object) {
    if(!('__mixins' in object)) {
        object.__mixins = [];
    }

    object.__mixins.push(mixinName);
}

/**
 * Applies a mixin to an object
 * @param  {object} obj   the object to apply to
 * @param  {object} mixin the mixin to apply
 * @return {object}       the mixed object result
 */
function mix(obj, mixin) {
    var res;

    if(!doesInherit(obj, mixin)) {
        res = assign(obj, mixin.prototype);
        registerMixinOnObject(mixin.name, obj);
    } else {
        res = obj;
    }

    return res;
}

/**
 * Creates a mixin
 * @param  {string} name      a (unique) name for the mixin
 * @param  {object} prototype the prototype object for the mixin
 * @return {object}           a mixin that can be used with mixin.mix
 */
function create(name, prototype) {
    return {
        name,
        prototype,
        mix(obj) {
            return mix(obj, this);
        }
    };
}

module.exports = {mix, create};
