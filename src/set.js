"use strict";

var tlc = require("./core.js");


tlc.uniqueBy = function(eq, xs) {
    var result = [];
    eq = tlc.curry(eq);

    for (var i = 0; i < xs.length; ++i) {
        var x = xs[i];

        if (!tlc.some(eq(x), result)) {
            result.push(x);
        }
    }

    return result;
};

tlc.unique = function(xs) {
    return tlc.uniqueBy(tlc.op["==="], xs);
};

tlc.unionBy = function(eq) {
    var collections = tlc.toArray(arguments).slice(1);
    return tlc.uniqueBy(eq, tlc.concat(collections));
};

tlc.union = function() {
    var args = tlc.append([tlc.op["==="]], tlc.toArray(arguments));
    return tlc.apply(tlc.unionBy, args);
};

tlc.intersectBy = function(eq, collection1) {
    var rest = tlc.toArray(arguments).slice(2);

    eq = tlc.curry(eq);

    // True iff item is in xs
    var hasItem = function(item, xs) {
        return tlc.some(eq(item), xs);
    };

    hasItem = tlc.curry(hasItem);

    // True iff item is in every other xs
    var inRest = function(item) {
        return tlc.every(hasItem(item), rest);
    };

    return tlc.filter(inRest, collection1);
};

tlc.intersect = function() {
    var args = tlc.append([tlc.op["==="]], tlc.toArray(arguments));
    return tlc.apply(tlc.intersectBy, args);
};


module.exports = tlc;
