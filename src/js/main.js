const app = document.createElement('main');
app.classList.add('app');

const title = document.createElement('h1');
title.classList.add('app__title');
title.textContent = 'Memory Game';

const description = document.createElement('p');
description.classList.add('app__description');
description.textContent = 'Найдите все пары карточек';

app.append(title, description);
document.body.append(app);
