const createButton = (text, action, ariaLabel) => {
  const button = document.createElement('button');
  button.classList.add('button');
  button.type = 'button';
  button.dataset.action = action;
  button.setAttribute('aria-label', ariaLabel);
  button.textContent = text;

  return button;
};

const createStat = (value, text, name) => {
  const stat = document.createElement('p');
  stat.classList.add('stats__item');

  const output = document.createElement('output');
  output.classList.add('stats__value');
  output.dataset.stat = name;
  output.textContent = value;

  stat.append(output, document.createTextNode(` ${text}`));

  return stat;
};

const createCard = (index) => {
  const card = document.createElement('button');
  card.classList.add('card');
  card.type = 'button';
  card.disabled = true;
  card.dataset.cardIndex = index;
  card.setAttribute('aria-label', `Закрытая карточка ${index + 1}`);

  const cardInner = document.createElement('span');
  cardInner.classList.add('card__inner');

  const cardBack = document.createElement('span');
  cardBack.classList.add('card__face', 'card__face--back');
  cardBack.setAttribute('aria-hidden', 'true');
  cardBack.textContent = '?';

  const cardFront = document.createElement('span');
  cardFront.classList.add('card__face', 'card__face--front');
  cardFront.setAttribute('aria-hidden', 'true');

  cardInner.append(cardBack, cardFront);
  card.append(cardInner);

  return card;
};

export const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');

  const title = document.createElement('h1');
  title.classList.add('header__title');
  title.textContent = 'Memory Game';

  const controls = document.createElement('div');
  controls.classList.add('header__controls');

  const newGameButton = createButton(
    'Новая игра',
    'new-game',
    'Начать новую игру',
  );
  const leaderboardButton = createButton(
    'Таблица лидеров',
    'leaderboard',
    'Открыть таблицу лидеров',
  );

  controls.append(newGameButton, leaderboardButton);
  header.append(title, controls);

  return header;
};

export const createStats = () => {
  const stats = document.createElement('section');
  stats.classList.add('stats');
  stats.setAttribute('aria-label', 'Статистика игры');

  const moves = createStat('0', 'ходов', 'moves');
  const pairs = createStat('0', 'из 8 пар', 'pairs');

  stats.append(moves, pairs);

  return stats;
};

export const createBoard = () => {
  const board = document.createElement('section');
  board.classList.add('board');
  board.setAttribute('aria-label', 'Игровое поле');

  const cards = Array.from({ length: 16 }, (_, index) => createCard(index));
  board.append(...cards);

  return board;
};
