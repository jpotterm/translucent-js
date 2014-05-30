"use strict";

var tlc = require("./core.js");


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
