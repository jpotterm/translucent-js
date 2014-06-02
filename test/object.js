"use strict";

var tlc = require("../src/object.js");


describe("object.prop", function() {
    it("should access a property on an object", function() {
        var o = {"one": 1};

        expect(tlc.prop("one", o)).toBe(1);
    });
});

describe("object.propCall", function() {
    it("should call a property on an object", function() {
        var o = {
            "one": function(x, y) {return x + y;}
        };

        expect(tlc.propCall("one", [1, 2], o)).toBe(3);
    });
});
