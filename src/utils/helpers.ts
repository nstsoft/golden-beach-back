export const removeUndefinedProps = (obj: object) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => removeUndefinedProps(item)).filter((item) => item !== undefined);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const cleanedValue = removeUndefinedProps(value);
      if (cleanedValue !== undefined) {
        acc[key] = cleanedValue;
      }
      return acc;
    }, {});
  }
  return obj;
};
