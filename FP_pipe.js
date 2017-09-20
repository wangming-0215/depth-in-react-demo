// 将compose的参数反转一下就是pipe();
// pipe的优势在于它以函数的执行顺序排列参数，某些程度上可以减轻阅读者的疑惑。
function pipe(...fns) {
  return function piped(result) {
    let list = fns.slice();
    while (list.length > 0) {
      let fn = list.shift();
      result = fn(result);
    }
    return result;
  };
}

/**
 * 抽象：对两个或者多个任务的公共部分的剥离。通用部分只定义一次
 * DRY: don't repeat yourself
 * 不是为了隐藏细节而抽象，而是为了通过分离来突出关注点
 */
let comments = [];
let events = {};
// 抽象出公共部分
function saveData(store, location, value) {
  store[locaction] = value;
}

// 进一步抽象
// 抽象过度了
function conditionallyStoreDate(store, location, value, checkFn) {
  if (chectFn(value, store, location)) {
    store[location] = value;
  }
}

function notEmpty(val) {
  return val !== '';
}

function isUndefined(val) {
  return val === undefined;
}

function isPropUndefined(val, obj, prop) {
  return isUndefined(obj[prop]);
}

function saveComment(txt) {
  // if (txt !== '') {
  //   // comments[comments.length] = txt;
  //   saveData(comments, comments.length, txt);
  // }
  conditionallyStoreDate(comments, comments.length, txt, notEmpty);
}

function trackEvent(evt) {
  // if (evt.name !== undefined) {
  //   // events[evt.name] = evt;
  //   saveData(events, evt.name, evt);
  // }
  conditionallyStoreDate(events, evt.name, evt, isPropUndefined);
}
