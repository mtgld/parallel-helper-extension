import '../assets/styles.scss'
import { adjustPopupPosition, getCardHTML, getImmediateText } from '~contents/utils';
import { cardsMap } from '~contents/fetchCards';

const popup = document.createElement('div');
popup.classList.add('card-popup');
popup.tabIndex = -1;

document.body.appendChild(popup);

let hoveredElement = null;

document.addEventListener('keydown', (event) => {
  if (event.key === 'Shift') {
    const immediateText = getImmediateText(hoveredElement);
    for (const cardName of cardsMap.keys()) {
      const regex = new RegExp(cardName, 'i');
      const match = immediateText.match(regex);
      if (match !== null) {
        void showPopup({ target: hoveredElement }, match[0].toLowerCase());
      }
    }
  }
});

popup.addEventListener('blur', hidePopup);

async function showPopup({ target }, name) {
  const card = cardsMap.get(name);
  if (card) {
    popup.style.display = 'block';

    popup.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${card.media.image})`
    popup.innerHTML = getCardHTML(card) ;
    popup.style.display = 'block';

    adjustPopupPosition(target, popup);

    popup.focus();
  }
}

document.addEventListener('mousemove', (event) => {
  hoveredElement = event.target;
});

function hidePopup(event) {
  const link = document.getElementById('link')
  if (event.relatedTarget !== link) {
    popup.style.display = 'none';
  }
}