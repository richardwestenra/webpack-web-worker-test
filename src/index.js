import { mockState } from '@quantumblack/kedro-viz/lib/utils/state.mock';
import { getVisibleNodes } from '@quantumblack/kedro-viz/lib/selectors/nodes';
import { getVisibleEdges } from '@quantumblack/kedro-viz/lib/selectors/edges';
import * as workerTasks from './worker';
import worker from './worker-setup';
import { promisify, getTime } from './utils';
import { appendComponent, addTableRow, addTimer, addTable } from './dom';

// Initialise worker and time how long it takes
console.time('worker setup');
const instance = worker();
console.timeEnd('worker setup');

const TIME = 1000;
const state = {
  nodes: getVisibleNodes(mockState.lorem),
  edges: getVisibleEdges(mockState.lorem),
};
const payload = JSON.stringify(state);
const taskFn = {
  regular: workerTasks,
  worker: instance
};
const taskPayloads = {
  expensive: TIME,
  graph: payload,
  noOp: payload,
};

// Test a task
const runTest = async (taskType, name) => {
  const test = taskFn[taskType][name];
  const timer = getTime();
  const response = await promisify(test, taskPayloads[name]);
  addTableRow(taskType, name, timer());
  console.log(name, JSON.parse(response));
};

// Run test tasks in regular single-threaded JS
appendComponent('button', 'Single-threaded')
  .addEventListener('click', () => {
    runTest('regular', 'expensive');
    runTest('regular', 'graph');
    runTest('regular', 'noOp');
  });

// Run test tasks with a web-worker
appendComponent('button', 'Web worker')
  .addEventListener('click', () => {
    runTest('worker', 'expensive');
    runTest('worker', 'graph');
    runTest('worker', 'noOp');
  });

addTimer();
addTable();