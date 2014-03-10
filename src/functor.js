"use strict";

var tlc = require("./core.js");


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
