export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const delayApi = (ms?: number) => {
  return delay(Math.random() * 500);
};
