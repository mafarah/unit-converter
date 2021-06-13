let resultsContainer;

const table = {
  sqft: { fn: a => a * 0.09290304, unit: 'm2' },
}

const convert = ({ num, unit }) => {
  const conv = table[unit];
  if (!conv) return;

  return `${parseFloat(conv.fn(num)).toFixed(2)} ${conv.unit}`;
};

const parse = text => {
  const num = text.replace(/\D*/g, '');
  const unit = text.replace(/[\d\W]*/g, '');
  if (!num || !unit) return;
  return { num, unit };
};

const showResults = (selection, converted) => {
  const rect = selection.getRangeAt(0).getBoundingClientRect();
  const right = rect.right + 10;
  const top = rect.top + rect.height / 2 + 10;
  if (!resultsContainer) {
    resultsContainer = document.createElement('div');
    document.body.appendChild(resultsContainer);
  }
  resultsContainer.setAttribute(
    'style', `
    background-color: #272822;
    color: #f8f8f2;
    width: auto;
    padding: 1rem;
    position: fixed;
    top: ${top}px;
    left: ${right}px;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    `
  );
  resultsContainer.textContent = converted;
};

const convertSelection = () => {
  const selection = window.getSelection();
  if (!selection) return;

  const parsed = parse(selection.toString());
  if (!parsed) return;

  const converted = convert(parsed);
  if (!converted) return;

  showResults(selection, converted);
};

document.body.addEventListener('mouseup', convertSelection);
