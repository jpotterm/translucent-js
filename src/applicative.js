"use strict";

var tlc = require("./core.js");


tlc.pure = function(type, value) {
    return tlc.callInstance(type, "pure", [value]);
};

tlc.ap = function(maybeF, maybeX) {
    return tlc.callInstance(maybeF.constructor, "ap", [maybeF, maybeX]);
};


module.exports = tlc;
