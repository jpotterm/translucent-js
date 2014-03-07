!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.tlc=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var tlc = {};

tlc.instances = [];

tlc.toArray = function (xs) {
	return Array.prototype.slice.call(xs);
};

tlc.extendDestructive = function(a, b) {
	for(var i in b) {
		a[i] = b[i];
	}
};

tlc.extend = function(a, b) {
	var result = {};

	tlc.extendDestructive(result, a);
	tlc.extendDestructive(result, b);

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

},{}],2:[function(_dereq_,module,exports){
var tlc = _dereq_("./core.js");


tlc.succ = function(x) {
    return tlc.callFunction(x.constructor, "succ", [x]);
};

tlc.pred = function(x) {
    return tlc.callFunction(x.constructor, "pred", [x]);
};

tlc.addInstance(Number, {
    succ: function(x) {return x + 1;},
    pred: function(x) {return x - 1;},
});

tlc.addInstance(String, {
    succ: function(x) {return String.fromCharCode(x.charCodeAt(0) + 1);},
    pred: function(x) {return String.fromCharCode(x.charCodeAt(0) - 1);},
});


module.exports = tlc;

},{"./core.js":1}],3:[function(_dereq_,module,exports){
module.exports = _dereq_("./core.js");
_dereq_("./functor.js");
_dereq_("./enum.js");

},{"./core.js":1,"./enum.js":2,"./functor.js":4}],4:[function(_dereq_,module,exports){
var tlc = _dereq_("./core.js");


tlc.fmap = function(f, xs) {
	return tlc.callFunction(xs.constructor, "fmap", [f, xs]);
};

tlc.addInstance(Array, {
    fmap: function(f, xs) {
       var ys = new Array(xs.length);

       for (var i = 0; i < xs.length; ++i) {
           ys[i] = f(xs[i]);
       }

       return ys;
   }
});


module.exports = tlc;

},{"./core.js":1}]},{},[3])
(3)
});