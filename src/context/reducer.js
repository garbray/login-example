import { CHANGE_SCREEN, LOGIN_USER, UPDATE_CONTEXT, GO_BACK } from './actions';
import analytics from '../analytics';

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_SCREEN:
      analytics(`changed to screen ${action.payload.nextScreen}`);
      return {
        ...state,
        currentScreen: payload.nextScreen,
        history: [...state.history, state]
      };
    case GO_BACK:
      const { history } = state;
      const historyLen = history.length - 1;
      const previousState = history[historyLen];
      const newHistory = history.splice(historyLen - 1, 1);
      analytics(`goes back ${previousState.currentScreen}`);
      return {
        ...previousState,
        history: [...newHistory]
      };
    case LOGIN_USER:
      const { userEmail } = payload;
      return { ...state, userEmail: userEmail };
    case UPDATE_CONTEXT:
      analytics('UPDATE CONTEXT');
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default reducer;
