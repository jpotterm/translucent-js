"use strict";

var tlc = require("../src/core.js");


describe("core.toArray", function() {
    it("should convert arguments to an array", function() {
        function test() {
            expect(tlc.toArray(arguments) instanceof Array).toBe(true);
        }

        test(1, 2, 3);
    });
});

describe("core.cloneArray", function() {
    it("should copy array", function() {
        var a = [1, 2, 3];
        var b = tlc.cloneArray(a);

        b[1] = 4;

        expect(a[1]).toBe(2);
    });
});

describe("core.curry", function() {
    it("should produce a curried function", function() {
        function sum(x, y) {
            return x + y;
        }

        var curriedSum = tlc.curry(sum);

        expect(curriedSum(2)(4)).toBe(6);
    });
});

describe("core.apply", function() {
    it("should use array as arguments", function() {
        function sum(x, y, z) {
            return x + y + z;
        }

        var result = tlc.apply(sum, [1, 2, 3]);
        expect(result).toBe(6);
    });
});

describe("core.concat", function() {
    it("should concatenate all the arrays together", function() {
        var result = tlc.concat([1, 2], [3, 4], [5, 6]);
        expect(result[4]).toBe(5);
    });
});

describe("core.partial", function() {
    it("should produce a partially applied function", function() {
        function sum(x, y) {
            return x + y;
        }

        var plusTwo = tlc.partial(sum, 2);

        expect(plusTwo(4)).toBe(6);
    });
});

describe("array.reverse", function() {
    it("should reverse an array", function() {
        var result = tlc.reverse([1, 2, 3]);

        expect(result[0]).toBe(3);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(1);
    });
});

describe("core.reduce", function() {
    it("should reduce (fold) an array using the given function and accumulator", function() {
        var result = tlc.reduce(tlc.op["-"], 10, [1, 2, 3]);

        expect(result).toBe(4);
    });
});

describe("core.reduceRight", function() {
    it("should reduce (fold) an array starting from the right", function() {
        var result = tlc.reduceRight(tlc.op["-"], 10, [1, 2, 3]);

        expect(result).toBe(-8);
    });
});

describe("core.pipeline", function() {
    it("should compose functions from right to left", function() {
        function plusTwo(n) {return n + 2;}
        function timesFour(n) {return n * 4;}

        var piped = tlc.pipeline(plusTwo, timesFour);
        expect(piped(1)).toBe(12);
    });
});

describe("core.compose", function() {
    it("should compose functions from left to right", function() {
        function plusTwo(n) {return n + 2;}
        function timesFour(n) {return n * 4;}

        var composed = tlc.compose(timesFour, plusTwo);
        expect(composed(1)).toBe(12);
    });
});

describe("core.flip", function() {
    it("should swap the order of the first two arguments", function() {
        function echo(x, y, z) {
            return [x, y, z];
        }

        var ceho = tlc.flip(echo);
        var result = ceho(1, 2, 3);

        expect(result[0]).toBe(2);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(3);
    });
});

describe("core.memoizeBy", function() {
    it("should cache function arguments", function() {
        function echo(x, y, z) {
            return [x, y, z];
        }

        function constantHash() {
            return "test";
        }

        var cached = tlc.memoizeBy(constantHash, echo);

        var initialResult = cached(1, 2, 3);
        var cachedResult = cached(4, 5, 6);

        expect(initialResult[0]).toBe(1);
        expect(initialResult[1]).toBe(2);
        expect(initialResult[2]).toBe(3);

        expect(cachedResult[0]).toBe(1);
        expect(cachedResult[1]).toBe(2);
        expect(cachedResult[2]).toBe(3);
    });
});

describe("core.memoize", function() {
    it("should cache function arguments", function() {
        function echo(x, y, z) {
            return [x, y, z];
        }

        var cached = tlc.memoize(echo);

        var initialResult = cached(1, 2, 3);
        var cachedResult = cached(1, 2, 3);

        expect(initialResult[0]).toBe(1);
        expect(initialResult[1]).toBe(2);
        expect(initialResult[2]).toBe(3);

        expect(cachedResult[0]).toBe(1);
        expect(cachedResult[1]).toBe(2);
        expect(cachedResult[2]).toBe(3);
    });
});

describe("core.not", function() {
    it("should negate a boolean", function() {
        expect(tlc.not(false)).toBe(true);
    });
});

describe("core.op['+']", function() {
    it("should add", function() {
        expect(tlc.op["+"](1, 2)).toBe(3);
    });
});

describe("core.op['-'] and core.fop['-']", function() {
    it("should subtract", function() {
        expect(tlc.op["-"](1, 2)).toBe(-1);

        expect(tlc.fop["-"](2, 1)).toBe(-1);
    });
});

describe("core.op['*']", function() {
    it("should multiply", function() {
        expect(tlc.op["*"](4, 2)).toBe(8);
    });
});

describe("core.op['/'] and core.fop['/']", function() {
    it("should divide", function() {
        expect(tlc.op["/"](4, 2)).toBe(2);

        expect(tlc.fop["/"](2, 4)).toBe(2);
    });
});

describe("core.op['===']", function() {
    it("should determine equality", function() {
        expect(tlc.op["==="](1, 1)).toBe(true);
        expect(tlc.op["==="](1, 2)).toBe(false);
    });
});

describe("core.op['<'] and core.fop['<']", function() {
    it("should determine less than", function() {
        expect(tlc.op["<"](1, 2)).toBe(true);
        expect(tlc.op["<"](1, 1)).toBe(false);

        expect(tlc.fop["<"](2, 1)).toBe(true);
        expect(tlc.fop["<"](1, 1)).toBe(false);
    });
});

describe("core.op['<='] and core.fop['<=']", function() {
    it("should determine less than or equal to", function() {
        expect(tlc.op["<="](1, 2)).toBe(true);
        expect(tlc.op["<="](1, 1)).toBe(true);
        expect(tlc.op["<="](2, 1)).toBe(false);

        expect(tlc.fop["<="](2, 1)).toBe(true);
        expect(tlc.fop["<="](1, 1)).toBe(true);
        expect(tlc.fop["<="](1, 2)).toBe(false);
    });
});

describe("core.op['>'] and core.fop['>']", function() {
    it("should determine greater than", function() {
        expect(tlc.op[">"](2, 1)).toBe(true);
        expect(tlc.op[">"](1, 1)).toBe(false);

        expect(tlc.fop[">"](1, 2)).toBe(true);
        expect(tlc.fop[">"](1, 1)).toBe(false);
    });
});

describe("core.op['>='] and core.fop['>=']", function() {
    it("should determine greater than or equal to", function() {
        expect(tlc.op[">="](2, 1)).toBe(true);
        expect(tlc.op[">="](1, 1)).toBe(true);
        expect(tlc.op[">="](1, 2)).toBe(false);

        expect(tlc.fop[">="](1, 2)).toBe(true);
        expect(tlc.fop[">="](1, 1)).toBe(true);
        expect(tlc.fop[">="](2, 1)).toBe(false);
    });
});

describe("core.op['[]'] and core.fop['[]']", function() {
    it("should do array access", function() {
        var a = [1, 2, 3];

        expect(tlc.op["[]"](a, 2)).toBe(3);

        expect(tlc.fop["[]"](2, a)).toBe(3);
    });

    it("should do object access", function() {
        var a = {one: 1};

        expect(tlc.op["[]"](a, "one")).toBe(1);

        expect(tlc.fop["[]"]("one", a)).toBe(1);
    });
});

describe("core.extend", function() {
    it("should combine and overwrite the left object", function() {
        var a = {one: 1, two: 2};
        var b = {two: 4, three: 3};

        var c = tlc.extend(a, b);

        expect(c.one).toBe(1);
        expect(c.two).toBe(4);
        expect(c.three).toBe(3);
    });
});
