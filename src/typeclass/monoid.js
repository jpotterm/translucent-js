"use strict";

var tlc = require("../core.js");


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
