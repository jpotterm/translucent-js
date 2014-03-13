"use strict";

var tlc = require("./core.js");


tlc.unit = function(type, value) {
    return tlc.callFunction(type, "unit", [value]);
};

tlc.bind = function(monad) {
    var functions = tlc.toArray(arguments).slice(1);
    var result = monad;

    for (var i = 0; i < functions.length; ++i) {
        result = tlc.callFunction(monad.constructor, "bind", [result, functions[i]]);
    }

    return result;
};

// tlc.liftM1 = function(f, monad) {
//     function liftedFunction(f) {
//         return function() {
//             var result = tlc.apply(f, arguments);
//             return tlc.callFunction(monad.constructor, "unit", [result]);
//         };
//     }

//     var liftedF = liftedFunction(f);
//     return tlc.callFunction(monad.constructor, "bind", [monad, liftedF]);
// };

// tlc.liftM2 = function(f, m1, m2) {
//     function liftedFunction(f) {
//         return function() {
//             var result = tlc.apply(f, arguments);
//             return tlc.callFunction(m1.constructor, "unit", [result]);
//         };
//     }

//     var liftedF = tlc.curry(liftedFunction(f), 2);
//     var r1 = tlc.callFunction(m1.constructor, "bind", [m1, liftedF]);
//     var r2 = tlc.callFunction(m1.constructor, "bind", [m2, r1]);

//     return r2;
// };

tlc.liftM = function(f) {
    var monads = tlc.toArray(arguments).slice(1);
    var type = monads[0].constructor;

    function returnMonad(f) {
        return function() {
            var result = tlc.apply(f, arguments);
            return tlc.callFunction(type, "unit", [result]);
        };
    }

    var result = tlc.curry(returnMonad(f), monads.length);

    for (var i = 0; i < monads.length; ++i) {
        var monad = monads[i];
        result = tlc.callFunction(type, "bind", [monad, result]);
    }

    return result;
};


module.exports = tlc;
