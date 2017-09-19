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

// 通用compose
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
