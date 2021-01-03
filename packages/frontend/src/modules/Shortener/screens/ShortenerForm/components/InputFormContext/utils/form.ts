export interface FormModel {
  linkUrl: string;
}

export const createInitFormValues = (): FormModel => {
  return {
    linkUrl: '',
  };
};
