"use strict";

var tlc = require("../../src/typeclass/monad.js");
require("../../src/maybe.js");


describe("monad.unit", function() {
    it("should construct a monad from a value", function() {
        var maybe = tlc.unit(tlc.Maybe, 1);

        expect(maybe.hasValue).toBe(true);
        expect(maybe.value).toBe(1);
    });
});

describe("monad.bind", function() {
    it("should sequence monad actions", function() {
        function divideEightBy(x) {
            if (x === 0) {
                return new tlc.Maybe(false);
            }

            return new tlc.Maybe(true, 8 / x);
        }

        var a = new tlc.Maybe(true, 2);
        var b = new tlc.Maybe(true, 0);

        var success = tlc.bind(a, divideEightBy, divideEightBy);
        var failure = tlc.bind(b, divideEightBy, divideEightBy);

        expect(success.hasValue).toBe(true);
        expect(success.value).toBe(2);

        expect(failure.hasValue).toBe(false);
    });
});
