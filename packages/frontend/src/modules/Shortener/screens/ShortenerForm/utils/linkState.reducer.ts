import { ShorteningResult } from '../components/ShorteningResult/ShorteningResult.component';

type LinkStateChangeAction =
  | {
      type: 'EVENT_ONERROR';
    }
  | {
      type: 'EVENT_ONSUCCESS';
      originalLinkUrl: string;
      shortenedLinkUrl: string;
    }
  | {
      type: 'EVENT_ONLOADING_START';
    };

export const linkStateReducer = (
  state: React.ComponentProps<typeof ShorteningResult>,
  action: LinkStateChangeAction,
): React.ComponentProps<typeof ShorteningResult> => {
  switch (action.type) {
    case 'EVENT_ONERROR':
      return {
        ...state,
        state: 'error',
        error: {
          message: '',
        },
      };
    case 'EVENT_ONLOADING_START':
      return {
        ...state,
        state: 'loading',
      };
    case 'EVENT_ONSUCCESS':
      return {
        ...state,
        state: 'success',
        link: {
          originalLinkUrl: action.originalLinkUrl,
          shortenedLinkUrl: action.shortenedLinkUrl,
        },
      };
  }

  return state;
};
