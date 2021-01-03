import * as yup from 'yup';

export const linkUrlValidator = yup.string().defined('NOT_DEFINED').min(1, 'EMPTY_URL').url('INVALID_URL');
