let table;

// Make a new UI component
export const appendComponent = (type, text, parent = document.body) => {
  const element = document.createElement(type);
  element.innerHTML = text;
  parent.appendChild(element);
  return element;
};

// Add table tow
export const addTableRow = (type, name, value, element = 'td') => {
  const tr = appendComponent('tr', null, table);
  appendComponent('tr', null, table);
  appendComponent(element, type, tr);
  appendComponent(element, name, tr);
  appendComponent(element, value, tr);
};

// Add synchronous timer to show when events are blocking the main thread
export const addTimer = () => {
  // Add synchronous running counter
  const h1 = appendComponent('h1', '');
  setInterval(() => {
    h1.innerHTML = `Time elapsed: ${performance.now()}`;
  }, 10);
  return h1;
};

// Add results table
export const addTable = () => {
  table = appendComponent('table', null);
  table.setAttribute('width', '400');
  table.setAttribute('rules', 'rows');
  table.setAttribute('cellpadding', '5');
  addTableRow('Request type', 'Function', 'Time elapsed', 'th');
  return table;
};