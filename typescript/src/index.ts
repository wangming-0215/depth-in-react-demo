// boolean
let isDone: boolean = false;

// number 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。
let dec: number = 10;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octa: number = 0o744;

// string
let myName: string = "wangming";
let age: number = 18;
let sentence: string = `Hello, my name is ${myName}. I will be ${age + 1} next year!`;

// 数组 []
let list: number[] = [1, 2, 3, 4]; // number类型数组
// 数组泛型 Array<元素类型>
let list2: Array<string> = ['1', '2'];
let list3: Array<number> = [1, 2];

// 元组 Tuple,元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
let x: [string, number];
x = ['hello', 10];

// 枚举 enum 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值
enum Color { Red, Green, Blue };
let c: Color = Color.Green;
console.log(c);  // => 1

// 枚举类型提供的一个便利是你可以由枚举的值得到它的名字
let colorName: string = Color[2];
console.log(colorName);

// any 不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false; // okay, definitely a boolean
// 当你只知道一部分数据的类型时，any类型也是有用的
let list4: any[] = [1, '1', false];

// void 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型
function warnUser(): void {
    alert('This is my warning message!');
}

// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
let unusable: void = undefined;

// null & undefined TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null.
// 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
// 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
let u: undefined = undefined;
let n: null = null;

// never 表示的是那些永不存在的值的类型
// never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时
// 返回never的函数必须存在无法到达的终点
function error(message: string): never {
    throw new Error('message');
}

// 腿短的返回值类型为never
function fail() {
    return Error('something error!');
}

function infiniteLoop(): never {
    while (true) {

    }
}

// 类型断言
// 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 
// 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 
// 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;
// or
let strLength2: number = (someValue as string).length;

// 接口
// 我们只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。
interface LabelledValue {
    label: string;
}

function printLabel(labelleObj: LabelledValue) {
    console.log(labelleObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);

// 可选属性,接口里的属性不全都是必需的
// 可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: 'white', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width;
    }
    return newSquare;
}

// 只读属性 一些对象属性只能在对象刚刚创建的时候修改其值
// TypeScript具有ReadonlyArray < T > 类型，它与Array < T > 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改
// 最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 20, y: 40 };
// p1.x = 5; // error;

// 函数类型:为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配
interface SearchFunc {
    (soucrce: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}

// 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型
// 支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray = ['wangming', 'hahaha'];
let myStr = myArray[0];