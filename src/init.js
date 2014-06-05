"use strict";

var tlc = require("./core.js");


// Array
function arrayMap(f, xs) {
   var ys = new Array(xs.length);

   for (var i = 0; i < xs.length; ++i) {
       ys[i] = f(xs[i]);
   }

   return ys;
}

tlc.addInstance(Array, {
    // Functor
    map: arrayMap,

    // Monoid
    mempty: [],
    mappend: tlc.append
});

tlc.reduce = tlc.curry(tlc.reduce);
tlc.reduceRight = tlc.curry(tlc.reduceRight);
tlc.filter = tlc.curry(tlc.filter);
tlc.findIndex = tlc.curry(tlc.findIndex);
tlc.find = tlc.curry(tlc.find);
tlc.groupBy = tlc.curry(tlc.groupBy);
tlc.zipWith = tlc.curry(tlc.zipWith, 3);
tlc.zip = tlc.curry(tlc.zip, 2);
tlc.sortBy = tlc.curry(tlc.sortBy, 2);
tlc.some = tlc.curry(tlc.some);
tlc.every = tlc.curry(tlc.every);
tlc.contains = tlc.curry(tlc.contains);
tlc.intersperse = tlc.curry(tlc.intersperse);


// Function
tlc.apply = tlc.curry(tlc.apply);
tlc.memoizeBy = tlc.curry(tlc.memoizeBy);


// Maybe
function maybeUnit(value) {
    return new tlc.Maybe(true, value);
}

function maybeBind(maybe, f) {
    return maybe.hasValue ? f(maybe.value) : maybe;
}

function maybeAp(maybeF, maybeX) {
    return maybeF.hasValue ? tlc.map(maybeF.value, maybeX) : maybeF;
}

tlc.addInstance(tlc.Maybe, {
    // Applicative
    pure: maybeUnit,
    ap: maybeAp,

    // Monad and Functor
    unit: maybeUnit,
    bind: maybeBind
});

tlc.mapMaybe = tlc.curry(tlc.mapMaybe);


// Object
tlc.lookup = tlc.curry(tlc.lookup);
tlc.prop = tlc.curry(tlc.prop);
tlc.propCall = tlc.curry(tlc.propCall);


// Operator
for (var operator in tlc.op) {
    tlc.op[operator] = tlc.curry(tlc.op[operator]);
}

var flippedOperators = ["-", "/", "<", "<=", ">", ">="];

for (var i = 0; i < flippedOperators.length; ++i) {
    var operator = flippedOperators[i];
    tlc.fop[operator] = tlc.flip(tlc.op[operator]);
}


// Set
tlc.uniqueBy = tlc.curry(tlc.uniqueBy);
tlc.unionBy = tlc.curry(tlc.unionBy, 3);
tlc.union = tlc.curry(tlc.union, 2);
tlc.intersectBy = tlc.curry(tlc.intersectBy, 3);
tlc.intersect = tlc.curry(tlc.intersect, 2);


// Applicative
tlc.pure = tlc.curry(tlc.pure);
tlc.ap = tlc.curry(tlc.ap);


// Contravariant
tlc.contramap = tlc.curry(tlc.contramap);


// Functor
tlc.map = tlc.curry(tlc.map);


// Monad
tlc.unit = tlc.curry(tlc.unit);
tlc.bind = tlc.curry(tlc.bind, 2);


// Monoid
tlc.mappend = tlc.curry(tlc.mappend);
