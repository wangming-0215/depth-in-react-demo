let isDone = false;
let dec = 10;
let hex = 0xf00d;
let binary = 0b1010;
let octa = 0o744;
let myName = "wangming";
let age = 18;
let sentence = `Hello, my name is ${myName}. I will be ${age + 1} next year!`;
let list = [1, 2, 3, 4];
let list2 = ['1', '2'];
let list3 = [1, 2];
let x;
x = ['hello', 10];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
let c = Color.Green;
console.log(c);
let colorName = Color[2];
console.log(colorName);
//# sourceMappingURL=tsc.js.map