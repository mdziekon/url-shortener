import * as yup from 'yup';
import { i18nStrings } from './i18n';

export const validationSchema = yup.object({
  linkUrl: yup
    .string()
    .required(i18nStrings.validation.fields.linkUrl.required)
    .url(i18nStrings.validation.fields.linkUrl.url),
});
