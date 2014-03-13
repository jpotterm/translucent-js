"use strict";

var tlc = require("./core.js");


tlc.mempty = function(type) {
    return tlc.callFunction(type, "mempty", []);
};

tlc.mappend = function(x, y) {
    return tlc.callFunction(x.constructor, "mappend", [x, y]);
};

tlc.mconcat = function(xs) {
    var type = xs[0].constructor;
    return tlc.reduceRight(tlc.mappend, tlc.mempty(type), xs);
};

// tlc.mconcat = function(x, y) {
//     var type = x.constructor;
//     var instance = tlc.getInstance(type);

//     if (instance == undefined) {
//         var mempty = instance.implementation["mempty"];
//         var mappend = instance.implementation["mappend"];

//         return tlc.reduceRight(mempty, mappend);
//     } else {
//         return instance.implementation["mconcat"].apply(null, params);
//     }

//     return tlc.callFunction(x.constructor, "mappend", arguments);
// };


module.exports = tlc;
