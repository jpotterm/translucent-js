"use strict";

var tlc = require("../src/maybe.js");


describe("maybe.catMaybes", function() {
    it("should filter out Nothings and unwrap values", function() {
        var xs = [
            new tlc.Maybe(true, 1),
            new tlc.Maybe(false),
            new tlc.Maybe(true, 2),
            new tlc.Maybe(true, 3)
        ];

        var result = tlc.catMaybes(xs);

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
    });
});

describe("maybe.mapMaybe", function() {
    it("should map and then catMaybes", function() {
        function maybeEven(n) {
            if (n % 2 === 0) {
                return new tlc.Maybe(true, n);
            } else {
                return new tlc.Maybe(false);
            }
        }

        var xs = [1, 2, 3, 4];
        var result = tlc.mapMaybe(maybeEven, xs);

        expect(result[0]).toBe(2);
        expect(result[1]).toBe(4);
    });
});
