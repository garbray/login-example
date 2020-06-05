import React, { createContext, useReducer, useContext } from 'react';
import reducer from './reducer';
import useDispacher from './actions';

const initialState = {
  currentScreen: 'login',
  history: [],
  user: {
    email: ''
  },
  error: ''
};

const AppStateContext = createContext();
const AppDispatchContext = createContext();

let count = 0;
const AppProvider = ({ children }) => {
  console.log(count, 'provider');
  count += 1;
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={useDispacher(dispatch)}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a useAppProvider');
  }
  return context;
};

const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a useAppProvider');
  }
  return context;
};

export { AppProvider, useAppState, useAppDispatch };
