"use strict";

var tlc = require("./core.js");


tlc.map = function(f, functor) {
	return tlc.callFunction(functor.constructor, "map", arguments);
};


module.exports = tlc;
