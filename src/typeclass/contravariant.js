"use strict";

var tlc = require("../core.js");


tlc.contramap = tlc.curry(function(f, contravariant) {
    var contramap = tlc.getInstanceFunc(contravariant.constructor, "contramap").value;
    return contramap(f, contravariant);
});


module.exports = tlc;
