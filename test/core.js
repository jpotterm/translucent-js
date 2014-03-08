var tlc = require("../src/core.js");


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
