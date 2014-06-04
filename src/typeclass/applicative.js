"use strict";

var tlc = require("../core.js");


tlc.pure = tlc.curry(function(type, value) {
    var pure = tlc.getInstanceFunc(type, "pure");
    return pure(value);
});

tlc.ap = tlc.curry(function(maybeF, maybeX) {
    var ap = tlc.getInstanceFunc(maybeF.constructor, "ap");
    return ap(maybeF, maybeX);
});


module.exports = tlc;
