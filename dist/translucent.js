!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.tlc=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");


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

},{"./core.js":2}],2:[function(_dereq_,module,exports){
"use strict";

var tlc = {};

module.exports = tlc;

},{}],3:[function(_dereq_,module,exports){
"use strict";

module.exports = _dereq_("./core.js");
_dereq_("./array.js");
_dereq_("./function.js");
_dereq_("./maybe.js");
_dereq_("./object.js");
_dereq_("./operator.js");
_dereq_("./set.js");
_dereq_("./typeclass.js");
_dereq_("./typeclass/functor.js");
_dereq_("./typeclass/monad.js");
_dereq_("./typeclass/applicative.js");
_dereq_("./typeclass/contravariant.js");
_dereq_("./typeclass/monoid.js");
_dereq_("./init.js");

},{"./array.js":1,"./core.js":2,"./function.js":4,"./init.js":5,"./maybe.js":6,"./object.js":7,"./operator.js":8,"./set.js":9,"./typeclass.js":10,"./typeclass/applicative.js":11,"./typeclass/contravariant.js":12,"./typeclass/functor.js":13,"./typeclass/monad.js":14,"./typeclass/monoid.js":15}],4:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");


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

},{"./core.js":2}],5:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");


// Array
function arrayMap(f, xs) {
   var ys = new Array(xs.length);

   for (var i = 0; i < xs.length; ++i) {
       ys[i] = f(xs[i]);
   }

   return ys;
}

tlc.addInstance(Array, {
    // Functor
    map: arrayMap,

    // Monoid
    mempty: [],
    mappend: tlc.append
});

tlc.reduce = tlc.curry(tlc.reduce);
tlc.reduceRight = tlc.curry(tlc.reduceRight);
tlc.filter = tlc.curry(tlc.filter);
tlc.findIndex = tlc.curry(tlc.findIndex);
tlc.find = tlc.curry(tlc.find);
tlc.groupBy = tlc.curry(tlc.groupBy);
tlc.zipWith = tlc.curry(tlc.zipWith, 3);
tlc.zip = tlc.curry(tlc.zip, 2);
tlc.sortBy = tlc.curry(tlc.sortBy, 2);
tlc.some = tlc.curry(tlc.some);
tlc.every = tlc.curry(tlc.every);
tlc.contains = tlc.curry(tlc.contains);
tlc.intersperse = tlc.curry(tlc.intersperse);


// Function
tlc.apply = tlc.curry(tlc.apply);
tlc.memoizeBy = tlc.curry(tlc.memoizeBy);


// Maybe
function maybeUnit(value) {
    return new tlc.Maybe(true, value);
}

function maybeBind(maybe, f) {
    return maybe.hasValue ? f(maybe.value) : maybe;
}

function maybeAp(maybeF, maybeX) {
    return maybeF.hasValue ? tlc.map(maybeF.value, maybeX) : maybeF;
}

tlc.addInstance(tlc.Maybe, {
    // Applicative
    pure: maybeUnit,
    ap: maybeAp,

    // Monad and Functor
    unit: maybeUnit,
    bind: maybeBind
});

tlc.mapMaybe = tlc.curry(tlc.mapMaybe);


// Object
tlc.prop = tlc.curry(tlc.prop);
tlc.propCall = tlc.curry(tlc.propCall);


// Operator
for (var operator in tlc.op) {
    tlc.op[operator] = tlc.curry(tlc.op[operator]);
}

var flippedOperators = ["-", "/", "<", "<=", ">", ">="];

for (var i = 0; i < flippedOperators.length; ++i) {
    var operator = flippedOperators[i];
    tlc.fop[operator] = tlc.flip(tlc.op[operator]);
}


// Set
tlc.uniqueBy = tlc.curry(tlc.uniqueBy);
tlc.unionBy = tlc.curry(tlc.unionBy, 3);
tlc.union = tlc.curry(tlc.union, 2);
tlc.intersectBy = tlc.curry(tlc.intersectBy, 3);
tlc.intersect = tlc.curry(tlc.intersect, 2);


// Applicative
tlc.pure = tlc.curry(tlc.pure);
tlc.ap = tlc.curry(tlc.ap);


// Contravariant
tlc.contramap = tlc.curry(tlc.contramap);


// Functor
tlc.map = tlc.curry(tlc.map);


// Monad
tlc.unit = tlc.curry(tlc.unit);
tlc.bind = tlc.curry(tlc.bind, 2);


// Monoid
tlc.mappend = tlc.curry(tlc.mappend);

},{"./core.js":2}],6:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");


tlc.Maybe = function(hasValue, value) {
    this.hasValue = hasValue;
    this.value = value;
};

tlc.catMaybes = function(xs) {
    var justs = tlc.filter(tlc.prop("hasValue"), xs);
    return tlc.map(tlc.prop("value"), justs);
};

tlc.mapMaybe = function(f, xs) {
    return tlc.catMaybes(tlc.map(f, xs));
};


module.exports = tlc;

},{"./core.js":2}],7:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");


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

tlc.prop = function(propertyName, obj) {
    return obj[propertyName];
};

tlc.propCall = function(propertyName, args, obj) {
    return obj[propertyName].apply(obj, args);
};


module.exports = tlc;

},{"./core.js":2}],8:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");


tlc.not = function(value) {
    return !value;
};

tlc.op = {
    "+": function(x, y) {
        return x + y;
    },
    "-": function(x, y) {
        return x - y;
    },
    "*": function(x, y) {
        return x * y;
    },
    "/": function(x, y) {
        return x / y;
    },
    "===": function(x, y) {
        return x === y;
    },
    "<": function(x, y) {
        return x < y;
    },
    "<=": function(x, y) {
        return x <= y;
    },
    ">": function(x, y) {
        return x > y;
    },
    ">=": function(x, y) {
        return x >= y;
    },
    "&&": function(x, y) {
        return x && y;
    },
    "||": function(x, y) {
        return x || y;
    }
};

tlc.fop = {};


module.exports = tlc;

},{"./core.js":2}],9:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");


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

},{"./core.js":2}],10:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");


tlc.instances = [];

tlc.addInstance = function(type, implementation) {
    var maybeInstance = tlc.getInstance(type);

    if (maybeInstance.hasValue) {
        var instance = maybeInstance.value;
        instance.implementation = tlc.extend(instance.implementation, implementation);
    } else {
        tlc.instances.push({type: type, implementation: implementation});
    }
};

tlc.getInstance = function(type) {
    for (var i = 0; i < tlc.instances.length; ++i) {
        var instance = tlc.instances[i];

        if (instance.type === type) {
            return new tlc.Maybe(true, instance);
        }
    }

    return new tlc.Maybe(false);
};

tlc.getInstanceFunc = function(type, functionName) {
    var maybeInstance = tlc.getInstance(type);

    if (maybeInstance.hasValue) {
        var f = maybeInstance.value.implementation[functionName];

        if (f === undefined) {
            return new tlc.Maybe(false);
        } else {
            return new tlc.Maybe(true, f);
        }
    } else {
        return maybeInstance;
    }
};


module.exports = tlc;

},{"./core.js":2}],11:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("../core.js");


tlc.pure = function(type, value) {
    var pure = tlc.getInstanceFunc(type, "pure").value;
    return pure(value);
};

tlc.ap = function(maybeF, maybeX) {
    var ap = tlc.getInstanceFunc(maybeF.constructor, "ap").value;
    return ap(maybeF, maybeX);
};


module.exports = tlc;

},{"../core.js":2}],12:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("../core.js");


tlc.contramap = function(f, contravariant) {
    var contramap = tlc.getInstanceFunc(contravariant.constructor, "contramap").value;
    return contramap(f, contravariant);
};


module.exports = tlc;

},{"../core.js":2}],13:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("../core.js");


tlc.map = function(f, functor) {
    var type = functor.constructor;
    var maybeMap = tlc.getInstanceFunc(type, "map");

    if (maybeMap.hasValue) {
        return maybeMap.value(f, functor);
    } else {
        // If a map implementation is not registered, fall back to unit and bind
        var unit = tlc.unit(type);
        return tlc.bind(functor, tlc.compose(unit, f));
    }
};


module.exports = tlc;

},{"../core.js":2}],14:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("../core.js");


tlc.unit = function(type, value) {
    var unit = tlc.getInstanceFunc(type, "unit").value;
    return unit(value);
};

tlc.bind = function(monad) {
    var functions = tlc.toArray(arguments).slice(1);
    var bind = tlc.getInstanceFunc(monad.constructor, "bind").value;
    var result = monad;

    for (var i = 0; i < functions.length; ++i) {
        result = bind(result, functions[i]);
    }

    return result;
};


module.exports = tlc;

},{"../core.js":2}],15:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("../core.js");


tlc.mempty = function(type) {
    var mempty = tlc.getInstanceFunc(type, "mempty").value;
    return mempty;
};

tlc.mappend = function(x, y) {
    var mappend = tlc.getInstanceFunc(x.constructor, "mappend").value;
    return mappend(x, y);
};

tlc.mconcat = function(xs) {
    var type = xs[0].constructor;
    return tlc.reduceRight(tlc.mappend, tlc.mempty(type), xs);
};


module.exports = tlc;

},{"../core.js":2}]},{},[3])
(3)
});