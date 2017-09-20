function words(str) {
  return String(str)
    .split(/\s|\b/)
    .filter(function alpha(v) {
      return /^[\w+$]/.test(v);
    });
}

function unique(list) {
  let uniqueList = [];
  for (let i = 0; i < list.length; i++) {
    if (uniqueList.indexOf(list[i]) === -1) {
      uniqueList.push(list[i]);
    }
  }
  return uniqueList;
}

function skipShortWords(list) {
  let filteredList = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].length > 4) {
      filteredList.push(list[i]);
    }
  }
  return filteredList;
}

// 组合两个函数，函数从右开始执行。
function uniqueWords(str) {
  return unique(words(str));
}

// compose
function compose2(fn2, fn1) {
  return function composed(origValue) {
    return fn2(fn1(origValue));
  };
}

// 右偏应用
// 这个右偏有问题！！！！！
function partialRight(fn, ...persetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...laterArgs, ...persetArgs);
  };
}
// function partiallyApplied(skipShortWords) {
//   return componse(unique, words, laterArgs);
// }
// 通用compose
// 通过循环立即执行计算，将一个调用的结果传递到下一个
function compose(...fns) {
  return function composed(result) {
    // 拷贝一份保存函数的数组
    let list = fns.slice();
    while (list.length > 0) {
      // 将最后一个函数从列表尾部拿出
      // 并执行它;
      result = list.pop()(result);
    }
    return result;
  };
}

// 用reduce代替循环
// reduce(...)循环发生在最后的composed(...)运行时，并且每一个中间的result(...)将会在下一次调用时作为输入值传递给下一个迭代
// 这种实现局限在于外层组合函数(composed(...))只能接收一个参数。
function composeWithReduce1(...fns) {
  return function composed(result) {
    return fns.reverse().reduce(function reducer(result, fn) {
      return fn(result);
    }, result);
  };
}

// 用递归实现componse
function composeWithRecursion(...fns) {
  // 拿出最后两个参数
  let [fn1, fn2, ...rest] = fns.reverse();
  let composedFn = function composed(...args) {
    return fn2(fn1(...args));
  };
  if (rest.length === 0) return composedFn;
  return composeWithRecursion(...rest.reverse(), composedFn);
}

// 惰性运算
// 每一个简化后的局部结果都是一个包裹层级更多的函数
// 当调用最终组合函数并且提供一个或者多个参数时，这个层层嵌套的大函数内部的所有层级，由内而外调用，以相反的方式连续执行。
function composeWithReduce2(...fns) {
  return fns.reverse().reduce(function reducer(fn1, fn2) {
    return function componsed(...args) {
      return fn2(fn1(...args));
    };
  });
}

let text = `To compose two functions together, pass the output of the first function call as the input of the second function call.`;
let wordFound = words(text);
console.log(wordFound); // [ 'To','compose','two','functions','together','pass','the','output','of','the','first','function','call','as','the','input','of','the','second','function','call' ]
let wordUsed = unique(wordFound);
console.log(wordUsed); // [ 'To','compose', 'two','functions','together','pass','the','output','of','first','function','call','as','input', 'second' ]

let wordUsed1 = unique(words(text));
let wordUsed2 = uniqueWords(text);
let afterCompose2 = compose2(unique, words);
let wordUsed3 = afterCompose2(text);

let biggerWords = compose(skipShortWords, unique, words);
let wordUsed4 = biggerWords(text);
console.log('--------------------------------');
console.log(wordUsed4);

let filterWords = partialRight(compose, unique, words);
let biggerWords2 = filterWords(skipShortWords);
console.log('_________________________________');
console.log(biggerWords2(text));
