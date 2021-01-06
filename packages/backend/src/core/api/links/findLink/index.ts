import { NonEmptyArray } from '../../../../common/types/arrays';
import { SuccessType, FailureType, failure, success } from '../../../../common/utils/result';
import { CoreContext } from '../../../context';
import { Link } from '../../../entities/Link';

interface FindLinkInput {
  linkUid: string;
}

type FindLinkErrorTypes = { code: 'UNKNOWN_ERROR' } | { code: 'LINK_NOT_FOUND' };
type FindLinkSuccessType = SuccessType<{ link: Link }>;
type FindLinkFailureType = FailureType<{
  errors: NonEmptyArray<FindLinkErrorTypes>;
}>;

export const findLink = async (params: {
  ctx: CoreContext;
  input: FindLinkInput;
}): Promise<FindLinkSuccessType | FindLinkFailureType> => {
  const { ctx, input } = params;
  const {
    components: { persistence },
  } = ctx;

  const requestCtx = {};

  const findLinkResult = await persistence.links.findLinkByLinkUid({
    linkUid: input.linkUid,
    requestCtx,
  });

  if (!findLinkResult.isSuccess) {
    return failure({
      errors: [{ code: 'UNKNOWN_ERROR' }],
    });
  }
  if (!findLinkResult.payload.entity) {
    return failure({
      errors: [{ code: 'LINK_NOT_FOUND' }],
    });
  }

  const foundLink = findLinkResult.payload.entity;

  return success({
    link: foundLink,
  });
};
