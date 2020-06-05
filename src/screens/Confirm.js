import React from 'react';
import { useAppDispatch } from '../context';
import { sleep } from '../helpers';
import useFormik from '../hooks/useFormik';
import { CHANGE_SCREEN } from '../context/actions';

const Confirm = () => {
  const dispatch = useAppDispatch();

  const submitForm = async () => {
    await sleep(2000);
    dispatch({ type: CHANGE_SCREEN, payload: { nextScreen: 'login' } });
    return 'success message';
  };

  const { handleSubmit, isSubmitting } = useFormik({ onSubmit: submitForm });
  return (
    <form onSubmit={handleSubmit}>
      <h2>We have send you a new password to youremail</h2>
      <button className="button" disabled={isSubmitting}>
        signIn
      </button>
    </form>
  );
};

export default Confirm;
