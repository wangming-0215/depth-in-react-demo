// 异步任务执行器
function taskRunner() {
  return function(taskDef) {
    let task = taskDef();
    let result = task.next();
    (function step() {
      if (!result.done) {
        let promise = Promise.resolve(result.value);
        promise
          .then(function(value) {
            result = task.next(value);
            step();
          })
          .catch(function(err) {
            result = task.throw(err);
          });
      }
    })();
  };
}

module.exports = taskRunner();
