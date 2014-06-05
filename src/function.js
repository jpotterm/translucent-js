"use strict";

var tlc = require("./core.js");


tlc.curry = function(f, arity) {
    if (f.curried) {return f;}
    arity = arity || f.length;

    function curriedF() {
        var args = tlc.toArray(arguments);

        if (args.length >= arity) {
            return f.apply(null, args);
        }

        function reapply() {
            return curriedF.apply(null, args.concat(tlc.toArray(arguments)));
        }

        reapply.curried = true;
        return reapply;
    }

    curriedF.curried = true;
    return curriedF;
};

tlc.apply = function(f, args) {
    return f.apply(null, args);
};

tlc.partial = function() {
    var args = tlc.toArray(arguments);
    var f = args[0];
    var partialArgs = args.slice(1);

    return function () {
        return tlc.apply(f, tlc.append(partialArgs, tlc.toArray(arguments)));
    };
};

tlc.pipeline = function() {
    var functions = tlc.toArray(arguments);

    return function(x) {
        for (var i = 0; i < functions.length; ++i) {
            x = functions[i](x);
        }

        return x;
    };
};

tlc.compose = function() {
    return tlc.apply(tlc.pipeline, tlc.reverse(arguments));
};

tlc.flip = function(f) {
    return tlc.curry(function(x, y) {
        return f(y, x);
    });
};

tlc.memoizeBy = function(hasher, f) {
    var values = {};

    return function() {
        var args = tlc.toArray(arguments);
        var hash = hasher(args);

        if (values[hash] === undefined) {
            values[hash] = tlc.apply(f, args);
        }

        return values[hash];
    };
};

tlc.memoize = function(f) {
    return tlc.memoizeBy(JSON.stringify, f);
};


module.exports = tlc;
