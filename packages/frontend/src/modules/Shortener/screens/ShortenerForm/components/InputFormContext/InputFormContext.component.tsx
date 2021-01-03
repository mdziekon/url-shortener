import { Formik } from 'formik';
import { useMemo } from 'react';
import { createInitFormValues } from './utils/form';
import { validationSchema } from './utils/validation';

interface InputFormContextProps {
  isFormDisabled?: boolean;

  onFormSubmit: (data: FormModel) => void;
}

export interface FormModel {
  linkUrl: string;
}

export const InputFormContext: React.FC<InputFormContextProps> = (props) => {
  const initialFormValues = useMemo((): FormModel => {
    return createInitFormValues();
  }, []);

  return (
    <Formik<FormModel>
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={props.onFormSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {props.children}
    </Formik>
  );
};
