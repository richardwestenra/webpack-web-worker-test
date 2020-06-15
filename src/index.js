import worker from './worker-setup';
import { expensive } from './worker';

const instance = worker();

// Make a new UI component
function component(type, text) {
  const element = document.createElement(type);
  element.innerHTML = text;
  return element;
}

// Single-threaded task
const syncButton = component('button', 'Single-threaded');
syncButton.addEventListener('click', () => {
  const count = expensive(1000);
  document.body.appendChild(component('h1', count));
});
document.body.appendChild(syncButton);

// Web-worker task
const workerButton = component('button', 'Web worker');
workerButton.addEventListener('click', () => {
  instance.expensive(1000).then(count => {
    document.body.appendChild(component('h1', count));
  });
});
document.body.appendChild(workerButton);

// Running count
const h1 = component('h1', '');
document.body.appendChild(h1);
setInterval(() => {
  h1.innerHTML = `Time: ${performance.now()}`;
}, 10);