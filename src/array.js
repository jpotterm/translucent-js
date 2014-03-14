"use strict";

var tlc = require("./core.js");
require("./functor.js");


tlc.addInstance(Array, {
    map: function(f, xs) {
       var ys = new Array(xs.length);

       for (var i = 0; i < xs.length; ++i) {
           ys[i] = f(xs[i]);
       }

       return ys;
   }
});

tlc.filter = tlc.curry(function(p, xs) {
    function concatIfPasses(xs, y) {
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
tlc.maximum = tlc.apply(Math.max);

tlc.sum = function(xs) {
    return tlc.reduce(tlc.op["+"], 0, xs);
};

tlc.product = function(xs) {
    return tlc.reduce(tlc.op["*"], 1, xs);
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
    return tlc.map(tlc.apply(f), tlc.transpose(xss));
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
