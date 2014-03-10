var tlc = require("../src/array.js");


describe("array.reduce", function() {
    it("should reduce (fold) an array using the given function and accumulator", function() {
        var result = tlc.reduce(tlc.op["-"], 10, [1, 2, 3]);

        expect(result).toBe(4);
    });
});

describe("array.reduceRight", function() {
    it("should reduce (fold) an array starting from the right", function() {
        var result = tlc.reduceRight(tlc.op["-"], 10, [1, 2, 3]);

        expect(result).toBe(-8);
    });
});

describe("array.", function() {
    it("", function() {
        expect().toBe();
    });
});
