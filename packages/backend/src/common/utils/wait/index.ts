export const wait = async (timeMs: number) => {
  const waitPromise = new Promise((resolve) => {
    setTimeout(resolve, timeMs);
  });

  return waitPromise;
};
