import RecipeApiService from '../service/service-api';
import refs from './constants';
import { getFromLocalStorage } from '../favorite/localStorageUtils';
import { handleCategoryFilter } from '../favorite/handleCategotyFilter';
import { displayFavorites } from '../favorite/display-favorites';
import {
  updateCategoryList,
  renderCategories,
} from '../favorite/updateCategoryList';
import { showLoader, hideLoader } from '../loader';

const recipeApiSeriсe = new RecipeApiService();

//
// Add accent color on load page.
//
function modifyClassesOnLoad() {
  const links = document.querySelectorAll('.menu-nav-links');

  if (links[0].classList.contains('header-accent')) {
    links[0].classList.remove('header-accent');

    if (links.length > 1) {
      links[1].classList.add('header-accent');
    }
  }
}

// Вызываем функцию при загрузке страницы
window.addEventListener('load', modifyClassesOnLoad);

// ---------------------------------------
// Imitation adding data to LocalStorage
// ---------------------------------------
recipeApiSeriсe.getRecipe().then(response => {
  const arr = response.results;

  const FAV_DATA = 'favorites-data';
  const toStorage = [];

  for (let i = 0; i < 6; i++) {
    const { _id, title, category, rating, preview, description } = arr[i];
    for (let j = 0; j < 5; j++) {
      toStorage.push({
        id: _id,
        title,
        category,
        rating,
        preview,
        description,
      });
    }
  }

  localStorage.setItem(FAV_DATA, JSON.stringify(toStorage));
});

/**
 * Refreshes the favorite recipes page.
 * Generates category markup and the "All categories" button based on the saved data in localStorage.
 * Then displays the favorite recipes.
 */
function onFavoritesReload() {
  showLoader();

  const categoryMarkup = createCategoryList();
  const allCatBtn = `<button class="fav-button common-btn is-active" name="main-cat-btn">All categories</button>`;

  const data = getFromLocalStorage('favorites-data');
  refs.recipesListContainer.innerHTML = '';
  refs.categoriesContainer.innerHTML =
    data && data.length ? `${allCatBtn}${categoryMarkup}` : '';

  displayFavorites();

  hideLoader();
}

/**
 * Generates the markup for the list of unique categories from favorites data stored in localStorage.
 * {string} The category list markup or an empty string if there is no data.
 */
function createCategoryList() {
  const storage = localStorage.getItem('favorites-data');
  const data = JSON.parse(storage);

  if (!data || data.length === 0) return '';

  const uniqueCategories = data
    .flatMap(recipe => recipe.category)
    .filter((category, index, array) => array.indexOf(category) === index);
  return uniqueCategories.reduce(
    (categoryMarkup, category) => categoryMarkup + renderCategories(category),
    ''
  );
}

/**
 * Removes the favorite recipe from localStorage and reloads the favorites list.
 *  currentBtn - The current button element representing the favorite recipe.
 */
function removeFavorite(currentBtn) {
  const recipeInfo = JSON.parse(currentBtn.dataset.info);
  const storage = JSON.parse(localStorage.getItem('favorites-data'));
  localStorage.setItem(
    'favorites-data',
    JSON.stringify(storage.filter(el => el.id !== recipeInfo.id))
  );
  onFavoritesReload();
}

/**
 * Handles the click event on the recipe buttons in the favorites view.
 * event - The click event object.
 */
function handleRecipeButtonEvent({ target }) {
  if (!target.closest('button')) return;
  const currentBtn = target.closest('button');

  if (currentBtn.name === 'favorites-data') {
    removeFavorite(currentBtn);
    updateCategoryList(target);
  }
  if (currentBtn.name === 'details') {
    console.log('modal here');
  }
}

// Add event listeners to the corresponding elements when the DOM is fully loaded.

// Event listener for handling recipe button clicks in the favorites view.
refs.renderedRecipesBox.addEventListener('click', handleRecipeButtonEvent);

// Event listener for handling category filter clicks in the favorites view.
refs.categoriesList.addEventListener('click', handleCategoryFilter);

// Event listener for reloading the favorites view when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', onFavoritesReload);
