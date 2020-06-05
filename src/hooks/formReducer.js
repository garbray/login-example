import { setNestedObjectValues } from '../helpers';

export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
export const SET_FIELD_TOUCHED = 'SET_FIELD_TOUCHED';
export const SET_ERRORS = 'SET_ERRORS';
export const SUBMIT_ATTEMPT = 'SUBMIT_ATTEMPT';
export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';
export const SUBMIT_FAILURE = 'SUBMIT_FAILURE';

const getIsValid = payload => {
  return !(Object.keys(payload).length > 0);
};
// we can add aswell here our analytics data if is required
export const reducer = (state, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        isSubmitting: false,
        isValid: getIsValid(action.payload)
      };
    case SET_FIELD_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload
        }
      };
    case SET_FIELD_TOUCHED:
      return {
        ...state,
        touched: {
          ...state.touched,
          ...action.payload
        }
      };
    case SUBMIT_ATTEMPT:
      return {
        ...state,
        isSubmitting: true,
        touched: setNestedObjectValues(state.values, true)
      };
    case SUBMIT_SUCCESS:
      return {
        ...state,
        isSubmitting: false
      };
    case SUBMIT_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        submitError: action.payload,
        touched: setNestedObjectValues(state.values, true)
      };
    default:
      return state;
  }
};
