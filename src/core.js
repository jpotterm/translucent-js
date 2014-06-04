"use strict";

var tlc = {};
tlc.instances = [];

tlc.toArray = function(xs) {
    return Array.prototype.slice.call(xs);
};

tlc.cloneArray = tlc.toArray;

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

tlc.apply = tlc.curry(function(f, args) {
    return f.apply(null, args);
});

tlc.concat = function() {
    var args = tlc.toArray(arguments);

    return args[0].concat.apply(args[0], args.slice(1));
};

tlc.partial = function() {
    var args = tlc.toArray(arguments);
    var f = args[0];
    var partialArgs = args.slice(1);

    return function () {
        return tlc.apply(f, tlc.concat(partialArgs, tlc.toArray(arguments)));
    };
};

tlc.reverse = function(xs) {
    return tlc.cloneArray(xs).reverse();
};

tlc.reduce = tlc.curry(function(f, initVal, xs) {
    for (var i = 0; i < xs.length; ++i) {
        initVal = f(initVal, xs[i]);
    }

    return initVal;
});

tlc.reduceRight = tlc.curry(function(f, initVal, xs) {
    for (var i = xs.length - 1; i >= 0; --i) {
        initVal = f(xs[i], initVal);
    }

    return initVal;
});

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

tlc.memoizeBy = tlc.curry(function(hasher, f) {
    var values = {};

    return function() {
        var args = tlc.toArray(arguments);
        var hash = hasher(args);

        if (values[hash] === undefined) {
            values[hash] = tlc.apply(f, args);
        }

        return values[hash];
    };
});

tlc.memoize = tlc.memoizeBy(JSON.stringify);

tlc.not = function(value) {
    return !value;
};

tlc.op = {
    "+": tlc.curry(function(x, y) {
        return x + y;
    }),
    "-": tlc.curry(function(x, y) {
        return x - y;
    }),
    "*": tlc.curry(function(x, y) {
        return x * y;
    }),
    "/": tlc.curry(function(x, y) {
        return x / y;
    }),
    "===": tlc.curry(function(x, y) {
        return x === y;
    }),
    "<": tlc.curry(function(x, y) {
        return x < y;
    }),
    "<=": tlc.curry(function(x, y) {
        return x <= y;
    }),
    ">": tlc.curry(function(x, y) {
        return x > y;
    }),
    ">=": tlc.curry(function(x, y) {
        return x >= y;
    }),
    "&&": tlc.curry(function(x, y) {
        return x && y;
    }),
    "||": tlc.curry(function(x, y) {
        return x || y;
    })
};

tlc.fop = {};
(function() {
    var flippedOperators = ["-", "/", "<", "<=", ">", ">="];

    for (var i = 0; i < flippedOperators.length; ++i) {
        var operator = flippedOperators[i];
        tlc.fop[operator] = tlc.flip(tlc.op[operator]);
    }
}());

tlc.extend = function(x, y) {
    function extendDestructive(x, y) {
        for(var i in y) {
            x[i] = y[i];
        }
    }

    var result = {};

    extendDestructive(result, x);
    extendDestructive(result, y);

    return result;
};

tlc.prop = tlc.curry(function(propertyName, obj) {
    return obj[propertyName];
});

tlc.addInstance = function(type, implementation) {
    var instance = tlc.getInstance(type);

    if (instance === undefined) {
        tlc.instances.push({type: type, implementation: implementation});
    } else {
        instance.implementation = tlc.extend(instance.implementation, implementation);
    }
};

tlc.getInstance = function(type) {
    for (var i = 0; i < tlc.instances.length; ++i) {
        var instance = tlc.instances[i];

        if (instance.type === type) {
            return instance;
        }
    }

    return undefined;
};

tlc.getInstanceFunc = function(type, functionName) {
    var instance = tlc.getInstance(type);

    if (instance === undefined) {
        return undefined;
    }

    return instance.implementation[functionName];
};


module.exports = tlc;
