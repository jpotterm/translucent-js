"use strict";

var tlc = require("../../src/typeclass/functor.js");
require("../../src/maybe.js");


describe("functor.map", function() {
    it("should map a function over the value of a functor", function() {
        function plusOne(n) {return n + 1;}

        var just = new tlc.Maybe(false, 1);
        var nothing = new tlc.Maybe(true);

        var succeess = tlc.map(plusOne, just);
        var failure = tlc.map(plusOne, nothing);

        expect(succeess.isNull).toBe(false);
        expect(succeess.value).toBe(2);

        expect(failure.isNull).toBe(true);
    });
});
