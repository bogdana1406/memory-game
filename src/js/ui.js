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

  const label = document.createElement('span');
  label.dataset.statLabel = name;
  label.textContent = text;

  stat.append(output, document.createTextNode(' '), label);

  return stat;
};

const createCard = ({ cardId, technologyId, name, icon }, index) => {
  const card = document.createElement('button');
  card.classList.add('card');
  card.type = 'button';
  card.disabled = true;
  card.dataset.cardId = cardId;
  card.dataset.cardIndex = index;
  card.dataset.cardName = name;
  card.dataset.technologyId = technologyId;
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

  const cardImage = document.createElement('img');
  cardImage.classList.add('card__image');
  cardImage.src = icon;
  cardImage.alt = name;
  cardImage.draggable = false;

  const cardName = document.createElement('span');
  cardName.classList.add('card__name');
  cardName.textContent = name;

  cardFront.append(cardImage, cardName);
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

export const createBoard = (deck) => {
  const board = document.createElement('section');
  board.classList.add('board');
  board.setAttribute('aria-label', 'Игровое поле');

  const cards = deck.map((card, index) => createCard(card, index));
  board.append(...cards);

  return board;
};
