import React from 'react';
import { Alert } from 'react-bootstrap';
import { i18nStrings } from './utils/i18n';

type ShorteningResultProps =
  | { state: 'init' }
  | { state: 'loading' }
  | {
      state: 'success';
      link: {
        originalLinkUrl: string;
        shortenedLinkUrl: string;
      };
    }
  | {
      state: 'error';
      error: {
        message: string;
      };
    };

export const ShorteningResult = (props: ShorteningResultProps): React.ReactElement => {
  if (props.state === 'init') {
    return <></>;
  }

  if (props.state === 'loading') {
    return <Alert variant="info">Loading...</Alert>;
  }

  if (props.state === 'error') {
    return <Alert variant="danger">Error!</Alert>;
  }

  const link = props.link;

  return (
    <Alert variant="info">
      <div>
        <strong>{i18nStrings.linkContainer.header.label}</strong>
      </div>
      <div>
        {i18nStrings.linkContainer.values.originalLink.label}
        <a href={link.originalLinkUrl} target="_blank" rel="noopener noreferrer">
          {link.originalLinkUrl}
        </a>
      </div>
      <div>
        {i18nStrings.linkContainer.values.shortenedLink.label}
        <a href={link.shortenedLinkUrl} target="_blank" rel="noopener noreferrer">
          {link.shortenedLinkUrl}
        </a>
      </div>
    </Alert>
  );
};
