const { isNumber, isBoolean, isArray, isFunction, isObject, isString } = require('./lib/types.js');

console.log(isNumber('3'));
console.log(isBoolean(true));
console.log(isArray([]));
console.log(isString(''));
console.log(isObject({}));
console.log(isFunction(() => {}));
