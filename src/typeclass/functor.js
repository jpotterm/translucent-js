"use strict";

var tlc = require("../core.js");


tlc.map = tlc.curry(function(f, functor) {
    var type = functor.constructor;
    var map = tlc.getInstanceFunc(type, "map");

    if (map !== undefined) {
        return map(f, functor);
    }

    // If a map implementation is not registered, fall back to unit and bind
    var unit = tlc.unit(type);
    return tlc.bind(functor, tlc.compose(unit, f));
});


module.exports = tlc;
