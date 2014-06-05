"use strict";

var tlc = require("../../src/index.js");


var originalInstances;

function setup() {
    originalInstances = tlc.instances;
    tlc.instances = [];

    function multiply(x, y) {return x * y;}

    tlc.addInstance(Number, {
        mempty: 1,
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

describe("monoid array instance", function() {
    it("should have the correct mempty value", function() {
        var result = tlc.mempty(Array);

        expect(result.length).toBe(0);
    });

    it("should append arrays with mappend", function() {
        var result = tlc.mappend([1, 2], [3, 4]);

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
        expect(result[3]).toBe(4);
    });

    it("should concatenate arrays with mconcat", function() {
        var result = tlc.mconcat([[1, 2], [3, 4]]);

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
        expect(result[3]).toBe(4);
    });
});
