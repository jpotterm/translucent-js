!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.tlc=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");


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

},{"./core.js":2}],2:[function(_dereq_,module,exports){
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
		return tlc.apply(f, tlc.concat(partialArgs, tlc.toArray(arguments)) );
	};
};

tlc.reverse = function(xs) {
	return tlc.cloneArray(xs).reverse();
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
	return function () {
		var args = tlc.toArray(arguments);
		var rest = args.slice(2);

		return tlc.apply(f, tlc.concat([args[1]], [args[0]], rest));
	};
};

tlc.memoize = tlc.curry(function(hasher, f) {
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

tlc.memoizeJson = tlc.memoize(JSON.stringify);

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
	"[]": tlc.curry(function(xs, i) {
		return xs[i];
	})
};

tlc.extend = function(a, b) {
	function extendDestructive(a, b) {
		for(var i in b) {
			a[i] = b[i];
		}
	}

	var result = {};

	extendDestructive(result, a);
	extendDestructive(result, b);

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

tlc.callFunction = function(type, fname, params) {
	var instance = tlc.getInstance(type);
	return instance.implementation[fname].apply(null, params);
};


module.exports = tlc;

},{}],3:[function(_dereq_,module,exports){
"use strict";

module.exports = _dereq_("./core.js");
_dereq_("./functor.js");
_dereq_("./array.js");

},{"./array.js":1,"./core.js":2,"./functor.js":4}],4:[function(_dereq_,module,exports){
"use strict";

var tlc = _dereq_("./core.js");


tlc.map = function(f, functor) {
	return tlc.callFunction(functor.constructor, "map", [f, functor]);
};

tlc.addInstance(Array, {
    map: function(f, xs) {
       var ys = new Array(xs.length);

       for (var i = 0; i < xs.length; ++i) {
           ys[i] = f(xs[i]);
       }

       return ys;
   }
});


module.exports = tlc;

},{"./core.js":2}]},{},[3])
(3)
});