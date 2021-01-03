export interface SuccessType<T> {
  isSuccess: true;
  payload: T;
}

export interface FailureType<T> {
  isSuccess: false;
  payload: T;
}

export const success = <T>(payload: T): SuccessType<T> => {
  return {
    isSuccess: true,
    payload,
  };
};

export const failure = <T>(payload: T): FailureType<T> => {
  return {
    isSuccess: false,
    payload,
  };
};
