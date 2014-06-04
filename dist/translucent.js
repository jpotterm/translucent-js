!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.tlc=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");
_dereq_("./maybe.js");
_dereq_("./typeclass/functor.js");


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
            return new tlc.Maybe(true, i);
        }
    }

    return new tlc.Maybe(false);
});

tlc.find = tlc.curry(function(p, xs) {
    var xsProp = tlc.flip(tlc.prop)(xs);
    return tlc.map(xsProp, tlc.findIndex(p, xs));
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

tlc.sum = tlc.reduce(tlc.op["+"], 0);
tlc.product = tlc.reduce(tlc.op["*"], 1);

tlc.and = tlc.reduce(tlc.op["&&"], true);
tlc.or = tlc.reduce(tlc.op["||"], false);

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

tlc.zip = tlc.curry(function() {
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
    return tlc.or(tlc.map(p, xs));
});

tlc.every = tlc.curry(function(p, xs) {
    return tlc.and(tlc.map(p, xs));
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

},{"./core.js":2,"./maybe.js":4,"./typeclass/functor.js":9}],2:[function(_dereq_,module,exports){
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

},{}],3:[function(_dereq_,module,exports){
"use strict";

module.exports = _dereq_("./core.js");
_dereq_("./array.js");
_dereq_("./maybe.js");
_dereq_("./set.js");
_dereq_("./object.js");
_dereq_("./typeclass/functor.js");
_dereq_("./typeclass/monad.js");
_dereq_("./typeclass/applicative.js");
_dereq_("./typeclass/contravariant.js");
_dereq_("./typeclass/monoid.js");

},{"./array.js":1,"./core.js":2,"./maybe.js":4,"./object.js":5,"./set.js":6,"./typeclass/applicative.js":7,"./typeclass/contravariant.js":8,"./typeclass/functor.js":9,"./typeclass/monad.js":10,"./typeclass/monoid.js":11}],4:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");
_dereq_("./typeclass/functor.js");
_dereq_("./typeclass/applicative.js");
_dereq_("./typeclass/monad.js");


tlc.Maybe = function(hasValue, value) {
    this.hasValue = hasValue;
    this.value = value;
};

var maybeUnit = function(value) {
    return new tlc.Maybe(true, value);
};

var maybeBind = function(maybe, f) {
    return maybe.hasValue ? f(maybe.value) : maybe;
};

var maybeAp = function(maybeF, maybeX) {
    return maybeF.hasValue ? tlc.map(maybeF.value, maybeX) : maybeF;
};

tlc.addInstance(tlc.Maybe, {
    // Applicative
    pure: maybeUnit,
    ap: maybeAp,

    // Monad and Functor
    unit: maybeUnit,
    bind: maybeBind
});

tlc.catMaybes = function(xs) {
    var justs = tlc.filter(tlc.prop("hasValue"), xs);
    return tlc.map(tlc.prop("value"), justs);
};

tlc.mapMaybe = tlc.curry(function(f, xs) {
    return tlc.catMaybes(tlc.map(f, xs));
});


module.exports = tlc;

},{"./core.js":2,"./typeclass/applicative.js":7,"./typeclass/functor.js":9,"./typeclass/monad.js":10}],5:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");


tlc.propCall = tlc.curry(function(propertyName, args, obj) {
    return obj[propertyName].apply(obj, args);
});


module.exports = tlc;

},{"./core.js":2}],6:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");
_dereq_("./array.js");

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

},{"./array.js":1,"./core.js":2}],7:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("../core.js");


tlc.pure = tlc.curry(function(type, value) {
    var pure = tlc.getInstanceFunc(type, "pure");
    return pure(value);
});

tlc.ap = tlc.curry(function(maybeF, maybeX) {
    var ap = tlc.getInstanceFunc(maybeF.constructor, "ap");
    return ap(maybeF, maybeX);
});


module.exports = tlc;

},{"../core.js":2}],8:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("../core.js");


tlc.contramap = tlc.curry(function(f, contravariant) {
    var contramap = tlc.getInstanceFunc(contravariant.constructor, "contramap");
    return contramap(f, contravariant);
});


module.exports = tlc;

},{"../core.js":2}],9:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("../core.js");


tlc.map = tlc.curry(function(f, functor) {
    var type = functor.constructor;
    var map = tlc.getInstanceFunc(type, "map");

    if (map !== undefined) {
        return map(f, functor);
    }

    // If a map implementation is not registered, fall back to unit and bind
    var unit = tlc.unit(type);
    return tlc.bind(functor, tlc.compose(unit, f));
});


module.exports = tlc;

},{"../core.js":2}],10:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("../core.js");


tlc.unit = tlc.curry(function(type, value) {
    var unit = tlc.getInstanceFunc(type, "unit");
    return unit(value);
});

tlc.bind = tlc.curry(function(monad) {
    var functions = tlc.toArray(arguments).slice(1);
    var bind = tlc.getInstanceFunc(monad.constructor, "bind");
    var result = monad;

    for (var i = 0; i < functions.length; ++i) {
        result = bind(result, functions[i]);
    }

    return result;
}, 2);


module.exports = tlc;

},{"../core.js":2}],11:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("../core.js");


tlc.mempty = function(type) {
    var mempty = tlc.getInstanceFunc(type, "mempty");
    return mempty();
};

tlc.mappend = tlc.curry(function(x, y) {
    var mappend = tlc.getInstanceFunc(x.constructor, "mappend");
    return mappend(x, y);
});

tlc.mconcat = function(xs) {
    var type = xs[0].constructor;
    return tlc.reduceRight(tlc.mappend, tlc.mempty(type), xs);
};


module.exports = tlc;

},{"../core.js":2}]},{},[3])
(3)
});