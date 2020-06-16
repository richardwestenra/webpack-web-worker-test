import calculateGraph from './graph';

// block for `time` ms, then return the number of loops we could run in that time:
export function expensive(time) {
  let start = Date.now();
  let count = 0;
  while (Date.now() - start < time) {
    count++;
  }
  return count;
}

export function graph(state) {
  return JSON.stringify(
    calculateGraph(JSON.parse(state))
  );
}

export function noOp(input) {
  return input;
}
