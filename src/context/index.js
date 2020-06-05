import React, { createContext, useReducer, useContext, useRef, useCallback, memo, useMemo } from 'react';
import reducer from './reducer';
import fnDispatcher from './actions';

const initialState = {
  currentScreen: 'login',
  history: [],
  error: '',
  email: ''
};

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatcher = useMemo(() => { return fnDispatcher(dispatch)}, [dispatch]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatcher}>
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
