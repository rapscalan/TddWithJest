const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  castToNumber,
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
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(Promise)).toBeNull();
  });
});
