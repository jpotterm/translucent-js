var tlc = require("./core.js");


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
