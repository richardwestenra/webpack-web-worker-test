import { mockState } from '@quantumblack/kedro-viz/lib/utils/state.mock';
import { getVisibleNodes } from '@quantumblack/kedro-viz/lib/selectors/nodes';
import { getVisibleEdges } from '@quantumblack/kedro-viz/lib/selectors/edges';
import worker from './worker-setup';
import { expensive, graph, noOp } from './worker';

const TIME = 1000;
const state = {
  nodes: getVisibleNodes(mockState.lorem),
  edges: getVisibleEdges(mockState.lorem),
};
const payload = JSON.stringify(state);

console.time('worker setup');
const instance = worker();
console.timeEnd('worker setup');

// Make a new UI component
function getComponent(type, text) {
  const element = document.createElement(type);
  element.innerHTML = text;
  return element;
}

// Turn a regular function into a promise
const promisify = (fn, arg) => new Promise((resolve) => resolve(fn(arg)));

const append = (name, value, time) => {
  document.body.appendChild(getComponent('p', `${time} ${name}: ${value}`));
};


// Single-threaded tasks
const syncButton = getComponent('button', 'Single-threaded');
syncButton.addEventListener('click', () => {
  const start = Date.now();
  const getTime = () => `Time: ${Date.now() - start}.`

  promisify(expensive, TIME).then((count) => {
    append('expensive', count, getTime());
  });

  promisify(graph, payload).then((response) => {
    append('graph', response.length, getTime());
  });

  promisify(noOp, payload).then((response) => {
    append('noOp', response.length, getTime());
  });
});
document.body.appendChild(syncButton);


// Web-worker tasks
const workerButton = getComponent('button', 'Web worker');
workerButton.addEventListener('click', () => {
  const start = Date.now();
  const getTime = () => `Time: ${Date.now() - start}.`

  instance.expensive(TIME).then((count) => {
    append('expensive', count, getTime());
  });

  instance.graph(payload).then((response) => {
    append('graph', response.length, getTime());
  });

  instance.noOp(payload).then((response) => {
    append('noOp', response.length, getTime());
  });
});
document.body.appendChild(workerButton);

// Running count
const h1 = getComponent('h1', '');
document.body.appendChild(h1);
setInterval(() => {
  h1.innerHTML = `Time elapsed: ${performance.now()}`;
}, 10);