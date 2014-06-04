"use strict";

var tlc = require("../core.js");


tlc.unit = function(type, value) {
    var unit = tlc.getInstanceFunc(type, "unit").value;
    return unit(value);
};

tlc.bind = function(monad) {
    var functions = tlc.toArray(arguments).slice(1);
    var bind = tlc.getInstanceFunc(monad.constructor, "bind").value;
    var result = monad;

    for (var i = 0; i < functions.length; ++i) {
        result = bind(result, functions[i]);
    }

    return result;
};


module.exports = tlc;
