import isBlank from 'underscore.string';
import {
  cloneDeep,
  isArray,
  isDate,
  isObject,
  mapValues,
  map,
  omitBy,
  reject,
} from 'lodash-es';

export function createObjectWithDefaultValue(defaultValue = '') {
  return new Proxy(
    {},
    {
      get: function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property)
          ? object[property]
          : defaultValue;
      },
    }
  );
}

export function deepCopy(src) {
  return JSON.parse(JSON.stringify(src));
}

function recursiveClean(src) {
  console.log('to clean', src);
  if (isArray(src)) {
    return map(reject(src, isBlank), v => recursiveClean(v));
  }
  if (isDate(src)) {
    return src.toISOString();
  }
  if (isObject(src)) {
    return mapValues(omitBy(src, isBlank), v => recursiveClean(v));
  }
  return src;
}

export function cleanedDeepCopy(src) {
  console.log(cloneDeep(src), deepCopy(src));
  return recursiveClean(deepCopy(src));
}
