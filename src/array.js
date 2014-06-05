"use strict";

var tlc = require("./core.js");


tlc.toArray = function(xs) {
    return Array.prototype.slice.call(xs);
};

tlc.cloneArray = tlc.toArray;

tlc.append = function() {
    var args = tlc.toArray(arguments);

    return args[0].concat.apply(args[0], args.slice(1));
};

tlc.reverse = function(xs) {
    return tlc.cloneArray(xs).reverse();
};

tlc.reduce = function(f, initVal, xs) {
    for (var i = 0; i < xs.length; ++i) {
        initVal = f(initVal, xs[i]);
    }

    return initVal;
};

tlc.reduceRight = function(f, initVal, xs) {
    for (var i = xs.length - 1; i >= 0; --i) {
        initVal = f(xs[i], initVal);
    }

    return initVal;
};

tlc.filter = function(p, xs) {
    function appendIfPasses(xs, y) {
        return p(y) ? tlc.append(xs, [y]) : xs;
    }

    return tlc.reduce(appendIfPasses, [], xs);
};

tlc.findIndex = function(p, xs) {
    for (var i = 0; i < xs.length; ++i) {
        if (p(xs[i])) {
            return new tlc.Maybe(true, i);
        }
    }

    return new tlc.Maybe(false);
};

tlc.find = function(p, xs) {
    var xsProp = tlc.flip(tlc.prop)(xs);
    return tlc.map(xsProp, tlc.findIndex(p, xs));
};

tlc.groupBy = function(eq, xs) {
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
};

tlc.group = function(xs) {
    return tlc.groupBy(tlc.op["==="], xs);
};

tlc.minimum = function(xs) {
    return tlc.apply(Math.min, xs);
};

tlc.maximum = function(xs) {
    return tlc.apply(Math.max, xs);
};

tlc.sum = function(xs) {
    return tlc.reduce(tlc.op["+"], 0, xs);
};

tlc.product = function(xs) {
    return tlc.reduce(tlc.op["*"], 1, xs);
};

tlc.and = function(xs) {
    return tlc.reduce(tlc.op["&&"], true, xs);
};

tlc.or = function(xs) {
    return tlc.reduce(tlc.op["||"], false, xs);
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

tlc.zipWith = function(f) {
    var xss = tlc.toArray(arguments).slice(1);
    return tlc.map(tlc.apply(f), tlc.transpose(xss));
};

tlc.zip = function() {
    return tlc.transpose(tlc.toArray(arguments));
};

tlc.sortBy = function(compare, xs) {
    return tlc.cloneArray(xs).sort(compare);
};

tlc.sort = function(xs) {
    return tlc.cloneArray(xs).sort();
};

tlc.concat = function(xss) {
    return tlc.apply(tlc.append, xss);
};

tlc.some = function(p, xs) {
    return tlc.or(tlc.map(p, xs));
};

tlc.every = function(p, xs) {
    return tlc.and(tlc.map(p, xs));
};

tlc.contains = function(item, xs) {
    return tlc.some(tlc.op["==="](item), xs);
};

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

tlc.intersperse = function(sep, xs) {
    var resultCollection = [];

    for (var i = 0; i < xs.length; ++i) {
        if (i !== 0) {
            resultCollection.push(sep);
        }

        resultCollection.push(xs[i]);
    }

    return resultCollection;
};


module.exports = tlc;
