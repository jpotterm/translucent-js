"use strict";

var tlc = require("../core.js");


tlc.contramap = tlc.curry(function(f, contravariant) {
    return tlc.callInstance(contravariant.constructor, "contramap", arguments);
});


module.exports = tlc;
