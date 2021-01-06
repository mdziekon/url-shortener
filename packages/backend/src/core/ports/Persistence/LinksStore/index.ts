import { NonEmptyArray } from '../../../../common/types/arrays';
import { SuccessType, FailureType } from '../../../../common/utils/result';
import { Link } from '../../../entities/Link';

type FindLinkByLinkUidInputParams = {
  linkUid: string;
  requestCtx: Record<string, unknown>;
};
type FindLinkByLinkUidErrorType = { code: 'UNKNOWN_ERROR' };
type FindLinkByLinkUidSuccessType = SuccessType<{ entity?: Link }>;
type FindLinkByLinkUidFailureType = FailureType<{
  errors: NonEmptyArray<FindLinkByLinkUidErrorType>;
}>;

type AddLinkInputParams = {
  linkUid: string;
  linkUrl: string;
  requestCtx: Record<string, unknown>;
};
type AddLinkErrorType = { code: 'UNKNOWN_ERROR' };
type AddLinkSuccessType = SuccessType<unknown>;
type AddLinkFailureType = FailureType<{ errors: NonEmptyArray<AddLinkErrorType> }>;

export interface LinksStore {
  findLinkByLinkUid: (
    params: FindLinkByLinkUidInputParams,
  ) => Promise<FindLinkByLinkUidSuccessType | FindLinkByLinkUidFailureType>;

  addLink: (params: AddLinkInputParams) => Promise<AddLinkSuccessType | AddLinkFailureType>;
}
