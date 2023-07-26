const btnGiveRating = document.querySelector('.btn-give-rating');
const backdropRecipes = document.querySelector('.backdrop-recipes');
const modalRecipes = document.querySelector('.modal-recipes');
const backdropModalRating = document.querySelector(
  '.backdrop[data-modal-rating]'
);

btnGiveRating.addEventListener('click', function () {
  backdropRecipes.classList.add('is-hidden');
  modalRecipes.classList.add('is-hidden');

  backdropModalRating.classList.remove('is-hidden');
});
