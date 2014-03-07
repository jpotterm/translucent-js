var tlc = require("./core.js");


tlc.succ = function(x) {
    return tlc.callFunction(x.constructor, "succ", [x]);
};

tlc.pred = function(x) {
    return tlc.callFunction(x.constructor, "pred", [x]);
};

tlc.addInstance(Number, {
    succ: function(x) {return x + 1;},
    pred: function(x) {return x - 1;},
});

tlc.addInstance(String, {
    succ: function(x) {return String.fromCharCode(x.charCodeAt(0) + 1);},
    pred: function(x) {return String.fromCharCode(x.charCodeAt(0) - 1);},
});


module.exports = tlc;
