"use strict";

var tlc = require("../src/array.js");


describe("array.filter", function() {
    it("should remove elements that don't pass the predicate", function() {
        function odd(n) {return n % 2 !== 0;}

        var result = tlc.filter(odd, [1, 2, 3, 4, 5]);

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(3);
        expect(result[2]).toBe(5);
    });
});

describe("array.findIndex", function() {
    function isTwo(x) {return x === 2;}

    it("should return the index of the element if it exists", function() {
        var result = tlc.findIndex(isTwo, [1, 2, 3]);

        expect(result).toBe(1);
    });

    it("should return undefined if the element doesn't exist", function() {
        var result = tlc.findIndex(isTwo, [1, 3, 4]);

        expect(result).toBe(undefined);
    });
});

describe("array.find", function() {
    function isTwo(x) {return x === 2;}

    it("should return the element if it exists", function() {
        var result = tlc.find(isTwo, [1, 2, 3]);

        expect(result).toBe(2);
    });

    it("should return undefined if the element doesn't exist", function() {
        var result = tlc.find(isTwo, [1, 3, 4]);

        expect(result).toBe(undefined);
    });
});

describe("array.groupBy", function() {
    it("should group elements based on provided equality function", function() {
        function oneAway(x, y) {
            return Math.abs(x - y) <= 1;
        }

        var result = tlc.groupBy(oneAway, [1, 2, 4, 5]);

        expect(result[0][0]).toBe(1);
        expect(result[0][1]).toBe(2);
        expect(result[1][0]).toBe(4);
        expect(result[1][1]).toBe(5);
    });
});

describe("array.group", function() {
    it("should group elements based on equality", function() {
        var result = tlc.group([1, 1, 2, 2]);

        expect(result[0][0]).toBe(1);
        expect(result[0][1]).toBe(1);
        expect(result[1][0]).toBe(2);
        expect(result[1][1]).toBe(2);
    });
});

describe("array.minimum", function() {
    it("should return the smallest element in the array", function() {
        expect(tlc.minimum([1, 2, 3])).toBe(1);
    });
});

describe("array.maximum", function() {
    it("should return the largest element in the array", function() {
        expect(tlc.maximum([1, 2, 3])).toBe(3);
    });
});

describe("array.sum", function() {
    it("should return the sum of the array", function() {
        expect(tlc.sum([1, 2, 3])).toBe(6);
    });
});

describe("array.product", function() {
    it("should return the product of the array", function() {
        expect(tlc.product([2, 3, 4])).toBe(24);
    });
});

describe("array.and", function() {
    it("should tell whether every boolean in the array is true", function() {
        expect(tlc.and([true, false, true])).toBe(false);
        expect(tlc.and([true, true, true])).toBe(true);
    });
});

describe("array.or", function() {
    it("should tell whether any boolean in the array is true", function() {
        expect(tlc.or([true, false, true])).toBe(true);
        expect(tlc.or([false, false, false])).toBe(false);
    });
});

describe("array.transpose", function() {
    it("should transpose a 2d array", function() {
        var result = tlc.transpose([[1, 2], [3, 4]]);

        expect(result[0][0]).toBe(1);
        expect(result[0][1]).toBe(3);
        expect(result[1][0]).toBe(2);
        expect(result[1][1]).toBe(4);
    });
});

describe("array.zipWith", function() {
    it("should zip multiple arrays together with function", function() {
        function commaSeparated(x, y) {
            return x + "," + y;
        }

        var result = tlc.zipWith(commaSeparated, [1, 2], [3, 4]);

        expect(result[0]).toBe("1,3");
        expect(result[1]).toBe("2,4");
    });
});

describe("array.zip", function() {
    it("should zip multiple arrays together", function() {
        var result = tlc.zip([1, 2], [3, 4]);

        expect(result[0][0]).toBe(1);
        expect(result[0][1]).toBe(3);
        expect(result[1][0]).toBe(2);
        expect(result[1][1]).toBe(4);
    });
});

describe("array.sortBy", function() {
    it("should sort the array by the given comparator", function() {
        function evenLessThanOdd(x, y) {return x % 2 - y % 2;}

        var result = tlc.sortBy(evenLessThanOdd, [1, 2, 2, 1]);

        expect(result[0]).toBe(2);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(1);
        expect(result[3]).toBe(1);
    });
});

describe("array.sort", function() {
    it("should sort the array", function() {
        var result = tlc.sort([3, 1, 4, 2]);

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
        expect(result[3]).toBe(4);
    });
});

describe("array.flatten", function() {
    it("should flatten the 2d array", function() {
        var result = tlc.flatten([[1, 2], [3, 4]]);

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
        expect(result[3]).toBe(4);
    });
});

describe("array.some", function() {
    it("should indicate if some elements pass the predicate", function() {
        function even(n) {return n % 2 === 0;}

        expect(tlc.some(even, [1, 2, 3])).toBe(true);
        expect(tlc.some(even, [1, 3])).toBe(false);
    });
});

describe("array.every", function() {
    it("should indicate if every element passes the predicate", function() {
        function even(n) {return n % 2 === 0;}

        expect(tlc.every(even, [2, 4])).toBe(true);
        expect(tlc.every(even, [2, 4, 5])).toBe(false);
    });
});

describe("array.contains", function() {
    it("should indicate if an element is in an array", function() {
        expect(tlc.contains(1, [1, 2, 3])).toBe(true);
        expect(tlc.contains(1, [2, 3])).toBe(false);
    });
});

describe("array.range", function() {
    it("should produce the appropriate range", function() {
        var result = tlc.range(1, 6, 2);

        expect(result.length).toBe(3);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(3);
        expect(result[2]).toBe(5);
    });
});

describe("array.intersperse", function() {
    it("should intersperse an element between elements of an array", function() {
        var result = tlc.intersperse(0, [1, 2, 3]);

        expect(result.length).toBe(5);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(0);
        expect(result[2]).toBe(2);
        expect(result[3]).toBe(0);
        expect(result[4]).toBe(3);
    });
});
