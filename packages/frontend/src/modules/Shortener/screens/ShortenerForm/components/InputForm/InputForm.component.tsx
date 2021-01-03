import React from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { Form as FormikForm } from 'formik';
import { i18nStrings } from './utils/i18n';
import { FormControlWrapper } from '../../../../../../common/components/FormControlWrapper/FormControlWrapper.component';

interface InputFormProps {
  isFormDisabled?: boolean;
}

export const InputForm = (props: InputFormProps): React.ReactElement => {
  return (
    <Form className="width-full" as={FormikForm}>
      <Form.Group>
        <Form.Label>{i18nStrings.form.inputs.linkUrl.label}</Form.Label>
        <InputGroup className="mb-3 width-full" size="lg">
          <FormControlWrapper
            name="linkUrl"
            type="text"
            placeholder={i18nStrings.form.inputs.linkUrl.placeholder}
            aria-label={i18nStrings.form.inputs.linkUrl.label}
            aria-describedby="basic-addon2"
            disabled={props.isFormDisabled}
          >
            <InputGroup.Append>
              <Button variant="primary" disabled={props.isFormDisabled} type="submit">
                {i18nStrings.form.actions.submitBtn.label}
              </Button>
            </InputGroup.Append>
          </FormControlWrapper>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};
