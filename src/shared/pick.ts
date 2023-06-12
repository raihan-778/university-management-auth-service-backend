const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[]
): Partial<T> => {
  const finalObj: Partial<T> = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      // "Object.hasOwnProperty" will check the object if the key exists as won property.Then it will call a function as "Object.getOwnProperty.call" which will take two properties "object & key"
      finalObj[key] = obj[key]; // by using this line we have appended object value to his respective property.
    }
  }
  return finalObj;
};
export default pick;
