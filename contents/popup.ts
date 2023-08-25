import '~assets/card-popup.scss';
import { adjustPopupPosition, getCardHTML, getImmediateText, isDescendant } from '~contents/utils';
import { cardsMap } from '~contents/fetchCards';
import { Storage } from "@plasmohq/storage"

const storage = new Storage();

let toggleValue = true;
(async () => {
  const result = await storage.get("toggle")
  if (result == undefined) {
    await storage.set("toggle", "1")
  }
  toggleValue = Boolean(Number(await storage.get("toggle")));
})()

storage.watch({
  "toggle": (c) => {
    toggleValue = Boolean(Number(c.newValue))
  },
})

const popup = document.createElement('div');
popup.classList.add('card-popup');
popup.tabIndex = -1;

document.body.appendChild(popup);

let hoveredElement = null;
let shiftPressed = false; // Flag to track if shift key is pressed

document.addEventListener('keydown', (event) => {
  if (event.key === 'Shift') {
    shiftPressed = true;
    checkAndShowPopup(hoveredElement);
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'Shift') {
    shiftPressed = false;
  }
});

popup.addEventListener('blur', hidePopup);

async function showPopup({ target }, name) {
  const card = cardsMap.get(name);
  if (card) {
    popup.style.display = 'block';
    popup.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${card.media.image})`;
    popup.innerHTML = getCardHTML(card);
    adjustPopupPosition(target, popup);
    popup.focus();
  }
}

document.addEventListener('mousemove', (event) => {
  hoveredElement = event.target;
  if (shiftPressed) {
    checkAndShowPopup(hoveredElement);
  }
});

function checkAndShowPopup(element) {
  if (!toggleValue) return;
  if (element === popup || isDescendant(popup, element)) return;

  const immediateText = getImmediateText(element);
  for (const cardName of cardsMap.keys()) {
    const regex = new RegExp(cardName, 'i');
    const match = immediateText.match(regex);
    if (match !== null) {
      void showPopup({ target: hoveredElement }, match[0].toLowerCase());
    }
  }
}

function hidePopup(event) {
  const link = document.getElementById('link');
  if (event.relatedTarget !== link) {
    popup.style.display = 'none';
  }
}
