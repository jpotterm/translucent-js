!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.tlc=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");
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

},{"./core.js":2,"./typeclass/functor.js":9}],2:[function(_dereq_,module,exports){
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
    return function(x, y) {
        return f(y, x);
    };
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
    })
};

tlc.fop = {};
(function() {
    var flippedOperators = ["-", "/", "<", "<=", ">", ">="];

    for (var i = 0; i < flippedOperators.length; ++i) {
        var operator = flippedOperators[i];
        tlc.fop[operator] = tlc.curry(tlc.flip(tlc.op[operator]));
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

tlc.callInstance = function(type, functionName, args) {
    var instance = tlc.getInstance(type);
    return instance.implementation[functionName].apply(null, args);
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


tlc.Maybe = function(isNull, value) {
    this.isNull = isNull;
    this.value = value;
};

var maybeMap = function(f, maybe) {
    return maybe.isNull ? maybe : new tlc.Maybe(false, f(maybe.value));
};

var maybeUnit = function(value) {
    return new tlc.Maybe(false, value);
};

var maybeBind = function(maybe, f) {
    return maybe.isNull ? maybe : f(maybe.value);
};

var maybeAp = function(maybeF, maybeX) {
    return maybeF.isNull ? maybeF : tlc.map(maybeF.value, maybeX);
};

tlc.addInstance(tlc.Maybe, {
    // Functor
    map: maybeMap,

    // Applicative
    pure: maybeUnit,
    ap: maybeAp,

    // Monad
    unit: maybeUnit,
    bind: maybeBind
});


module.exports = tlc;

},{"./core.js":2,"./typeclass/applicative.js":7,"./typeclass/functor.js":9,"./typeclass/monad.js":10}],5:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");


tlc.prop = tlc.curry(function(propertyName, obj) {
    return obj[propertyName];
});

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


tlc.pure = function(type, value) {
    return tlc.callInstance(type, "pure", [value]);
};

tlc.ap = function(maybeF, maybeX) {
    return tlc.callInstance(maybeF.constructor, "ap", [maybeF, maybeX]);
};


module.exports = tlc;

},{"../core.js":2}],8:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("../core.js");


tlc.contramap = function(f, contravariant) {
    return tlc.callInstance(contravariant.constructor, "contramap", arguments);
};


module.exports = tlc;

},{"../core.js":2}],9:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("../core.js");


tlc.map = function(f, functor) {
    return tlc.callInstance(functor.constructor, "map", arguments);
};


module.exports = tlc;

},{"../core.js":2}],10:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("../core.js");


tlc.unit = function(type, value) {
    return tlc.callInstance(type, "unit", [value]);
};

tlc.bind = function(monad) {
    var functions = tlc.toArray(arguments).slice(1);
    var result = monad;

    for (var i = 0; i < functions.length; ++i) {
        result = tlc.callInstance(monad.constructor, "bind", [result, functions[i]]);
    }

    return result;
};

tlc.liftM = function(f) {
    var monads = tlc.toArray(arguments).slice(1);
    var type = monads[0].constructor;

    function returnMonad(f) {
        return function() {
            var result = tlc.apply(f, arguments);
            return tlc.callInstance(type, "unit", [result]);
        };
    }

    var result = tlc.curry(returnMonad(f), monads.length);

    for (var i = 0; i < monads.length; ++i) {
        var monad = monads[i];
        result = tlc.callInstance(type, "bind", [monad, result]);
    }

    return result;
};


module.exports = tlc;

},{"../core.js":2}],11:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("../core.js");


tlc.mempty = function(type) {
    return tlc.callInstance(type, "mempty", []);
};

tlc.mappend = function(x, y) {
    return tlc.callInstance(x.constructor, "mappend", [x, y]);
};

tlc.mconcat = function(xs) {
    var type = xs[0].constructor;
    return tlc.reduceRight(tlc.mappend, tlc.mempty(type), xs);
};


module.exports = tlc;

},{"../core.js":2}]},{},[3])
(3)
});