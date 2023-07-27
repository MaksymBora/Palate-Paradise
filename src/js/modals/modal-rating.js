import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';
import { currentRecipeId } from './modal-recipes.js';


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
  refs.modalRating.classList.toggle('is-hidden')
  if (refs.modalRating.classList.contains('is-hidden')){
    refs.modalRatingForm.elements.email.value = '';
    refs.modalRatingForm.elements.rating.value = '';
    resetStars();
  };
}

// Function to reset star colors to their initial state
function resetStars() {
  currentRating = 0;
  refs.ratings.forEach(rateEl => {
    rateEl.nextElementSibling.classList.remove('is-active');
  });
  refs.modalRatingValue.textContent = currentRating;
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
  if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
    Notiflix.Report.failure(
      'Error',
      'Please enter a rating between 1 and 5.',
      'Ok'
    );
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
    return;
  }

  // Отправка данных рейтинга на сервер по методу PATCH
  // Вам нужно заменить 'YOUR_API_URL/{id}/rating' на фактический URL вашего бекенда
  const recipeIdFromModalRecipes = currentRecipeId;
  const patchUrl = `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeIdFromModalRecipes}/rating`;

  const requestData = {
    rate: ratingValue, 
    email: emailValue, 
  };

  console.log('Data sent to the backend:', requestData); // Add this line to log the data
  console.log('RecipeId:', currentRecipeId);

  fetch(patchUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then(response => {
      if (response.status === 201) {
        // Successful response from the server
        return response.json();
      } else if (response.status === 409) {
        // Conflict - Provided email already exists
        return response.json(); // Extract the data from the response
      } else if (response.status === 400) {
        // Bad Request - Invalid request body
        return response.json(); // Extract the data from the response
      } else {
        // Other server-side error (5xx) - Internal Server Error
        throw new Error('Server Error');
      }
      
    })
    .then(data => {
      if (data) {
        // Data will be defined for 409 and 400 statuses
        console.log('Data received from server:', data);
        // Show error messages using Notiflix
        Notiflix.Report.failure('Error', data.message, 'Ok', {
          position: 'center-top',
        });
      } else {
        // Data will be undefined for 201 status
        console.log('Data received from server:', data);
        // Show success message using Notiflix
        Notiflix.Report.success('Rating submitted successfully!', '', 'Ok', {
          position: 'center-top',
          titleMaxLength: '100',
        });
      }
       onToggleModalRating(); 
    })
     .catch(error => {
      console.error('Error:', error);
      // Show error message using Notiflix
      Notiflix.Report.failure(
        'Error',
        'An error occurred while submitting the rating. Please try again later.',
        'Ok'
      );
      onToggleModalRating(); 
    })