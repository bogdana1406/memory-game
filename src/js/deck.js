import { technologies } from './data.js';

const shuffle = (cards) => {
  const shuffledCards = [...cards];

  for (let index = shuffledCards.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffledCards[index], shuffledCards[randomIndex]] = [
      shuffledCards[randomIndex],
      shuffledCards[index],
    ];
  }

  return shuffledCards;
};

export const createDeck = () => {
  const pairs = technologies.flatMap(({ id, name, icon }) =>
    Array.from({ length: 2 }, (_, copyIndex) => ({
      cardId: `${id}-${copyIndex + 1}`,
      technologyId: id,
      name,
      icon,
    })),
  );

  return shuffle(pairs);
};
