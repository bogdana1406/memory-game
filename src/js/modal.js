const MODAL_TITLE_ID = 'modal-title';

export const createModal = () => {
  const dialog = document.createElement('dialog');
  dialog.classList.add('modal');
  dialog.setAttribute('aria-labelledby', MODAL_TITLE_ID);

  const panel = document.createElement('div');
  panel.classList.add('modal__panel');
  dialog.append(panel);

  const close = () => {
    if (dialog.open) {
      dialog.close();
    }
  };

  const open = (content) => {
    panel.replaceChildren(content);
    document.body.classList.add('modal-open');

    if (!dialog.open) {
      dialog.showModal();
    }
  };

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      close();
    }
  });

  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
  });

  document.body.append(dialog);

  return {
    close,
    element: dialog,
    open,
    titleId: MODAL_TITLE_ID,
  };
};
