import React from 'react';
import { GO_BACK } from '../context/actions';
import { useAppDispatch, useAppState } from '../context';
import { sleep, validateEmail } from '../helpers';
import API from '../api';
import useFormik from '../hooks/useFormik';



const ResetPasswordEmail = () => {
  const dispatch = useAppDispatch();
  const {email} = useAppState();

  const submitForm = async data => {
    const response = API('otpcode', data);
    await sleep(1000);
    if (response.status === 'error') {
      throw response.error;
    }
    return response;
  };

  const {
    handleSubmit,
    touched,
    errors,
    getFieldProps,
    isSubmitting,
    submitError
  } = useFormik({
    initialValues: {
      email: email
    },
    onSubmit: submitForm,
    validate: validateEmail
  });

  const goBack = event => {
    event.preventDefault();
    dispatch.goBack();
  };

  return (
    <form onSubmit={handleSubmit}>
      {submitError && <div className="error">{submitError}</div>}
      <label className="label" htmlFor="email">
        Email
      </label>
      <input
        className="input"
        placeholder={email}
        type="text"
        id="email"
        {...getFieldProps('email')}
      />
      {errors.email && touched.email && (
        <div className="error">{errors.email}</div>
      )}
      <div className="container">
      <button className="button" type="button" onClick={goBack}>
        back
      </button>
      <button className="button" disabled={isSubmitting}>
        submit
      </button>
      </div>
    </form>
  );
};

export default ResetPasswordEmail;
