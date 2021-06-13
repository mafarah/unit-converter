
const but = document.getElementById('b');
const container = document.getElementById('popup-content');

const replaceMatches = node => {
  node.childNodes.forEach(c => {
    if (['SCRIPT'].includes(c.tagName)) return; 
    if (c.nodeType === Node.NODE_TEXT) {
      if (c.textContent.match(/\d+\W*sqft/)) {
        c.style.color = 'purple';
      }
    } else {
      replaceMatches(c);
    }
  });
};

but.onclick = () => {
  replaceMatches(document.body);
};
