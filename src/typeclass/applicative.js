"use strict";

var tlc = require("../core.js");


tlc.pure = tlc.curry(function(type, value) {
    return tlc.callInstance(type, "pure", [value]);
});

tlc.ap = tlc.curry(function(maybeF, maybeX) {
    return tlc.callInstance(maybeF.constructor, "ap", [maybeF, maybeX]);
});


module.exports = tlc;
