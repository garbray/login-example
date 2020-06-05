import React from 'react';
import { GO_BACK } from '../context/actions';
import { useAppDispatch } from '../context';
import { sleep } from '../helpers';
import API from '../api';
import useFormik from '../hooks/useFormik';

const validate = () => {};

const ResetPasswordEmail = () => {
  const dispatch = useAppDispatch();
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
    dispatch({ type: GO_BACK });
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
      <button className="button" type="button" onClick={goBack}>
        back
      </button>
      <button className="button" disabled={isSubmitting}>
        submit
      </button>
    </form>
  );
};

export default ResetPasswordEmail;
