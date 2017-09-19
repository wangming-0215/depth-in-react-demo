// 偏函数严格来讲是一个减少函数参数的过程，这里的函数参数值得是希望传入形参的数量
// fn被偏应用实参的函数
function partial(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

// 颠倒实参顺序
function reverseArgs(fn) {
  return function argsReversed(...args) {
    return fn(...args.reverse());
  };
}

// 从右边开始偏应用实参
// 该方案不能保证一个特定的形参接收特定的被偏应用的值，只能保证将这些值当做原函数最右边的实参传入
function partialRight(fn, ...presetArgs) {
  return reverseArgs(partial(reverseArgs(fn), ...presetArgs.reverse()));
}

function foo(x, y, z) {
  let rest = [].slice.call(arguments, 3);
  console.log(x, y, z, rest);
}

let f = partialRight(foo, 'z:last');
f(1);
f(1, 2);
f(1, 2, 3);
f(1, 2, 3, 4);
f(1, 2, 3, 4, 5);

const getPerson = partial(ajax, 'http://some.api/person'); // 预设ajax函数的URL参数
// getPerson相当于:
// const getPerson = function partiallyApplied(...laterArgs) { return ajax('http://some.api/person', ...laterArgs); };

const getCurrentPerson = partial(getPerson, { user: 'CURRENT_USER_ID' });

let cache = {};
// reverseArgs(ajax) return的是ajax函数执行后的结果，而partial函数的第一个参数是函数
let cacheResult = reverseArgs(
  partial(reverseArgs(ajax), function onResult(obj) {
    cache[obj.id] = obj;
  })
);

function ajax(url, data, callback) {
  console.log(url);
  console.log(data);
  callback();
}

function add(x, y) {
  return x + y;
}

[1, 2, 3, 4, 5].map(function adder(item) {
  return add(item, 3);
});

[1, 2, 3, 4, 5].map(partial(add, 3));

// curring柯里化：将一个期望接收多个实参的函数拆解成连续的链式函数，每个链式函数接收单一的实参并返回另一个接收下一个实参的函数
// 在拿到原函数期望的全部实参之前，能够通过检查将要被柯里化的函数的length属性来得知柯里化需要迭代多少次。
function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      let args = prevArgs.concat([nextArg]);
      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

// 松散柯里化
// 松散柯里化允许传入超过形参数量（arity， 原函数确认或指定的形参数量）的实参
function looseCurry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(...nextArgs) {
      let args = prevArgs.concat(nextArgs);
      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

// 不使用柯里化给列表数字做加法运算
function sum(...args) {
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum += args[i];
  }
  return sum;
}

let notCurriedResult = sum(1, 2, 3, 4, 5, 6, 7, 8);
console.log(notCurriedResult);

// 适用柯里化给列表数字做加法
// (8 用来指定需要链式调用的次数)
let curriedSum = curry(sum, 8);
let curriedResult = curriedSum(1)(2)(3)(4)(5)(6)(7)(8);
console.log(curriedResult);

// 松散柯里化给列表数字做加法
let looseCurriedSum = looseCurry(sum, 8);
let looseCurriedResult = looseCurriedSum(1)(2, 3, 4)(5, 6, 7, 8);
console.log(looseCurriedResult);

// 强制把一个函数处理成单参数函数
function unary(fn) {
  return function onlyOneArg(arg) {
    return fn(arg);
  };
}

let adder = looseCurry(sum, 2);
// 真正传入adder的参数有4个，3， value, index, list
// 如 3, 1, 0, [1,2,3,4,5]
console.log([1, 2, 3, 4, 5].map(adder(3)));
// 适用unary修复
console.log([1, 2, 3, 4, 5].map(unary(adder(3))));
// [1, NaN, NaN]
console.log(['1', '2', '3'].map(parseInt));
// 适用unary修复上面的问题
console.log(['1', '2', '3'].map(unary(parseInt)));
// 其实就是等价于：
['1', '2', '3'].map(function onlyOneArg(value) {
  return parseInt(value);
});

// 传一个返回一个：该函数接收一个实参，然后什么都不做，原封不动的返回实参的值
function identity(v) {
  return v;
}

let words = '    Now is the time for all...'.split(/\s|\b/);
console.log(words); // [ '', '', '', '', 'Now', 'is', 'the', 'time', 'for', 'all', '...' ]
let afterFilter = words.filter(identity); // filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或 等价于 true 的值 的元素创建一个新数组
console.log(afterFilter); // [ 'Now', 'is', 'the', 'time', 'for', 'all', '...' ]

// 将identity()作为替代一个转换函数(这里指的是对传入值进行调整或者修改，并返回新值得函数)的默认函数
function output(msg, formatFn = identity) {
  msg = formatFn(msg);
  console.log(msg);
}
function upper(txt) {
  return txt.toUpperCase();
}
output('hello world!'); // hello world!
output('hello world!', upper); // HELLO WORLD!
console.log([1, 2, 3].map(identity)); // [ 1, 2, 3 ]

// 恒定参数 Certain API 禁止直接给方法传值，而要求我们传入一个函数，就算这个函数只是返回一个值
function constant(v) {
  return function value() {
    return v;
  };
}

// 扩展在参数中的妙用
function spreadArgs(fn) {
  return function spreadFn(argsArr) {
    return fn(...argsArr);
  };
}

function gatherArgs(fn) {
  return function gatherFn(...argsArr) {
    return fn(argsArr); // 执行fn
  };
}

function foo2(x, y) {
  console.log(x + y);
}

function bar(fn) {
  fn([3, 9]);
}
bar(foo2); // 3,9undefined
bar(spreadArgs(foo2)); // 12

// 命名参数解决函数参数顺序问题
function partialProps(fn, presetArgsObj) {
  return function partiallyApplied(laterArgsObj) {
    return fn(Object.assign({}, presetArgsObj, laterArgsObj));
  };
}

function curryProps(fn, arity = 1) {
  return (function nextCurried(prevArgsObj) {
    return function curried(nextArgObj = {}) {
      let [key] = Object.keys(nextArgObj);
      let obj = { [key]: nextArgObj[key] };
      let allArgsObj = Object.assign({}, prevArgsObj, obj); // 为什么不直接使用nextArgsObj ?
      if (Object.keys(allArgsObj).length >= arity) {
        return fn(allArgsObj);
      } else {
        return nextCurried(allArgsObj);
      }
    };
  })({});
}

function foo3({ x, y, z } = {}) {
  console.log(`x:${x}, y:${y}, z:${z}`);
}

let f1 = curryProps(foo3, 3);
let f2 = partialProps(foo3, { y: 2 });

f1({ y: 2 })({ x: 1 })({ z: 3 });
f2({ x: 1, z: 3 });

// point-free style 无形参风格
function double(x) {
  return x * 2;
}

// not point-free style
let afterMapper = [1, 2, 3, 4, 5].map(function mapper(v) {
  return double(v);
});
console.log(afterMapper);

// point-free style
// mapper(...)函数和double(...)函数有相同（或相互兼容）的函数签名。
// 形参v可以直接映射到double(...)函数调用里的相应的实参上。
// 使用无形参风格的关键，就是找到你的代码中，有哪些地方的函数直接将其形参作为内部函数调用的实参上
let afterMapper2 = [1, 2, 3, 4, 5].map(double);
console.log(afterMapper2);

function output2(txt) {
  console.log(txt);
}

function printIf(predicate, msg) {
  if (predicate(msg)) {
    output(msg);
  }
}

function isShortEnought(str) {
  return str.length <= 5;
}

function not(predicate) {
  return function negated(...args) {
    return !predicate(...args);
  };
}

let isLongEnough = not(isShortEnought);

let msg = 'Hello';
let msg1 = msg + 'World';
printIf(isShortEnought, msg);
printIf(isShortEnought, msg1);
