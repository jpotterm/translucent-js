"use strict";

var tlc = require("./core.js");
require("./typeclass/functor.js");
require("./typeclass/applicative.js");
require("./typeclass/monad.js");


var maybeUnit = function(value) {
    return new tlc.Maybe(true, value);
};

var maybeBind = function(maybe, f) {
    return maybe.hasValue ? f(maybe.value) : maybe;
};

var maybeAp = function(maybeF, maybeX) {
    return maybeF.hasValue ? tlc.map(maybeF.value, maybeX) : maybeF;
};

tlc.addInstance(tlc.Maybe, {
    // Applicative
    pure: maybeUnit,
    ap: maybeAp,

    // Monad and Functor
    unit: maybeUnit,
    bind: maybeBind
});

tlc.catMaybes = function(xs) {
    var justs = tlc.filter(tlc.prop("hasValue"), xs);
    return tlc.map(tlc.prop("value"), justs);
};

tlc.mapMaybe = tlc.curry(function(f, xs) {
    return tlc.catMaybes(tlc.map(f, xs));
});


module.exports = tlc;
