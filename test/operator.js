"use strict";

var tlc = require("../src/index.js");


describe("operator.not", function() {
    it("should negate a boolean", function() {
        expect(tlc.not(false)).toBe(true);
    });
});

describe("operator.op['+']", function() {
    it("should add", function() {
        expect(tlc.op["+"](1, 2)).toBe(3);
    });
});

describe("operator.op['-'] and core.fop['-']", function() {
    it("should subtract", function() {
        expect(tlc.op["-"](1, 2)).toBe(-1);

        expect(tlc.fop["-"](2, 1)).toBe(-1);
    });
});

describe("operator.op['*']", function() {
    it("should multiply", function() {
        expect(tlc.op["*"](4, 2)).toBe(8);
    });
});

describe("operator.op['/'] and core.fop['/']", function() {
    it("should divide", function() {
        expect(tlc.op["/"](4, 2)).toBe(2);

        expect(tlc.fop["/"](2, 4)).toBe(2);
    });
});

describe("operator.op['===']", function() {
    it("should determine equality", function() {
        expect(tlc.op["==="](1, 1)).toBe(true);
        expect(tlc.op["==="](1, 2)).toBe(false);
    });
});

describe("operator.op['<'] and core.fop['<']", function() {
    it("should determine less than", function() {
        expect(tlc.op["<"](1, 2)).toBe(true);
        expect(tlc.op["<"](1, 1)).toBe(false);

        expect(tlc.fop["<"](2, 1)).toBe(true);
        expect(tlc.fop["<"](1, 1)).toBe(false);
    });
});

describe("operator.op['<='] and core.fop['<=']", function() {
    it("should determine less than or equal to", function() {
        expect(tlc.op["<="](1, 2)).toBe(true);
        expect(tlc.op["<="](1, 1)).toBe(true);
        expect(tlc.op["<="](2, 1)).toBe(false);

        expect(tlc.fop["<="](2, 1)).toBe(true);
        expect(tlc.fop["<="](1, 1)).toBe(true);
        expect(tlc.fop["<="](1, 2)).toBe(false);
    });
});

describe("operator.op['>'] and core.fop['>']", function() {
    it("should determine greater than", function() {
        expect(tlc.op[">"](2, 1)).toBe(true);
        expect(tlc.op[">"](1, 1)).toBe(false);

        expect(tlc.fop[">"](1, 2)).toBe(true);
        expect(tlc.fop[">"](1, 1)).toBe(false);
    });
});

describe("operator.op['>='] and core.fop['>=']", function() {
    it("should determine greater than or equal to", function() {
        expect(tlc.op[">="](2, 1)).toBe(true);
        expect(tlc.op[">="](1, 1)).toBe(true);
        expect(tlc.op[">="](1, 2)).toBe(false);

        expect(tlc.fop[">="](1, 2)).toBe(true);
        expect(tlc.fop[">="](1, 1)).toBe(true);
        expect(tlc.fop[">="](2, 1)).toBe(false);
    });
});
