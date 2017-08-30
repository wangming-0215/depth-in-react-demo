let curry = require("lodash").curry;

let match = curry(function(what, str) {
    return str.match(what);
});

let replace = curry(function(what, replacement, str) {
    return str.replace(what, replacement);
});

let filter = curry(function(f, ary) {
    return ary.filter(f);
});

let map = curry(function(f, ary) {
    return ary.map(f);
});

console.log(match(/\s+/g, "hello world"));

console.log(match(/\s+/g)("Hello World"));

let hasSpaces = match(/\s+/g);

console.log(hasSpaces("Hello World"));
console.log(hasSpaces("spaceless"));
console.log(filter(hasSpaces, ["tori_spelling", "tori amos"]));

let findSpaces = filter(hasSpaces);
console.log(findSpaces(["tori_spelling", "tori amos"]));

let noVowels = replace(/[aeiou]/gi);

let censored = noVowels("*");

console.log(censored("Chocolate Rain"));
