export const removeProperty = propName => {
  return ({ [propName]: _, ...rest }) => rest;
};
export const removeProperties = propNames => {
  return object => {
    let _ = { ...object };
    propNames.forEach(propName => {
      const func = removeProperty(propName);
      _ = func(_);
    });
    return _;
  };
};
