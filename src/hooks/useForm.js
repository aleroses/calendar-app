import { useEffect, useMemo, useState } from "react";

export const useForm = (
  initialForm = {},
  formValidations = {}
) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  // const { value, name, password } = formState;

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const handleInputChange = ({ target }) => {
    const { value, name } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      // xd = fn
      const [
        fn,
        errorMessage, //= "This field is required",
      ] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(
        formState[formField]
      )
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    handleInputChange,
    handleResetForm,
    ...formValidation,
    isFormValid,
  };
};
