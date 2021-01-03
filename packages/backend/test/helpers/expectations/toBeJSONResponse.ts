type ToMatchObjectType = jest.Matchers<void, any>['toMatchObject'];

export const expectJSONResponse = (
  response: any,
  expectations: { statusCode: number; bodyMatch: Parameters<ToMatchObjectType>[0] },
) => {
  expect(response).toBeDefined();

  const readResponseJSON = () => {
    return JSON.parse(response.body);
  };

  expect(response.statusCode).toEqual(expectations.statusCode);
  expect(readResponseJSON).not.toThrow();
  expect(readResponseJSON()).toMatchObject(expectations.bodyMatch);
};
