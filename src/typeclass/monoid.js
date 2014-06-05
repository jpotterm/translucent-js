"use strict";

var tlc = require("../core.js");


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
