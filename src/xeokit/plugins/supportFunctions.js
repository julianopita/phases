//Catch pressed keys

export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  };

//Exports

export default {getKeyByValue}