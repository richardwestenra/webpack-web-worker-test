import { mockState } from '@quantumblack/kedro-viz/lib/utils/state.mock';
import { getVisibleNodes } from '@quantumblack/kedro-viz/lib/selectors/nodes';
import { getVisibleEdges } from '@quantumblack/kedro-viz/lib/selectors/edges';
import worker from './worker-setup';
import * as workerTasks from './worker';

const TIME = 1000;
const state = {
  nodes: getVisibleNodes(mockState.lorem),
  edges: getVisibleEdges(mockState.lorem),
};
const payload = JSON.stringify(state);
const taskPayloads = {
  expensive: TIME,
  graph: payload,
  noOp: payload,
};

// Test a task
const runTest = (name, tasks) => {
  const timer = getTime();
  promisify(tasks[name], taskPayloads[name]).then((response) => {
    appendComponent('p', `${name}: ${timer()}ms`);
    console.log(name, JSON.parse(response));
  });
};

// Turn a regular function into a promise
const promisify = (fn, arg) => new Promise((resolve) => resolve(fn(arg)));

// Make a new UI component
const appendComponent = (type, text, parent = document.body) => {
  const element = document.createElement(type);
  element.innerHTML = text;
  document.body.appendChild(element);
  return element;
}

// Calculate time elapsed between worker call and return
const getTime = () => {
  const start = Date.now();
  return () => Date.now() - start;
};

// Initialise worker and time how long it takes
console.time('worker setup');
const instance = worker();
console.timeEnd('worker setup');

// Run test tasks in regular single-threaded JS
appendComponent('button', 'Single-threaded')
  .addEventListener('click', () => {
    runTest('expensive', workerTasks);
    runTest('graph', workerTasks);
    runTest('noOp', workerTasks);
  });

// Run test tasks with a web-worker
appendComponent('button', 'Web worker')
  .addEventListener('click', () => {
    runTest('expensive', instance);
    runTest('graph', instance);
    runTest('noOp', instance);
  });

// Add synchronous running counter
const h1 = appendComponent('h1', '');
setInterval(() => {
  h1.innerHTML = `Time elapsed: ${performance.now()}`;
}, 10);