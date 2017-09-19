let fs = require('fs');
let taskRunner = require('./taskRunner');

function readFileFun() {
  return function(filename) {
    return new Promise(function(resolve, reject) {
      fs.readFile(filename, { encoding: 'utf8' }, function(err, contents) {
        if (err) {
          reject(err);
          return;
        }
        resolve(contents);
      });
    });
  };
}

// 异步任务
function* taskDef() {
  let readFile = readFileFun();
  let contents = yield readFile('result.json');
  doSomethingWithContent(contents);
}

function doSomethingWithContent(contents) {
  let result = JSON.parse(contents);
  console.log(`我是${result.name}， 我今年${result.age}岁！`);
}

taskRunner(taskDef);
