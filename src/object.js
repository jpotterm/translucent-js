"use strict";

var tlc = require("./core.js");


tlc.propCall = tlc.curry(function(propertyName, args, obj) {
    return obj[propertyName].apply(obj, args);
});


module.exports = tlc;
