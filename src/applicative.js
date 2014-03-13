"use strict";

var tlc = require("./core.js");


tlc.pure = function(type, value) {
    return tlc.callFunction(type, "pure", [value]);
};

tlc.ap = function(maybeF, maybeX) {
    return tlc.callFunction(maybeF.constructor, "ap", [maybeF, maybeX]);
};


module.exports = tlc;
