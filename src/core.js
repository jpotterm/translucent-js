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
