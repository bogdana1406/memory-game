const STORAGE_KEY = 'memory-game-results';
const MAX_RESULTS = 10;

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

const isValidResult = (result) =>
  Number.isInteger(result?.moves) &&
  result.moves > 0 &&
  Number.isFinite(result?.completedAt) &&
  typeof result?.date === 'string';

const sortResults = (results) =>
  [...results].sort(
    (firstResult, secondResult) =>
      firstResult.moves - secondResult.moves ||
      firstResult.completedAt - secondResult.completedAt,
  );

export const getResults = (storage = window.localStorage) => {
  try {
    const storedResults = JSON.parse(storage.getItem(STORAGE_KEY) ?? '[]');

    if (!Array.isArray(storedResults)) {
      return [];
    }

    return sortResults(storedResults.filter(isValidResult)).slice(
      0,
      MAX_RESULTS,
    );
  } catch {
    return [];
  }
};

export const saveResult = (
  moves,
  { completedAt = new Date(), storage = window.localStorage } = {},
) => {
  const result = {
    completedAt: completedAt.getTime(),
    date: formatDate(completedAt),
    moves,
  };

  const results = sortResults([...getResults(storage), result]).slice(
    0,
    MAX_RESULTS,
  );

  storage.setItem(STORAGE_KEY, JSON.stringify(results));

  return results;
};
