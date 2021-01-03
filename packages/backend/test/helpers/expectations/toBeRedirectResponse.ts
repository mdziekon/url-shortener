export const expectRedirectResponse = (response: any, expectations: { statusCode?: number; locationMatcher: any }) => {
  expect(response).toBeDefined();

  expect(response.statusCode).toBeGreaterThanOrEqual(300);
  expect(response.statusCode).toBeLessThan(400);
  expect(response.headers.location).toBeTruthy();

  expect(response.headers).toMatchObject({
    location: expectations.locationMatcher,
  });
};
