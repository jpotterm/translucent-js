"use strict";

var tlc = require("../src/monoid.js");


var originalInstances;

function setup() {
    originalInstances = tlc.instances;
    tlc.instances = [];

    function multiply(x, y) {return x * y;}

    tlc.addInstance(Number, {
        mempty: function() {return 1;},
        mappend: multiply
    });
}

function teardown() {
    tlc.instances = originalInstances;
}


describe("monoid.mempty", function() {
    beforeEach(setup);
    afterEach(teardown);

    it("should return the identity value", function() {
        expect(tlc.mempty(Number)).toBe(1);
    });
});

describe("monoid.mappend", function() {
    beforeEach(setup);
    afterEach(teardown);

    it("should append two instances of the typeclass", function() {
        expect(tlc.mappend(2, 4)).toBe(8);
    });
});

describe("monoid.mconcat", function() {
    beforeEach(setup);
    afterEach(teardown);

    it("should reduce from the right", function() {
        expect(tlc.mconcat([1, 2, 3, 4, 5])).toBe(120);
    });
});
