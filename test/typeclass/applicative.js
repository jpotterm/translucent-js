"use strict";

var tlc = require("../../src/typeclass/applicative.js");
require("../../src/maybe.js");


describe("applicative.pure", function() {
    it("should wrap a value in an applicative", function() {
        var maybe = tlc.pure(tlc.Maybe, 1);

        expect(maybe.isNull).toBe(false);
        expect(maybe.value).toBe(1);
    });
});

describe("applicative.ap", function() {
    it("should apply a function within a functor to the value inside a functor", function() {
        function plusOne(n) {return n + 1;}

        var maybeF = new tlc.Maybe(false, plusOne);
        var maybeX = new tlc.Maybe(false, 1);
        var nothing = new tlc.Maybe(true);

        var succeess = tlc.ap(maybeF, maybeX);
        var failure = tlc.ap(maybeF, nothing);

        expect(succeess.isNull).toBe(false);
        expect(succeess.value).toBe(2);

        expect(failure.isNull).toBe(true);
    });
});
