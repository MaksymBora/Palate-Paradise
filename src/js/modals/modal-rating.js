import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';
import { currentRecipeId } from './modal-recipes.js';
import axios from 'axios';

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
  if (refs.modalRating.classList.contains('is-hidden')) {
    refs.modalRatingForm.elements.email.value = '';
    refs.modalRatingForm.elements.rating.value = '';
    resetStars();
  }
}

// Function to reset star colors to their initial state
function resetStars() {
  refs.ratings.forEach(rateEl => {
    rateEl.nextElementSibling.classList.remove('is-active');
  });
  refs.modalRatingValue.textContent = 0;
}

onClickPageReload();

function onRatingChange(evt) {
  const { rating, email } = evt.currentTarget.elements;
  const ratingFormState = {
    rating: Number(rating.value),
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

  const { rating, email } = evt.currentTarget.elements;

  // Validate rating: Rating should be between 1 and 5
  const ratingValue = Number(rating.value);

  if (ratingValue < 1 || ratingValue > 5) {
    Notiflix.Report.failure(
      'Error',
      'Please enter a rating between 1 and 5.',
      'Ok'
    );
    refs.modalRatingSubmitBtn.disabled = true;
    return;
  }

  const emailValue = email.value.trim();
  // Validate email: Use regular expression for email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailValue)) {
    // Invalid email format
    Notiflix.Report.failure(
      'Error',
      'Please enter a valid email address.',
      'Ok'
    );
    resetStars();
    refs.modalRatingSubmitBtn.disabled = true;
    return;
  }

  const requestData = {
    rate: ratingValue,
    email: emailValue,
  };

  // Id of current Recipe
  const recipeIdFromModalRecipes = currentRecipeId;

  // Send rating
  patchRating(requestData, recipeIdFromModalRecipes);
}

// Send Rating to Backend
async function patchRating(requestData, recipeIdFromModalRecipes) {
  const patchUrl = `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeIdFromModalRecipes}/rating`;

  try {
    Notiflix.Loading.pulse('Sending...');

    const response = await axios.patch(patchUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data) {
      setTimeout(() => {
        Notiflix.Notify.success('Thanks for your feedback!');
      }, 500);
      setTimeout(() => {
        Notiflix.Loading.remove();
      }, 1500);
    }
    onToggleModalRating();

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    Notiflix.Loading.remove();
    Notiflix.Report.warning('Ooops, failed request', 'Try again later', 'Ok');

    onToggleModalRating();
  }
}
