"use strict";

var tlc = require("../core.js");


tlc.ap = function(applicativeF, applicativeX) {
    var type = applicativeF.constructor;
    var maybeAp = tlc.getInstanceFunc(type, "ap");

    if (maybeAp.hasValue) {
        return maybeAp.value(applicativeF, applicativeX);
    } else {
        // Fall back to Monad
        var convertF = function(f) {
            return tlc.compose(tlc.unit(type), f);
        };

        var convertedF = tlc.bind(applicativeF, convertF);

        return tlc.bind(applicativeX, convertedF);
    }
};


module.exports = tlc;
