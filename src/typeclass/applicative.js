"use strict";

var tlc = require("../core.js");


tlc.pure = function(type, value) {
    var pure = tlc.getInstanceFunc(type, "pure").value;
    return pure(value);
};

tlc.ap = function(maybeF, maybeX) {
    var ap = tlc.getInstanceFunc(maybeF.constructor, "ap").value;
    return ap(maybeF, maybeX);
};


module.exports = tlc;
