const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToNumber,
  castToString,
  castToBoolean,
  castToArray,
  getCaster
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a numbers', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });
    it('properly tells if a value is a string', () => {
      expect(isString('a string')).toBeTruthy();
      expect(isString('')).toBeTruthy();
      expect(isString("double quote string")).toBeTruthy();
      expect(isString(5)).toBeFalsy();
      expect(isString(false)).toBeFalsy();
      expect(isString({})).toBeFalsy();
      expect(isString([])).toBeFalsy();
      expect(isString(()=>{})).toBeFalsy();
    })
    it('properly tells if a value is a boolean', () => {
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean('hi')).toBeFalsy();
      expect(isBoolean('true')).toBeFalsy();
      expect(isBoolean("")).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
      expect(isBoolean(() => {})).toBeFalsy();
      expect(isBoolean(5)).toBeFalsy();
      expect
    });
    it('properly tells if a value is an array', () => {
      expect(isArray([])).toBeTruthy();
      expect(isArray([1,2,3])).toBeTruthy();
      expect(isArray(5)).toBeFalsy();
      expect(isArray({})).toBeFalsy();
      expect(isArray('hi')).toBeFalsy();
      expect(isArray("")).toBeFalsy();
      expect(isArray(true)).toBeFalsy();
      expect(isArray(() => {})).toBeFalsy();
      expect(isArray((undefined))).toBeFalsy();
    });
    it('properly tells if a value is an object', () => {
      expect(isObject({})).toBeTruthy();
      expect(isObject({name: 'spot', age: 4 })).toBeTruthy();
      expect(isObject([])).toBeFalsy();
      expect(isObject(5)).toBeFalsy();
      expect(isObject('')).toBeFalsy();
      expect(isObject("")).toBeFalsy();
      expect(isObject(true)).toBeFalsy();
      expect(isObject(() => {})).toBeFalsy();
      expect(isObject((undefined))).toBeFalsy();
    });
    it('properly tells if a value is a function', () => {
      expect(isFunction(() => {})).toBeTruthy();
      expect(isFunction(function(){})).toBeTruthy();
      expect(isFunction('hi')).toBeFalsy();
      expect(isFunction(5)).toBeFalsy();
      expect(isFunction("")).toBeFalsy();
      expect(isFunction(true)).toBeFalsy();
      expect(isFunction({})).toBeFalsy();
      expect(isFunction([])).toBeFalsy();
    })
  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });

    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to a string', () => {
      expect(castToString(3)).toEqual("3");
      expect(castToString(true)).toEqual("true");
      expect(castToString({})).toEqual("[object Object]");
      expect(castToString("string")).toEqual("string");
      expect(castToString([1,2])).toEqual("1,2")
    });

    it('can cast values to a Boolean', () => {
      expect(castToBoolean(3)).toEqual(true);
      expect(castToBoolean(true)).toEqual(true);
      expect(castToBoolean({})).toEqual(true);
      expect(castToBoolean([])).toEqual(true);
      expect(castToBoolean(() => {})).toEqual(true);
      expect(castToBoolean(' ')).toEqual(true);
      expect(castToBoolean('')).toEqual(false);
      expect(castToBoolean("")).toEqual(false);

      expect(castToBoolean(NaN)).toEqual(false);
      expect(castToBoolean(null)).toEqual(false);
      expect(castToBoolean(undefined)).toEqual(false);
    })
  });

  it('can cast values to an array', () => {
    expect(castToArray(1,2,3)).toEqual([1, 2, 3]);
    expect(castToArray()).toEqual([]);
    expect(castToArray(1)).toEqual([1]);
    expect(castToArray("one","two","three")).toEqual(["one","two","three"]);
    expect(castToArray('')).toEqual(['']);
  })

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(Array)).toEqual(castToArray);
    expect(getCaster(Boolean)).toEqual(castToBoolean);
    expect(getCaster(String)).toEqual(castToString);
    expect(getCaster(Promise)).toBeNull();
  });
});
