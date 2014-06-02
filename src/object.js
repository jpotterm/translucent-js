"use strict";

var tlc = require("./core.js");


tlc.prop = tlc.curry(function(propertyName, obj) {
    return obj[propertyName];
});

tlc.propCall = tlc.curry(function(propertyName, args, obj) {
    return obj[propertyName].apply(obj, args);
});


module.exports = tlc;
