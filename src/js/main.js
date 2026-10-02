import { createDeck } from './deck.js';
import { initializeGame } from './game.js';
import { createModal } from './modal.js';
import { getResults, saveResult } from './storage.js';
import {
  createBoard,
  createHeader,
  createLeaderboardContent,
  createStats,
  createVictoryContent,
} from './ui.js';

const app = document.createElement('div');
app.classList.add('app');

const game = document.createElement('main');
game.classList.add('game');

const description = document.createElement('p');
description.classList.add('game__description');
description.textContent = 'Найдите все пары карточек';
description.setAttribute('aria-live', 'polite');

const stats = createStats();
const movesLabel = stats.querySelector('[data-stat-label="moves"]');
const movesOutput = stats.querySelector('[data-stat="moves"]');
const pairsOutput = stats.querySelector('[data-stat="pairs"]');
const header = createHeader();
const headerNewGameButton = header.querySelector('[data-action="new-game"]');
const leaderboardButton = header.querySelector('[data-action="leaderboard"]');

game.append(description, stats);
app.append(header, game);
document.body.append(app);

const modal = createModal();
let board = null;
let gameController = null;

const handleWin = ({ moves, movesLabel: resultMovesLabel }) => {
  saveResult(moves);
  description.textContent = `Все пары найдены за ${moves} ${resultMovesLabel}!`;

  const victoryContent = createVictoryContent({
    moves,
    movesLabel: resultMovesLabel,
    onClose: modal.close,
    onNewGame: startNewGame,
    titleId: modal.titleId,
  });

  modal.open(victoryContent);
};

function startNewGame() {
  gameController?.destroy();
  modal.close();

  const nextBoard = createBoard(createDeck());

  if (board) {
    board.replaceWith(nextBoard);
  } else {
    game.append(nextBoard);
  }

  board = nextBoard;
  description.textContent = 'Найдите все пары карточек';
  movesOutput.textContent = '0';
  movesLabel.textContent = 'ходов';
  pairsOutput.textContent = '0';

  gameController = initializeGame({
    board,
    movesLabel,
    movesOutput,
    onWin: handleWin,
    pairsOutput,
  });
}

const openLeaderboard = () => {
  const leaderboardContent = createLeaderboardContent({
    onClose: modal.close,
    results: getResults(),
    titleId: modal.titleId,
  });

  modal.open(leaderboardContent);
};

headerNewGameButton.addEventListener('click', startNewGame);
leaderboardButton.addEventListener('click', openLeaderboard);
startNewGame();
