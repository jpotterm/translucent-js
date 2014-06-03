"use strict";

var tlc = require("../../src/typeclass/applicative.js");
require("../../src/maybe.js");


describe("applicative.pure", function() {
    it("should wrap a value in an applicative", function() {
        var maybe = tlc.pure(tlc.Maybe, 1);

        expect(maybe.hasValue).toBe(true);
        expect(maybe.value).toBe(1);
    });
});

describe("applicative.ap", function() {
    it("should apply a function within a functor to the value inside a functor", function() {
        function plusOne(n) {return n + 1;}

        var maybeF = new tlc.Maybe(true, plusOne);
        var maybeX = new tlc.Maybe(true, 1);
        var nothing = new tlc.Maybe(false);

        var succeess = tlc.ap(maybeF, maybeX);
        var failure = tlc.ap(maybeF, nothing);

        expect(succeess.hasValue).toBe(true);
        expect(succeess.value).toBe(2);

        expect(failure.hasValue).toBe(false);
    });
});
