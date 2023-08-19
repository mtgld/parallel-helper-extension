import '../assets/styles.scss'
import { getCardInfo } from '~contents/query';
import { words } from '~contents/marking';

const cards = {}

const popup = document.createElement('div');
popup.classList.add('text-hover-popup');
popup.tabIndex = -1;  // This makes it focusable,
let isShiftPressed = false;

let hoveredElement = null;

function adjustPopupPosition(target, popup) {
  const rect = target.getBoundingClientRect();
  const popupWidth = 200;  // As specified in your updated CSS
  const popupHeight = 250; // As specified in your updated CSS

  // Vertical Adjustment
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;

  if (spaceBelow < popupHeight) { // not enough space below
    if (spaceAbove > spaceBelow) { // more space above than below
      // Position the popup above the target
      popup.style.top = `${rect.top - popupHeight + window.scrollY}px`;
    }
  } else {
    // Position the popup below the target
    popup.style.top = `${rect.bottom + window.scrollY}px`;
  }

  // Horizontal adjustment to center
  const centeredLeftPosition = rect.left + (rect.width / 2) - (popupWidth / 2);

  if (centeredLeftPosition < 0) {
    popup.style.left = '0px';
  } else if (centeredLeftPosition + popupWidth > window.innerWidth) {
    popup.style.left = `${window.innerWidth - popupWidth}px`;
  } else {
    popup.style.left = `${centeredLeftPosition}px`;
  }
}

document.body.appendChild(popup);

(async () => {
  for (const word of words) {
    cards[word.toLowerCase()] = await getCardInfo(word)
  }
})()

// Update the state of the Shift key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Shift') {
    isShiftPressed = true;
    if (hoveredElement && (hoveredElement.classList.contains('marked-word') || hoveredElement.closest('.marked-word'))) {
      showPopup({ target: hoveredElement });
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'Shift') {
    isShiftPressed = false;
  }
});

// When the popup loses focus, hide it
popup.addEventListener('blur', hidePopup);

// Function to show the popup
async function showPopup(event) {
  if (!isShiftPressed) return; // Exit early if Shift is not pressed

  const target = event.target;
  if (target.classList.contains('marked-word') || target.closest('.marked-word')) {
    popup.style.display = 'block';
    popup.textContent = 'Loading...';

    // 2. Position the popup
    adjustPopupPosition(target, popup);

    let card;
    if (cards[target.innerText.toLowerCase()]) {
      card = cards[target.innerText.toLowerCase()];
    } else {
      card = await getCardInfo(target.innerText);
      cards[target.innerText.toLowerCase()] = card;
    }

    popup.innerHTML = `
      Name: ${card.name} <br>
      Card Type: ${card.gameData.cardType} <br>
      Subtype: ${card.gameData.subtype || 'none'} <br>
      Cost: ${card.gameData.cost} <br>
      Attack: ${card.gameData.attack} <br>
      Health: ${card.gameData.health} <br>
      Function: ${card.gameData.functionText} <br>
      <img src="${card.media.image}" alt="${card.name}" />
    `;

    adjustPopupPosition(target, popup);

    popup.focus();  // Focus the popup so it can receive the blur event
  }
}

// Update the hoveredElement when moving the mouse
document.addEventListener('mousemove', (event) => {
  hoveredElement = event.target;
});

function hidePopup() {
  popup.style.display = 'none';
}

document.addEventListener('mouseover', showPopup);