import Notiflix from 'notiflix';

export function notifyError(error) {
  Notiflix.Notify.failure(`${error}`, {
    timeout: 6000,
  });
}
