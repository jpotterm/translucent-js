"use strict";

var tlc = require("../../src/typeclass/functor.js");
require("../../src/maybe.js");


describe("functor.map", function() {
    it("should map a function over the value of a functor", function() {
        function plusOne(n) {return n + 1;}

        var just = new tlc.Maybe(true, 1);
        var nothing = new tlc.Maybe(false);

        var succeess = tlc.map(plusOne, just);
        var failure = tlc.map(plusOne, nothing);

        expect(succeess.hasValue).toBe(true);
        expect(succeess.value).toBe(2);

        expect(failure.hasValue).toBe(false);
    });
});
