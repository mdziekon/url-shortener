import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import { InputForm } from '../InputForm/InputForm.component';
import { FormModel, InputFormContext } from '../InputFormContext/InputFormContext.component';
import { createNewLink } from './utils/requests';

interface NewLinkData {
  originalLinkUrl: string;
  shortenedLinkUrl: string;
}

interface InputFormContainerProps {
  onNewLinkCreationStarted: () => void;
  onNewLinkCreationSuccess: (data: NewLinkData) => void;
  onNewLinkCreationError: () => void;
}

const normalizeFormModel = (formData: FormModel) => {
  // Note: Nothing to normalize
  return formData;
};

export const InputFormContainer = (props: InputFormContainerProps): React.ReactElement => {
  const onCreateNewLinkSuccess = useCallback((result: { linkUid: string }, variables: FormModel) => {
    const currentHost = window.location.origin;

    props.onNewLinkCreationSuccess({
      originalLinkUrl: variables.linkUrl,
      shortenedLinkUrl: `${currentHost}/${result.linkUid}`,
    });
  }, []);

  const { mutate: sendCreateNewLink, status } = useMutation(createNewLink, {
    mutationKey: 'CREATE_NEW_LINK',
    onSuccess: onCreateNewLinkSuccess,
    onError: props.onNewLinkCreationError,
  });

  const handleFormSubmit = useCallback(async (formData: FormModel) => {
    props.onNewLinkCreationStarted();

    const normalizedFormData = normalizeFormModel(formData);

    await sendCreateNewLink(normalizedFormData);
  }, []);

  const isFormSubmissionRequestInProgress = status === 'loading';
  const isFormLocked = isFormSubmissionRequestInProgress;

  return (
    <InputFormContext isFormDisabled={isFormLocked} onFormSubmit={handleFormSubmit}>
      <InputForm isFormDisabled={isFormLocked} />
    </InputFormContext>
  );
};
