import { useReducer, useEffect, useCallback } from 'react';
import {
  reducer,
  SET_ERRORS,
  SET_FIELD_VALUE,
  SET_FIELD_TOUCHED,
  SUBMIT_ATTEMPT,
  SUBMIT_FAILURE,
  SUBMIT_SUCCESS
} from './formReducer';

const useFormik = props => {
  if (!props.onSubmit) {
    throw new Error('you forgot to pass onSubmit');
  }

  const [state, dispatch] = useReducer(reducer, {
    values: props.initialValues,
    errors: {},
    touched: {},
    isValid: false,
    isSubmitting: false
  });

  const validate = useCallback(props.validate);
  const onSubmit = useCallback(props.onSubmit);

  useEffect(() => {
    if (validate) {
      const errors = validate(state.values);
      dispatch({ type: SET_ERRORS, payload: errors });
    }
  }, [state.values]);

  const handleChange = fieldName => event => {
    event.persist();
    dispatch({
      type: SET_FIELD_VALUE,
      payload: { [fieldName]: event.target.value }
    });
  };

  const handleBlur = fieldName => event => {
    dispatch({
      type: SET_FIELD_TOUCHED,
      payload: { [fieldName]: true }
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch({ type: SUBMIT_ATTEMPT });

    const errors = validate(state.values);
    if (!Object.keys(errors).length) {
      try {
        await onSubmit(state.values);
        dispatch({ type: SUBMIT_SUCCESS });
      } catch (error) {
        dispatch({ type: SUBMIT_FAILURE, payload: error });
      }
    } else {
      dispatch({ type: SET_ERRORS, payload: errors });
    }
  };

  const getFieldProps = fieldName => ({
    value: state[fieldName],
    onChange: handleChange(fieldName),
    onBlur: handleBlur(fieldName)
  });

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    getFieldProps,
    ...state
  };
};

export default useFormik;
