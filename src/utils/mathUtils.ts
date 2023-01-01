export const range = <T>(n: number, fn: (n: number) => T) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(fn(i + 1));
  }
  return result;
};

// TODO fix any
export const chooseRandomly = <T>(items: T[]) => {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
};
