import { FormModel } from '../../InputFormContext/InputFormContext.component';

export const createNewLink = async (formData: FormModel) => {
  const result = await fetch('/api/links', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!(result.headers.get('Content-Type') ?? '').includes('application/json')) {
    throw new Error();
  }

  if (result.status !== 201) {
    throw new Error();
  }

  const payload = await result.json();

  return payload as { linkUid: string };
};
