"use strict";

var tlc = require("./core.js");


tlc.dimap = function(f, g, profunctor) {
    return tlc.callFunction(profunctor.constructor, "dimap", arguments);
};

tlc.lmap = function(f, profunctor) {
    return tlc.dimap(f, tlc.id, profunctor);
};

tlc.rmap = function(g, profunctor) {
    return tlc.dimap(tlc.id, g, profunctor);
};


module.exports = tlc;
