import * as yup from 'yup';
import { UID_LENGTH } from '../../../../core/utils/generateNewRandomLinkUid';

const linkUidRegex = new RegExp(`^[a-zA-Z0-9_-]{${UID_LENGTH}}$`);

export const linkUidValidator = yup
  .string()
  .defined('NOT_DEFINED')
  .length(UID_LENGTH, 'INVALID_LENGTH')
  .matches(linkUidRegex, 'INVALID_MATCH');
