import '../assets/styles.scss'

function traverseDOMAndMark(node, words) {
  const wordSet = new Set(words.map(word => word.toLowerCase())); // Convert to a set for easier lookup

  if (node.nodeType === Node.TEXT_NODE) {  // Text node
    for (let word of wordSet) {
      if (node.nodeValue.toLowerCase().includes(word)) {
        const parentElement = node.parentElement;
        if (parentElement) {
          parentElement.classList.add('marked-word');
        }
        break;
      }
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {  // Element node
    if (node.tagName === "SCRIPT") {
      return;
    }
    for (let child of node.childNodes) {
      traverseDOMAndMark(child, words);
    }

    if (!node.classList.contains('marked-word')) {  // If the element or its children aren't already marked
      for (let word of wordSet) {

        const directText = Array.from(node.childNodes)
          .filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent).join("");
        if (directText.toLowerCase().includes(word)) {
          node.classList.add('marked-word');
          break;
        }
      }
    }
  }
}
// List of words you want to search for
export const words = ['subjugate', 'mind twister', 'annihilate', 'backup copy', 'life stream', 'augencore', 'collateral damage', 'generator'];

traverseDOMAndMark(document.body, words);

const observer = new MutationObserver((mutationsList) => {
  for(let mutation of mutationsList) {
    if (
      mutation.type === 'childList' &&
      mutation.addedNodes.length > 0
      && mutation.addedNodes[0].nodeType === Node.ELEMENT_NODE
    ) {
      traverseDOMAndMark(mutation.addedNodes[0], words);
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });