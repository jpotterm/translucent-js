"use strict";

var tlc = require("./core.js");


tlc.not = function(value) {
    return !value;
};

tlc.op = {
    "+": function(x, y) {
        return x + y;
    },
    "-": function(x, y) {
        return x - y;
    },
    "*": function(x, y) {
        return x * y;
    },
    "/": function(x, y) {
        return x / y;
    },
    "===": function(x, y) {
        return x === y;
    },
    "<": function(x, y) {
        return x < y;
    },
    "<=": function(x, y) {
        return x <= y;
    },
    ">": function(x, y) {
        return x > y;
    },
    ">=": function(x, y) {
        return x >= y;
    },
    "&&": function(x, y) {
        return x && y;
    },
    "||": function(x, y) {
        return x || y;
    }
};

tlc.fop = {};


module.exports = tlc;
