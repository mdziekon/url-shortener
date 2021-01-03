import { NonEmptyArray } from '../../../../common/types/arrays';
import { SuccessType, FailureType, failure, success } from '../../../../common/utils/result';
import { CoreContext } from '../../../context';
import { Link } from '../../../entities/Link';
import { generateNewRandomLinkUid } from '../../../utils/generateNewRandomLinkUid';

interface CreateNewLinkInput {
  linkUrl: string;
}

type CreateNewLinkErrorTypes = { code: 'UNKNOWN_ERROR' } | { code: 'CREATION_ERROR' };
type CreateNewLinkSuccessType = SuccessType<{ newLink: Link }>;
type CreateNewLinkFailureType = FailureType<{
  errors: NonEmptyArray<CreateNewLinkErrorTypes>;
}>;

export const createNewLink = async (params: {
  ctx: CoreContext;
  input: CreateNewLinkInput;
}): Promise<CreateNewLinkSuccessType | CreateNewLinkFailureType> => {
  const { ctx, input } = params;
  const {
    components: { persistence },
  } = ctx;

  const newLinkUidResult = await generateNewRandomLinkUid();

  if (!newLinkUidResult.isSuccess) {
    return failure({
      errors: [{ code: 'CREATION_ERROR' }],
    });
  }

  const newLinkUid = newLinkUidResult.payload.value;

  const findDuplicateResult = await persistence.links.findLinkByLinkUid({
    linkUid: newLinkUid,
  });

  if (findDuplicateResult.isSuccess && findDuplicateResult.payload.entity) {
    return failure({
      errors: [{ code: 'CREATION_ERROR' }],
    });
  }

  const addLinkResult = await persistence.links.addLink({
    linkUid: newLinkUid,
    linkUrl: input.linkUrl,
  });

  if (!addLinkResult.isSuccess) {
    return failure({
      errors: [{ code: 'CREATION_ERROR' }],
    });
  }

  return success({
    newLink: {
      linkUid: newLinkUid,
      linkUrl: input.linkUrl,
    },
  });
};
