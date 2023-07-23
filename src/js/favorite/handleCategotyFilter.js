import refs from './constants';
import { countPage, groupArrayIntoChunks } from '../favorite/utils';
import { renderingFavRec } from '../favorite/rendering-fav';
import createPagination from '../favorite/pagination';
import { displayFavorites } from '../favorite/display-favorites';

let currentBtn = '';

/**
 * Toggles the 'is-active' class on the target element.
 */
function toggleActiveClass({ target }) {
  const btn = document.querySelector('.is-active');
  if (!btn) refs.allButton.classList.add('is-active');
  else btn.classList.remove('is-active');
  target.classList.add('is-active');
}

/**
 * Handles the category filter event.
 * {Event} evt - The event object.
 */
export function handleCategoryFilter(evt) {
  if (evt.target.classList.contains('is-active')) return;

  let data = [];
  let categoryRecipes;
  refs.recipesListContainer.innerHTML = '';

  if (evt !== Number(evt) && evt.target.nodeName === 'BUTTON') {
    toggleActiveClass(evt);
    currentBtn =
      evt.target.name === 'main-cat-btn' ? '' : evt.target.textContent;
  }

  const storage = localStorage.getItem('favorites-data');
  data = JSON.parse(storage);

  if (!data || data.length === 0) {
    refs.categoriesContainer.style.display = 'none';
    return;
  }

  if (!currentBtn) {
    displayFavorites();
    return;
  }

  categoryRecipes = [...data.filter(recipe => recipe.category === currentBtn)];

  let pageSet = 1;

  if (Number(evt) === evt) pageSet = evt;

  const perPage = countPage();
  const objData = groupArrayIntoChunks(categoryRecipes, perPage);
  const totalPages = Object.keys(objData).length;

  refs.paginationElement.style.display = totalPages > 1 ? 'block' : 'none';
  createPagination(pageSet, perPage, totalPages, displayFavorites);

  const listMarkup = objData[pageSet].reduce(
    (markup, { title, description, preview, rating, id, category }) =>
      markup +
      renderingFavRec(title, description, preview, rating, id, category),
    ''
  );

  refs.recipesListContainer.innerHTML = listMarkup;
}
