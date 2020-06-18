// Turn a regular function into a promise
export const promisify = (fn, arg) => new Promise((resolve) => resolve(fn(arg)));

// Calculate time elapsed between worker call and return
export const getTime = () => {
  const start = Date.now();
  return () => Date.now() - start;
};