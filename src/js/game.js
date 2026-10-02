const revealCard = (card) => {
  card.classList.add('is-flipped');
  card.setAttribute(
    'aria-label',
    `Открытая карточка: ${card.dataset.cardName}`,
  );
};

const concealCard = (card) => {
  const cardNumber = Number(card.dataset.cardIndex) + 1;

  card.classList.remove('is-flipped');
  card.setAttribute('aria-label', `Закрытая карточка ${cardNumber}`);
};

const markCardsAsMatched = (cards) => {
  cards.forEach((card) => {
    card.classList.add('is-matched');
    card.disabled = true;
    card.setAttribute(
      'aria-label',
      `Найденная пара: ${card.dataset.cardName}`,
    );
  });
};

const getMovesLabel = (moves) => {
  const lastTwoDigits = moves % 100;
  const lastDigit = moves % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'ходов';
  }

  if (lastDigit === 1) {
    return 'ход';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'хода';
  }

  return 'ходов';
};

export const initializeGame = ({
  board,
  movesLabel,
  movesOutput,
  onWin,
  pairsOutput,
}) => {
  const cards = board.querySelectorAll('.card');
  const totalPairs = cards.length / 2;

  let firstCard = null;
  let secondCard = null;
  let concealTimerId = null;
  let isBoardLocked = false;
  let isGameFinished = false;
  let moves = 0;
  let pairs = 0;

  const resetSelection = () => {
    firstCard = null;
    secondCard = null;
    isBoardLocked = false;
  };

  const compareSelectedCards = () => {
    const isMatch =
      firstCard.dataset.technologyId === secondCard.dataset.technologyId;

    if (isMatch) {
      markCardsAsMatched([firstCard, secondCard]);
      pairs += 1;
      pairsOutput.textContent = pairs;
      resetSelection();

      if (pairs === totalPairs) {
        isGameFinished = true;
        board.classList.add('is-complete');
        board.setAttribute('aria-label', 'Игровое поле: игра завершена');
        onWin({ moves, movesLabel: getMovesLabel(moves) });
      }

      return;
    }

    isBoardLocked = true;

    concealTimerId = setTimeout(() => {
      concealCard(firstCard);
      concealCard(secondCard);
      concealTimerId = null;
      resetSelection();
    }, 1000);
  };

  const handleCardClick = (event) => {
    const card = event.target.closest('.card');

    if (
      !card ||
      card.disabled ||
      card === firstCard ||
      isBoardLocked ||
      isGameFinished
    ) {
      return;
    }

    revealCard(card);

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    moves += 1;
    movesOutput.textContent = moves;
    movesLabel.textContent = getMovesLabel(moves);
    compareSelectedCards();
  };

  cards.forEach((card) => {
    card.disabled = false;
  });

  board.addEventListener('click', handleCardClick);

  return {
    destroy: () => {
      if (concealTimerId !== null) {
        clearTimeout(concealTimerId);
      }

      board.removeEventListener('click', handleCardClick);
    },
  };
};
