import React from 'react';
import { useAppDispatch } from '../context';
import { CHANGE_SCREEN } from '../context/actions';

const Welcome = () => {
  const dispatch = useAppDispatch();
  const logOut = event => {
    event.preventDefault();
    dispatch({ type: CHANGE_SCREEN, payload: { nextScreen: 'login' } });
  };
  return (
    <div>
      <h1>Welcome</h1>
      <a href="/" onClick={logOut}>
        logout
      </a>
    </div>
  );
};

export default Welcome;
