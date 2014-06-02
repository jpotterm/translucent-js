"use strict";

var tlc = require("../../src/typeclass/monad.js");
require("../../src/maybe.js");


describe("monad.unit", function() {
    it("should construct a monad from a value", function() {
        var maybe = tlc.unit(tlc.Maybe, 1);

        expect(maybe.isNull).toBe(false);
        expect(maybe.value).toBe(1);
    });
});

describe("monad.bind", function() {
    it("should sequence monad actions", function() {
        function divideEightBy(x) {
            if (x === 0) {
                return new tlc.Maybe(true);
            }

            return new tlc.Maybe(false, 8 / x);
        }

        var a = new tlc.Maybe(false, 2);
        var b = new tlc.Maybe(false, 0);

        var success = tlc.bind(a, divideEightBy, divideEightBy);
        var failure = tlc.bind(b, divideEightBy, divideEightBy);

        expect(success.isNull).toBe(false);
        expect(success.value).toBe(2);

        expect(failure.isNull).toBe(true);
    });
});

describe("monad.liftM", function() {
    it("should lift a function into a monad", function() {
        function add(x, y, z) {
            return x + y + z;
        }

        var a = new tlc.Maybe(false, 1);
        var b = new tlc.Maybe(false, 2);
        var c = new tlc.Maybe(false, 3);
        var nothing = new tlc.Maybe(true, undefined);

        var success = tlc.liftM(add, a, b, c);
        var failure = tlc.liftM(add, a, b, nothing);

        expect(success.isNull).toBe(false);
        expect(success.value).toBe(6);

        expect(failure.isNull).toBe(true);
    });
});
