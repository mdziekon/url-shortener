import React from 'react';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { useField } from 'formik';

interface FormControlWrapperOwnProps {
  name: string;
}

type FormControlWrapperBaseProps = FormControlWrapperOwnProps &
  Omit<React.ComponentProps<typeof FormControl>, 'children'>;

type FormControlWrapperProps = React.PropsWithChildren<FormControlWrapperBaseProps>;

export const FormControlWrapper = (props: FormControlWrapperProps): React.ReactElement => {
  const [inputProps, meta] = useField({
    name: props.name,
    type: props.type,
  });

  const { children, ...restProps } = props;

  return (
    <>
      <FormControl {...restProps} {...inputProps} isInvalid={meta.touched && Boolean(meta.error)} />
      {props.children}
      <Form.Control.Feedback type="invalid">{meta.touched && meta.error}</Form.Control.Feedback>
    </>
  );
};
