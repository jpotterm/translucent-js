"use strict";

var tlc = require("./core.js");


tlc.Maybe = function(hasValue, value) {
    this.hasValue = hasValue;
    this.value = value;
};

tlc.catMaybes = function(xs) {
    var justs = tlc.filter(tlc.prop("hasValue"), xs);
    return tlc.map(tlc.prop("value"), justs);
};

tlc.mapMaybe = function(f, xs) {
    return tlc.catMaybes(tlc.map(f, xs));
};


module.exports = tlc;
