"use strict";

var tlc = require("../core.js");


tlc.unit = function(type, value) {
    return tlc.callInstance(type, "unit", [value]);
};

tlc.bind = function(monad) {
    var functions = tlc.toArray(arguments).slice(1);
    var result = monad;

    for (var i = 0; i < functions.length; ++i) {
        result = tlc.callInstance(monad.constructor, "bind", [result, functions[i]]);
    }

    return result;
};

tlc.liftM = function(f) {
    var monads = tlc.toArray(arguments).slice(1);
    var type = monads[0].constructor;

    function returnMonad(f) {
        return function() {
            var result = tlc.apply(f, arguments);
            return tlc.callInstance(type, "unit", [result]);
        };
    }

    var result = tlc.curry(returnMonad(f), monads.length);

    for (var i = 0; i < monads.length; ++i) {
        var monad = monads[i];
        result = tlc.callInstance(type, "bind", [monad, result]);
    }

    return result;
};


module.exports = tlc;
