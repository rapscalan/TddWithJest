const isNumber = val => typeof val === 'number';
const isString = val => typeof val === 'string';
const isBoolean = val => typeof val === 'boolean';
const isArray = val => typeof val === 'object' && Array.isArray(val);
const isObject = val => typeof val === 'object' && !Array.isArray(val);
const isFunction = val => typeof val === 'function';

const castToNumber = val => {
  if(isNumber(val)) return val;
  const number = Number(val);
  if(isNaN(number)) throw new CastError(Number, val);
  return number;
};

const castToString = val => {
  return String(val);
}

const castToBoolean = val => {
  return Boolean(val);
}

const castToArray = val => {
  if(val instanceof Array){
    return val;
  }
  //const arr = [];
  if(isObject(val)){
    return Object.getValues(val);
  }
  if(isString(val)){
    return val.split("[^a-zA-Z0-9]+");
  }
}

class CastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

const casters = {
  Number: castToNumber,
  String: castToString,
  Boolean: castToBoolean
};

const getCaster = Type => {  
  return casters[Type.name] || null;
};

module.exports = {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  CastError,
  getCaster,
  castToNumber,
  castToString,
  castToBoolean
};
