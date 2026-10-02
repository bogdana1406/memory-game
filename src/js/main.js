import { createDeck } from './deck.js';
import { initializeGame } from './game.js';
import { createBoard, createHeader, createStats } from './ui.js';

const app = document.createElement('div');
app.classList.add('app');

const game = document.createElement('main');
game.classList.add('game');

const description = document.createElement('p');
description.classList.add('game__description');
description.textContent = 'Найдите все пары карточек';
description.setAttribute('aria-live', 'polite');

const deck = createDeck();
const board = createBoard(deck);
const stats = createStats();
const movesLabel = stats.querySelector('[data-stat-label="moves"]');
const movesOutput = stats.querySelector('[data-stat="moves"]');
const pairsOutput = stats.querySelector('[data-stat="pairs"]');

game.append(description, stats, board);
app.append(createHeader(), game);
document.body.append(app);

const handleWin = ({ moves, movesLabel: resultMovesLabel }) => {
  description.textContent = `Все пары найдены за ${moves} ${resultMovesLabel}!`;
};

initializeGame({
  board,
  movesLabel,
  movesOutput,
  onWin: handleWin,
  pairsOutput,
});
