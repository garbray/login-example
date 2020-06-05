export const CHANGE_SCREEN = 'CHANGE_SCREEN';
export const LOGIN_USER = 'LOGIN_USER';
export const UPDATE_CONTEXT = 'UPDATE_CONTEXT';
export const GO_BACK = 'GO_BACK';

const dispatcher = dispatch => {
  console.log('update')
  const goToScreen = newScreen => {
    dispatch({ type: CHANGE_SCREEN, payload: { nextScreen: newScreen } });
  };

  const loginUser = (nextScreen, userEmail) => {
    dispatch({ type: LOGIN_USER, payload: { nextScreen, userEmail } });
  };

  const goBack = () => {
    dispatch({ type: GO_BACK });
  };

  const setContextValue = (values) => {
    dispatch({type: UPDATE_CONTEXT, payload: { ...values }});
  };

  return {
    goToScreen,
    loginUser,
    goBack,
    setContextValue
  };
};

export default dispatcher;
