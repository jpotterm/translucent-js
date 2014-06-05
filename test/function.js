"use strict";

var tlc = require("../src/index.js");


describe("function.curry", function() {
    it("should produce a curried function", function() {
        function sum(x, y) {
            return x + y;
        }

        var curriedSum = tlc.curry(sum);

        expect(curriedSum(2)(4)).toBe(6);
    });
});

describe("function.apply", function() {
    it("should use array as arguments", function() {
        function sum(x, y, z) {
            return x + y + z;
        }

        var result = tlc.apply(sum, [1, 2, 3]);
        expect(result).toBe(6);
    });
});

describe("function.partial", function() {
    it("should produce a partially applied function", function() {
        function sum(x, y) {
            return x + y;
        }

        var plusTwo = tlc.partial(sum, 2);

        expect(plusTwo(4)).toBe(6);
    });
});

describe("function.pipeline", function() {
    it("should compose functions from right to left", function() {
        function plusTwo(n) {return n + 2;}
        function timesFour(n) {return n * 4;}

        var piped = tlc.pipeline(plusTwo, timesFour);
        expect(piped(1)).toBe(12);
    });
});

describe("function.compose", function() {
    it("should compose functions from left to right", function() {
        function plusTwo(n) {return n + 2;}
        function timesFour(n) {return n * 4;}

        var composed = tlc.compose(timesFour, plusTwo);
        expect(composed(1)).toBe(12);
    });
});

describe("function.flip", function() {
    it("should swap the order of the first two arguments", function() {
        function echo(x, y) {
            return [x, y];
        }

        var ceho = tlc.flip(echo);
        var result = ceho(1, 2);

        expect(result[0]).toBe(2);
        expect(result[1]).toBe(1);
    });
});

describe("function.memoizeBy", function() {
    it("should cache function arguments", function() {
        function echo(x, y, z) {
            return [x, y, z];
        }

        function constantHash() {
            return "test";
        }

        var cached = tlc.memoizeBy(constantHash, echo);

        var initialResult = cached(1, 2, 3);
        var cachedResult = cached(4, 5, 6);

        expect(initialResult[0]).toBe(1);
        expect(initialResult[1]).toBe(2);
        expect(initialResult[2]).toBe(3);

        expect(cachedResult[0]).toBe(1);
        expect(cachedResult[1]).toBe(2);
        expect(cachedResult[2]).toBe(3);
    });
});

describe("function.memoize", function() {
    it("should cache function arguments", function() {
        function echo(x, y, z) {
            return [x, y, z];
        }

        var cached = tlc.memoize(echo);

        var initialResult = cached(1, 2, 3);
        var cachedResult = cached(1, 2, 3);

        expect(initialResult[0]).toBe(1);
        expect(initialResult[1]).toBe(2);
        expect(initialResult[2]).toBe(3);

        expect(cachedResult[0]).toBe(1);
        expect(cachedResult[1]).toBe(2);
        expect(cachedResult[2]).toBe(3);
    });
});
