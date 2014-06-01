"use strict";

var tlc = require("./core.js");


tlc.map = function(f, functor) {
    return tlc.callInstance(functor.constructor, "map", arguments);
};


module.exports = tlc;
