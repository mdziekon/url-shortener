import React, { useCallback, useReducer } from 'react';
import { InputFormContainer } from './components/InputFormContainer/InputFormContainer.component';
import { ShorteningResult } from './components/ShorteningResult/ShorteningResult.component';
import { linkStateReducer } from './utils/linkState.reducer';

export const ShortenerForm = (): React.ReactElement => {
  const [linkState, dispatch] = useReducer(linkStateReducer, { state: 'init' });

  const onNewLinkCreationStarted = useCallback(() => {
    dispatch({
      type: 'EVENT_ONLOADING_START',
    });
  }, []);
  const onNewLinkCreationSuccess = useCallback<
    React.ComponentProps<typeof InputFormContainer>['onNewLinkCreationSuccess']
  >((data) => {
    dispatch({
      type: 'EVENT_ONSUCCESS',
      originalLinkUrl: data.originalLinkUrl,
      shortenedLinkUrl: data.shortenedLinkUrl,
    });
  }, []);
  const onNewLinkCreationError = useCallback(() => {
    dispatch({
      type: 'EVENT_ONERROR',
    });
  }, []);

  return (
    <div className="d-flex justify-content-center width-full">
      <div className="width-full">
        <div>
          <InputFormContainer
            onNewLinkCreationStarted={onNewLinkCreationStarted}
            onNewLinkCreationSuccess={onNewLinkCreationSuccess}
            onNewLinkCreationError={onNewLinkCreationError}
          />
        </div>
        <div style={{ minHeight: 200 }}>
          <ShorteningResult {...linkState} />
        </div>
      </div>
    </div>
  );
};
