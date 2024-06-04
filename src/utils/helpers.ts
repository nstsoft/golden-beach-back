const isObjectId = (value: unknown) => {
  // Assuming ObjectId is a function or a constructor
  // You need to adjust this check based on how ObjectId is defined in your context
  return typeof value === 'object' && value !== null && value.constructor && value.constructor.name === 'ObjectId';
};

export const removeUndefinedProps = (obj: object) => {
  if (Array.isArray(obj)) {
    // Process arrays
    for (let i = 0; i < obj.length; i++) {
      obj[i] = removeUndefinedProps(obj[i]);
    }
  } else if (obj && typeof obj === 'object' && !(obj instanceof Date) && !isObjectId(obj)) {
    // Process objects
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        obj[key] = removeUndefinedProps(obj[key]);
        if (
          obj[key] === null ||
          obj[key] === undefined ||
          obj[key] === '' ||
          (typeof obj[key] === 'object' &&
            Object.keys(obj[key]).length === 0 &&
            !(obj[key] instanceof Date) &&
            !isObjectId(obj[key]))
        ) {
          delete obj[key];
        }
      }
    }
  }
  return obj;
};
