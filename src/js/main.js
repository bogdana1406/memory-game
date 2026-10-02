import { createDeck } from './deck.js';
import { createBoard, createHeader, createStats } from './ui.js';

const app = document.createElement('div');
app.classList.add('app');

const game = document.createElement('main');
game.classList.add('game');

const description = document.createElement('p');
description.classList.add('game__description');
description.textContent = 'Найдите все пары карточек';

const deck = createDeck();

game.append(description, createStats(), createBoard(deck));
app.append(createHeader(), game);
document.body.append(app);
