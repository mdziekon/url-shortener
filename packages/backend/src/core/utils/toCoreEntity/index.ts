import { isLeft } from 'fp-ts/lib/Either';
import { Decoder } from 'io-ts';
import { NonEmptyArray } from '../../../common/types/arrays';
import { failure, FailureType, success, SuccessType } from '../../../common/utils/result';

type ErrorTypes = { code: 'DECODE_ERROR' };
type ToCoreEntitySuccessType<T> = SuccessType<{ output: T }>;
type ToCoreEntityFailureType = FailureType<{
  errors: NonEmptyArray<ErrorTypes>;
}>;

export function createEntityDecoder<T>(codec: Decoder<unknown, T>) {
  const toCoreEntity = (input: unknown): ToCoreEntitySuccessType<T> | ToCoreEntityFailureType => {
    const decodingResult = codec.decode(input);

    if (isLeft(decodingResult)) {
      return failure({
        errors: [{ code: 'DECODE_ERROR' }],
      });
    }

    return success({
      output: decodingResult.right,
    });
  };

  return toCoreEntity;
}
