var tlc = require("../src/set.js");


describe("set.uniqueBy", function() {
    it("should remove duplicate elements by comparator", function() {
        function bothEvenOdd(x, y) {return x % 2 === y % 2;}

        var result = tlc.uniqueBy(bothEvenOdd, [1, 2, 3, 4]);

        expect(result.length).toBe(2);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
    });
});

describe("set.unique", function() {
    it("should remove duplicate elements", function() {
        var result = tlc.unique([1, 2, 1, 3, 3]);

        expect(result.length).toBe(3);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
    });
});

describe("set.unionBy", function() {
    it("should concat all arrays and remove duplicates by comparator", function() {
        function bothEvenOdd(x, y) {return x % 2 === y % 2;}

        var result = tlc.unionBy(bothEvenOdd, [1, 2], [3, 4]);

        expect(result.length).toBe(2);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
    });
});

describe("set.union", function() {
    it("should concat all arrays and remove duplicates", function() {
        var result = tlc.union([1, 2], [2, 3]);

        expect(result.length).toBe(3);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
    });
});

describe("set.intersectBy", function() {
    it("should keep only elements that are in every array by comparator", function() {
        function bothEvenOdd(x, y) {return x % 2 === y % 2;}

        var result = tlc.intersectBy(bothEvenOdd, [1, 2], [3, 4], [5, 6]);

        expect(result.length).toBe(2);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
    });
});

describe("set.intersect", function() {
    it("should keep only elements that are in every array", function() {
        var result = tlc.intersect([1, 2], [2, 3], [4, 2]);

        expect(result.length).toBe(1);
        expect(result[0]).toBe(2);
    });
});
