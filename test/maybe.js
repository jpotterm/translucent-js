"use strict";

var tlc = require("../src/index.js");


describe("maybe.isJust", function() {
    it("should tell if a Maybe is a Just", function() {
        var just = new tlc.Maybe(true, 1);
        var nothing = new tlc.Maybe(false);

        expect(tlc.isJust(just)).toBe(true);
        expect(tlc.isJust(nothing)).toBe(false);
    });
});

describe("maybe.isNothing", function() {
    it("should tell if a Maybe is a Nothing", function() {
        var just = new tlc.Maybe(true, 1);
        var nothing = new tlc.Maybe(false);

        expect(tlc.isNothing(just)).toBe(false);
        expect(tlc.isNothing(nothing)).toBe(true);
    });
});

describe("maybe.maybe", function() {
    it("should return the result of f or the default value", function() {
        function plusOne(x) {return x + 1;}

        var just = new tlc.Maybe(true, 2);
        var nothing = new tlc.Maybe(false);

        expect(tlc.maybe(1, plusOne, just)).toBe(3);
        expect(tlc.maybe(1, plusOne, nothing)).toBe(1);
    });
});

describe("maybe.fromMaybe", function() {
    it("should give a default value if Maybe is Nothing", function() {
        var just = new tlc.Maybe(true, 2);
        var nothing = new tlc.Maybe(false);

        expect(tlc.fromMaybe(1, just)).toBe(2);
        expect(tlc.fromMaybe(1, nothing)).toBe(1);
    });
});

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
