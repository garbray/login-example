import React, { useEffect, useRef } from 'react';
import { useAppDispatch } from '../context';
import useFormik from '../hooks/useFormik';
import { validateLogin } from '../helpers';
import useDataApi from '../hooks/useDataApi';
import isEmpty from 'lodash.isempty';

const Login = () => {
  const dispatcher = useAppDispatch();
  const { data, error, doSend } = useDataApi();

  useEffect(() => {
    if (isEmpty(data)) {
      return;
    }
  }, [data]);

  useEffect(() => {
    if (isEmpty(error)) {
      return;
    }
  }, [error]);

  const submitForm = async values => {
    doSend('login', values);
  };

  const {
    handleSubmit,
    touched,
    errors,
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
    dispatcher.setContextValue({email: 'demo@tm.com'});
    dispatcher.goToScreen('email');
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="errorMessage">{error}</div>}
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
