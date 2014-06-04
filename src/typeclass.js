"use strict";

var tlc = require("./core.js");


tlc.instances = [];

tlc.addInstance = function(type, implementation) {
    var maybeInstance = tlc.getInstance(type);

    if (maybeInstance.hasValue) {
        var instance = maybeInstance.value;
        instance.implementation = tlc.extend(instance.implementation, implementation);
    } else {
        tlc.instances.push({type: type, implementation: implementation});
    }
};

tlc.getInstance = function(type) {
    for (var i = 0; i < tlc.instances.length; ++i) {
        var instance = tlc.instances[i];

        if (instance.type === type) {
            return new tlc.Maybe(true, instance);
        }
    }

    return new tlc.Maybe(false);
};

tlc.getInstanceFunc = function(type, functionName) {
    var maybeInstance = tlc.getInstance(type);

    if (maybeInstance.hasValue) {
        var f = maybeInstance.value.implementation[functionName];

        if (f === undefined) {
            return new tlc.Maybe(false);
        } else {
            return new tlc.Maybe(true, f);
        }
    } else {
        return maybeInstance;
    }
};


module.exports = tlc;
