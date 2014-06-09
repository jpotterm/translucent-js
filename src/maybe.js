"use strict";

var tlc = require("./core.js");


tlc.Maybe = function(hasValue, value) {
    this.hasValue = hasValue;
    this.value = value;
};

tlc.isJust = function(maybe) {
    return maybe.hasValue;
};

tlc.isNothing = function(maybe) {
    return !maybe.hasValue;
};

tlc.maybe = function(defaultValue, f, maybe) {
    return tlc.fromMaybe(defaultValue, tlc.map(f, maybe));
};

tlc.fromMaybe = function(defaultValue, maybe) {
    return maybe.hasValue ? maybe.value : defaultValue;
};

tlc.catMaybes = function(xs) {
    var justs = tlc.filter(tlc.isJust, xs);
    return tlc.map(tlc.prop("value"), justs);
};

tlc.mapMaybe = function(f, xs) {
    return tlc.catMaybes(tlc.map(f, xs));
};


module.exports = tlc;
