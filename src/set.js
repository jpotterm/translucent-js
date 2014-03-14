"use strict";

var tlc = require("./core.js");
require("./array.js");

tlc.uniqueBy = tlc.curry(function(eq, xs) {
    var result = [];
    eq = tlc.curry(eq);

    for (var i = 0; i < xs.length; ++i) {
        var x = xs[i];

        if (!tlc.some(eq(x), result)) {
            result.push(x);
        }
    }

    return result;
});

tlc.unique = tlc.uniqueBy(tlc.op["==="]);

tlc.unionBy = tlc.curry(function(eq) {
    var collections = tlc.toArray(arguments).slice(1);
    return tlc.uniqueBy(eq, tlc.flatten(collections));
}, 3);

tlc.union = tlc.unionBy(tlc.op["==="]);

tlc.intersectBy = tlc.curry(function(eq, collection1) {
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
}, 3);

tlc.intersect = tlc.intersectBy(tlc.op["==="]);


module.exports = tlc;
