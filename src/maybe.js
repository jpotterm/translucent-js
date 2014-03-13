"use strict";

var tlc = require("./core.js");
require("./functor.js");
require("./applicative.js");
require("./monad.js");


tlc.Maybe = function(isNull, value) {
    this.isNull = isNull;
    this.value = value;
};

var maybeMap = function(f, maybe) {
    return maybe.isNull ? maybe : new tlc.Maybe(false, f(maybe.value));
};

var maybeUnit = function(value) {
    return new tlc.Maybe(false, value);
};

var maybeBind = function(maybe, f) {
    return maybe.isNull ? maybe : f(maybe.value);
};

var maybeAp = function(maybeF, maybeX) {
    return maybeF.isNull ? maybeF : tlc.map(maybeF.value, maybeX);
};

tlc.addInstance(tlc.Maybe, {
    // Functor
    map: maybeMap,

    // Applicative
    pure: maybeUnit,
    ap: maybeAp,

    // Monad
    unit: maybeUnit,
    bind: maybeBind
});


module.exports = tlc;
