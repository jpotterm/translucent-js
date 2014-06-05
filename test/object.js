"use strict";

var tlc = require("../src/index.js");


describe("object.extend", function() {
    it("should combine and overwrite the left object", function() {
        var a = {one: 1, two: 2};
        var b = {two: 4, three: 3};

        var c = tlc.extend(a, b);

        expect(c.one).toBe(1);
        expect(c.two).toBe(4);
        expect(c.three).toBe(3);
    });
});

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
