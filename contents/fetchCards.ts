import { getAllCards } from '~contents/queries';
import { Storage } from "@plasmohq/storage"

const storage = new Storage();
export const cardsMap = new Map();

storage.watch({
  "toggle": async (c) => {
    if (Boolean(Number(c.newValue)) && cardsMap.size == 0) {
      const cards = await getAllCards();
      for (const card of cards) {
        cardsMap.set(card.name.toLowerCase(), card);
      }
    }
  },
});

(async () => {
  const toggle = Boolean(Number(await storage.get('toggle')));
  if (cardsMap.size == 0 && toggle) {
    const cards = await getAllCards();
    for (const card of cards) {
      cardsMap.set(card.name.toLowerCase(), card);
    }
  }
})()