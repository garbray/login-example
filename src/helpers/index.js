export const isObject = obj => obj !== null && typeof obj === 'object';

export const setNestedObjectValues = (
  object,
  value,
  visited = new WeakMap(),
  response = {}
) => {
  for (let key of Object.keys(object)) {
    const val = object[key];
    if (isObject(val)) {
      if (!visited.get(val)) {
        visited.set(val, true);
        response[key] = Array.isArray(val) ? [] : {};
        setNestedObjectValues(val, value, visited, response[key]);
      }
    } else {
      response[key] = value;
    }
  }
  return response;
};

export const sleep = ms =>
  new Promise(resolve => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve();
    }, ms);
  });

export const validateEmail = values => {
  const errors = {};
  // eslint-disable-next-line
  const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailValidator.test(values.email)) {
    errors.email = 'enter a valid email';
  }

  return errors;
};

export const validateLogin = values => {
  let errors = {};
  const emailError = validateEmail(values);
  errors = { ...errors, ...emailError };
  if (values.password.length < 5) {
    errors.password = 'password invalid';
  }
  return errors;
};
