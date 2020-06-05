import React, { useEffect } from 'react';
import { useAppDispatch } from '../context';
import useFormik from '../hooks/useFormik';
import { validateLogin } from '../helpers';
import useDataApi from '../hooks/useDataApi';
import isEmpty from 'lodash.isempty';

const Login = () => {
  const useDispacher = useAppDispatch();
  const { data, error, doSend } = useDataApi();

  useEffect(() => {
    if (!isEmpty(data)) {
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    console.log('useffect error', error);
    if (!isEmpty(error)) {
      console.log(error);
    }
  }, [error]);

  const submitForm = async values => {
    doSend('login', values);
  };

  const {
    handleSubmit,
    touched,
    errors,
    submitError,
    getFieldProps,
    isSubmitting,
    isValid
  } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: submitForm,
    validate: validateLogin
  });

  const resetPassword = event => {
    event.preventDefault();
    useDispacher.goToScreen('reset');
  };

  return (
    <form onSubmit={handleSubmit}>
      {submitError && <div className="errorMessage">{submitError}</div>}
      <label className="label" htmlFor="email">
        Email
      </label>
      <input
        className="input"
        id="email"
        type="text"
        {...getFieldProps('email')}
      />
      {errors.email && touched.email && (
        <div className="error">{errors.email}</div>
      )}
      <label className="label" htmlFor="password">
        password
      </label>
      <input
        className="input"
        id="password"
        placeholder="password"
        type="password"
        {...getFieldProps('password')}
      />
      {errors.password && touched.password && (
        <div className="error">{errors.password}</div>
      )}
      <a href="/" onClick={resetPassword}>
        forgot password
      </a>
      <button className="button" disabled={!isValid || isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default Login;
