import React from 'react';
import useFormik from '../hooks/useFormik';
import { sleep } from '../helpers';
import API from '../api';
import { useAppDispatch } from '../context';
import { GO_BACK } from '../context/actions';

const validate = values => {
  let errors = {};

  if (values.otpCode.length < 6) {
    errors.otpCode = 'your opt code should have at least 6 characters';
  }

  if (values.otpCode.length > 6) {
    errors.otpCode = 'your opt code should have 6 characters';
  }
  return errors;
};

const Reset = () => {
  const useDispatch = useAppDispatch();

  const submitForm = async data => {
    const response = API('otpcode', data);
    await sleep(1000);
    console.log(response);
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
      otpCode: ''
    },
    onSubmit: submitForm,
    validate
  });

  const goBack = event => {
    event.preventDefault();
    useDispatch.goBack();
  };

  return (
    <form onSubmit={handleSubmit}>
      {submitError && <div className="error">{submitError}</div>}
      <label className="label" htmlFor="otp">
        Code
      </label>
      <input
        className="input"
        placeholder="otp code"
        type="number"
        id="otp"
        {...getFieldProps('otpCode')}
      />
      {errors.otpCode && touched.otpCode && (
        <div className="error">{errors.otpCode}</div>
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

export default Reset;
