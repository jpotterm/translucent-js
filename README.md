# Translucent.js

A referentially transparent library for functional programming.

Translucent adds powerful features from functional programming to JavaScript while remaining light and simple. Some features are:

  - Typeclasses
  - Everything is curried
  - Referentially transparency (no side-effects)


# Documentation

Documentation is on the [Github wiki](https://github.com/jpotterm/translucent-js/wiki/Documentation).


# Cool things you can do with Translucent

Partial application (currying):

```javascript
var plus1 = tlc.op['+'](1);
```

Mapping over arrays:

```javascript
var a = [1, 2, 3, 4];
tlc.map(plus1, a); // [2, 3, 4, 5]
```

Typeclasses let you use Translucent's features on your own data structures. To map over a tree you could do:

```javascript
function Tree(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
}

function treeMap(f, tree) {
    var left = (tree.left === undefined) ? undefined : treeMap(tree.left);
    var right = (tree.right === undefined) ? undefined : treeMap(tree.right);

    return new Tree(f(tree.value), left, right);
}

// Tell translucent how to map a Tree
tlc.addInstance(Tree, {map: treeMap});

var tree = new Tree(1, new Tree(2), new Tree(3));
tlc.map(plus1, tree); // Tree 2 (Tree 3) (Tree 4)
```


# License

See [LICENSE.txt](https://github.com/jpotterm/translucent-js/blob/master/LICENSE.txt). In short, this code is under the CC0 license which means it's essentially in the public domain. If you modify or redistribute this code I'd appreciate attribution, but you are under no obligation to give it.
