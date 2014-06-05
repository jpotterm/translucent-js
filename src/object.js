"use strict";

var tlc = require("./core.js");


tlc.extend = function(x, y) {
    function extendDestructive(x, y) {
        for(var i in y) {
            x[i] = y[i];
        }
    }

    var result = {};

    extendDestructive(result, x);
    extendDestructive(result, y);

    return result;
};

tlc.cloneObject = function(x) {
    return tlc.extend({}, x);
};

tlc.prop = function(propertyName, obj) {
    return obj[propertyName];
};

tlc.propCall = function(propertyName, args, obj) {
    return obj[propertyName].apply(obj, args);
};


module.exports = tlc;
