"use strict";

var tlc = require("./core.js");


tlc.reduce = tlc.curry(function(f, accumulator, xs) {
    for (var i = 0; i < xs.length; ++i) {
        accumulator = f(accumulator, xs[i]);
    }

    return accumulator;
});

tlc.reduceRight = tlc.curry(function(f, accumulator, xs) {
    for (var i = xs.length - 1; i >= 0; --i) {
        accumulator = f(xs[i], accumulator);
    }

    return accumulator;
});

tlc.filter = tlc.curry(function(p, xs) {
    function concatIfPasses(p, xs, y) {
        return p(y) ? tlc.concat(xs, [y]) : xs;
    }

    return tlc.reduce(concatIfPasses, [], xs);
});

tlc.findIndex = tlc.curry(function(p, xs) {
    for (var i = 0; i < xs.length; ++i) {
        if (p(xs[i])) {
            return i;
        }
    }

    return undefined;
});

tlc.find = tlc.curry(function(p, xs) {
    var i = tlc.findIndex(p, xs);

    if (i === undefined) {
        return undefined;
    }

    return xs[i];
});

tlc.groupBy = tlc.curry(function(eq, xs) {
    var groups = [];
    var currentGroup = [];

    for (var i = 0; i < xs.length; ++i) {
        var item = xs[i];

        if (currentGroup.length === 0) {
            currentGroup.push(item);
        } else {
            if (eq(currentGroup[0], item)) {
                currentGroup.push(item);
            } else {
                groups.push(currentGroup);
                currentGroup = [item];
            }
        }
    }

    if (currentGroup.length !== 0) {
        groups.push(currentGroup);
    }

    return groups;
});

tlc.group = tlc.groupBy(tlc.op["==="]);

tlc.minimum = tlc.apply(Math.min);
tlc.maxiumum = tlc.apply(Math.max);

tlc.sum = function(xs) {
    return tlc.reduce(tlc.op["+"], xs, 0);
};

tlc.product = function(xs) {
    return tlc.reduce(tlc.op["*"], xs, 1);
};

tlc.length = function(xs) {
    return xs.length;
};

tlc.transpose = function(xss) {
    var w = xss.length;
    var h = tlc.minimum(tlc.map(tlc.length, xss));
    var transposed = new Array(h);

    for (var i = 0; i < h; ++i) {
        transposed[i] = new Array(w);

        for (var j = 0; j < w; ++j) {
            transposed[i][j] = xss[j][i];
        }
    }

    return transposed;
};

tlc.zipWith = tlc.curry(function(f) {
    var xss = tlc.toArray(arguments).slice(1);
    return tlc.map(f, tlc.transpose(xss));
}, 3);

tlc.zip = tlc.curry(function () {
    return tlc.transpose(tlc.toArray(arguments));
}, 2);

tlc.sortBy = tlc.curry(function(compare, xs) {
    return tlc.cloneArray(xs).sort(compare);
});

tlc.sort = function(xs) {
    return tlc.cloneArray(xs).sort();
};

tlc.flatten = tlc.apply(tlc.concat);

tlc.some = tlc.curry(function(p, xs) {
    return tlc.findIndex(p, xs) !== undefined;
});

tlc.every = tlc.curry(function(p, xs) {
    for (var i = 0; i < xs.length; ++i) {
        if (!p(xs[i])) {
            return false;
        }
    }

    return true;
});

tlc.contains = tlc.curry(function(item, xs) {
    return tlc.some(tlc.op["==="](item), xs);
});

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

tlc.range = function(start, stop, step) {
    if (step === undefined) {
        step = 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var result = new Array(length);

    for (var i = 0; i < length; ++i) {
        result[i] = start + i * step;
    }

    return result;
};

tlc.intersperse = tlc.curry(function(sep, xs) {
    var resultCollection = [];

    for (var i = 0; i < xs.length; ++i) {
        if (i !== 0) {
            resultCollection.push(sep);
        }

        resultCollection.push(xs[i]);
    }

    return resultCollection;
});


module.exports = tlc;
