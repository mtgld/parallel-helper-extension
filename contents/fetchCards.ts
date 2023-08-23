import '../assets/styles.scss'
import { getAllCards } from '~contents/queries';

export const cardsMap = new Map();
(async () => {
  const cards = await getAllCards();
  for (const card of cards) {
    cardsMap.set(card.name.toLowerCase(), card);
  }
})()