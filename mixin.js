'use strict';

var assign = Object.assign || require('object-assign');

let mixins = Symbol('mixins');

/**
 * Checks if an instance inherits a mixin
 * @param  {object} instance  the object to test inheritance on
 * @param  {string} mixinName the name of the mixin to test inheritance for
 * @return {boolean}          whether the instance object inherits from the named mixin
 */
function doesInherit(instance, mixinName) {
    if(mixins in instance) {
        return instance[mixins].indexOf(mixinName) !== -1;
    }

    return false;
}

/**
 * Registers a mixin on an object
 * @param  {string} mixinName the name of the mixin
 * @param  {object} instance  the object to register on
 * @return {void}
 */
function registerMixinOnObject(mixinName, instance) {
    if(!(mixins in instance)) {
        instance[mixins] = [];
    }

    instance[mixins].push(mixinName);
}

/**
 * Applies a mixin to an object
 * @param  {object} instance the object to apply to
 * @param  {object} mixin    the mixin to apply
 * @return {object}          the mixed object result
 */
function mix(instance, mixin) {
    var res;

    if(!doesInherit(instance, mixin)) {
        res = assign(instance, mixin.prototype);
        registerMixinOnObject(mixin.name, instance);
    } else {
        res = instance;
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

        /**
         * Mix this mixin into a given object
         * @param  {object} obj object that with inherit this mixin
         * @return {object}     mixed-in object
         */
        mix(obj) {
            return mix(obj, this);
        },

        /**
         * Checks if a given object inherits from this mixin
         * @param  {object} obj object to test
         * @return {boolean}    whether the object inherits from the mixin
         */
        inheritedBy(obj) {
            return doesInherit(obj, this.name);
        }
    };
}

module.exports = {mix, create, doesInherit};
