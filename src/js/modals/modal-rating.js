import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';

const refs = {
  openModalRatingBtn: document.querySelector('[data-modal-rating-open]'),
  closeModalRatingBtn: document.querySelector('[data-modal-rating-close]'),

  modalRating: document.querySelector('[data-modal-rating]'),
  modalRatingForm: document.querySelector('.rating-form-check'),
  modalRatingSubmitBtn: document.querySelector('.rating-button-send'),
  modalRatingValue: document.querySelector('.rating-value'),
  ratings: document.querySelectorAll('.rating-item'),
};

const RATING_FORM_KEY = 'rating-form-state';

refs.openModalRatingBtn.addEventListener('click', onToggleModalRating);
refs.closeModalRatingBtn.addEventListener('click', onToggleModalRating);
refs.modalRatingForm.addEventListener('change', throttle(onRatingChange, 500));
refs.modalRatingForm.addEventListener('submit', onFormSubmit);

// Open and close modal-rating modal window
function onToggleModalRating() {
  refs.modalRating.classList.toggle('is-hidden');
}

refs.modalRatingSubmitBtn.disabled = true;
onClickPageReload();

function onRatingChange(evt) {
  const { rating, email } = evt.currentTarget.elements;

  const ratingFormState = {
    rating: rating.value,
    email: email.value.trim(),
  };

  refs.modalRatingValue.textContent = ratingFormState.rating;

  //color  the stars according to the rating value
  for (let i = 0; i < refs.ratings.length; i++) {
    const rateEl = refs.ratings[i];
    const star = rateEl.nextElementSibling;
    if (rateEl.value <= ratingFormState.rating) {
      star.classList.add('is-active');
    } else {
      star.classList.remove('is-active');
    }
  }

  localStorage.setItem(RATING_FORM_KEY, JSON.stringify(ratingFormState));

  if (email.value !== '') {
    refs.modalRatingSubmitBtn.disabled = false;
  }
}

//Check localStorage after page reload and get last saved data (or empty fields otherwise)
function onClickPageReload() {
  const storageData = JSON.parse(localStorage.getItem(RATING_FORM_KEY)) || {};
  const { rating, email } = storageData;
  if (storageData) {
    refs.modalRatingForm.elements.rating.value = rating || '';
    refs.modalRatingForm.elements.email.value = email || '';
  }
  if (rating === '' || email === '') {
    refs.modalRatingSubmitBtn.disabled = true;
  }
}
//Clean localStorage and form inputs after form submit
function onFormSubmit(evt) {
  evt.preventDefault();

  onSuccessMes();
  refs.modalRatingSubmitBtn.disabled = true;
  localStorage.removeItem(RATING_FORM_KEY);
  // Clear data from form inputs
  evt.currentTarget.reset();
}
//Show notification after form sending
function onSuccessMes() {
  Notiflix.Report.success('Thank you for your feedback!', '', 'Ok', {
    position: 'center-top',
    titleMaxLength: '100',
  });
}
