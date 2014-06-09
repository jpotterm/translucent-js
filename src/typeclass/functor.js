"use strict";

var tlc = require("../core.js");


tlc.map = function(f, functor) {
    var type = functor.constructor;
    var maybeMap = tlc.getInstanceFunc(type, "map");

    if (maybeMap.hasValue) {
        return maybeMap.value(f, functor);
    } else {
        // Fall back to Applicative (unit and ap)
        return tlc.ap(tlc.unit(type, f), functor);
    }
};


module.exports = tlc;
