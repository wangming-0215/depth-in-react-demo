/**
 * 值的不可变性：并不是说在程序编写时不改变某个值，也不是指变量不能承载不同的值
 * 值的不可变性是指当需要改变程序状态时，不能改变已经存在的值，而是必须创建和跟踪一个新的值。
 * 需要担心的并不是变量是否被重新赋值，而是值是否会发生改变。
 */

function addValue(arr) {
  // 创建新数组保存结果，不会改变实参的原始数据。
  let newArr = [...arr, 4];
  return newArr;
}
// 浅拷贝代替改变---这样的策略应用于对象
function updaeLastLogin(user) {
  let newUserRecord = Object.assign({}, user);
  newUserRecord.lastLogin = Date.now();
  return newUserRecord;
}

let user = { lastLogin: new Date() };
user = updaeLastLogin(user);

/**
 * 常量：一个无法进行重新赋值的变量。
 * Object.freeze()简单廉价的（勉强）将对象，数组，函数这样的可变数据转为‘不可变’数据。提供浅层的初级的不可变性约束。只是将对象的顶层设为不可变。
 */
let x = Object.freeze([1, 2, 3, 4, [2, 3], 5, 6]);
