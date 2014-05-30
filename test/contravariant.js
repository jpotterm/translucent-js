"use strict";

var tlc = require("../src/core.js");
require("../src/contravariant.js");


var originalInstances;

function Op(f) {
    this.f = f;
}

function setup() {
    originalInstances = tlc.instances;
    tlc.instances = [];

    tlc.addInstance(Op, {
        contramap: function(g, op) {
            return new Op(tlc.compose(g, op.f));
        }
    });
}

function teardown() {
    tlc.instances = originalInstances;
}

describe("contravariant.contramap", function() {
    beforeEach(setup);
    afterEach(teardown);

    it("should modify the function's input", function() {
        function plusTwo(n) {return n + 2;}
        function multTwo(n) {return n * 2;}

        var result = tlc.contramap(plusTwo, new Op(multTwo));

        expect(result.f(3)).toBe(8);
    });
});
