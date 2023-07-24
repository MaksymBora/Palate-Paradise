import Notiflix from 'notiflix';

export function notifyError(error) {
  Notiflix.Notify.failure('No result for your request, please try again!', {
    timeout: 6000,
  });
}

export function notifyInfo(error) {
  Notiflix.Notify.info('Oops! Something went wrong! Try reloading the page!', {
    timeout: 6000,
  });
}
