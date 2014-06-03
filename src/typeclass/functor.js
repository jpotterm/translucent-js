"use strict";

var tlc = require("../core.js");


tlc.map = tlc.curry(function(f, functor) {
    return tlc.callInstance(functor.constructor, "map", arguments);
});


module.exports = tlc;
