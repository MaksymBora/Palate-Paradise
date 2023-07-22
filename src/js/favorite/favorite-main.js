import RecipeApiService from '../service/service-api';
import { renderingFavRec } from '../favorite/rendering-fav';
import createPagination from '../favorite/pagination';

const recipeApiSeriсe = new RecipeApiService();

const refs = {
  recipesListContainer: document.querySelector('.fav-list'),
  categoriesContainer: document.querySelector('.fav-categories'),
  noFavoritesMessage: document.querySelector('.fav-empty'),
  paginationElement: document.getElementById('pagination'),
  allButton: document.querySelector('.common-btn'),
  categoriesList: document.querySelector('.fav-categories'),
  renderedRecipesBox: document.getElementById('fav-rendered-card'),
  heroImage: document.querySelector('.fav-hero'),
};

// Imitation
recipeApiSeriсe.getRecipe().then(response => {
  const arr = response.results;

  const FAV_DATA = 'favorites-data';
  const toStorage = [];

  for (let i = 0; i < 6; i++) {
    const { _id, title, category, rating, preview, description } = arr[i];
    for (let j = 0; j < 5; j++) {
      toStorage.push({
        _id,
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

let currentBtn = '';

// Calculates the number of items per page
function countPage() {
  return window.innerWidth < 768 ? 9 : 12;
}

/**
 * Groups an array into chunks of a specified size.
 *
 *  array - The array to be grouped into chunks.
 *  chunkSize - The size of each chunk(Part).
 * {Object} An object containing the grouped chunks, with chunk numbers as keys.
 */
function groupArrayIntoChunks(array, chunkSize) {
  const groupedChunks = {};
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunkNumber = Math.floor(i / chunkSize) + 1;
    groupedChunks[chunkNumber] = array.slice(i, i + chunkSize);
  }
  return groupedChunks;
}

/**
 * Refreshes the favorite recipes page.
 * Generates category markup and the "All categories" button based on the saved data in localStorage.
 * Then displays the favorite recipes.
 */
function onFavoritesReload() {
  const categoryMarkup = createCategoryList();
  const allCatBtn = `<button class="fav-button common-btn is-active" name="main-cat-btn">All categories</button>`;

  const data = JSON.parse(localStorage.getItem('favorites-data'));
  refs.recipesListContainer.innerHTML = '';
  refs.categoriesContainer.innerHTML =
    data && data.length ? `${allCatBtn}${categoryMarkup}` : '';
  displayFavorites();
}

/**
 * Displays the favorite recipes based on the given pageSet.
 * If there is no data in localStorage or the data array is empty, displays a message and hides the "All" button.
 * Otherwise, calculates the number of recipes to display per page, groups the data into chunks,
 * and generates the pagination if there are multiple pages.
 * Then, creates the markup for the favorite recipes and updates the display accordingly.
 * pageSet - The current page number to display.
 */
function displayFavorites(pageSet = 1) {
  const storage = localStorage.getItem('favorites-data');
  const data = JSON.parse(storage);

  refs.allButton.style.display = data && data.length ? 'block' : 'none';

  if (!data || data.length === 0) {
    refs.noFavoritesMessage.classList.remove('visually-hidden');
    refs.allButton.classList.add('visually-hidden');
    if (window.innerWidth < 768)
      refs.heroImage.classList.add('visually-hidden');
    return;
  }

  const perPage = countPage();
  const objData = groupArrayIntoChunks(data, perPage);
  const totalPages = Object.keys(objData).length;

  refs.paginationElement.style.display = totalPages > 1 ? 'block' : 'none';
  createPagination(pageSet, perPage, totalPages, displayFavorites);

  const listMarkup = objData[pageSet]
    .map(({ title, description, preview, rating, id, category }) =>
      renderingFavRec(title, description, preview, rating, id, category)
    )
    .join('');

  refs.recipesListContainer.innerHTML = listMarkup;
  refs.noFavoritesMessage.classList.add('visually-hidden');
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
 * Generates the markup for a category button.
 * {string} category - The category name.
 * return {string} The category button markup.
 */
function renderCategories(category) {
  return `<button class="fav-button">${category}</button>`;
}

/**
 * Handles the category filter event.
 * {Event} evt - The event object.
 */
function handleCategoryFilter(evt) {
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

/**
 * Toggles the 'is-active' class on the target element.
 * {Event} target - The event target element.
 */
function toggleActiveClass({ target }) {
  const btn = document.querySelector('.is-active');
  if (!btn) refs.allButton.classList.add('is-active');
  else btn.classList.remove('is-active');
  target.classList.add('is-active');
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
 * Updates the category list in the favorites view based on the selected recipe's category.
 *  target - The target element representing the selected recipe.
 */
function updateCategoryList(target) {
  const currentRec = target.closest('div.recipe-item').dataset.category;
  const storageItems = JSON.parse(localStorage.getItem('favorites-data'));
  const isCategoryLocal = storageItems.find(el => el.category === currentRec);
  const isCategoryRendered = [...refs.categoriesContainer.children].find(
    el => el.textContent === currentRec
  );

  if (!isCategoryLocal && isCategoryRendered) isCategoryRendered.remove();
  else if (isCategoryLocal && !isCategoryRendered)
    refs.categoriesContainer.insertAdjacentHTML(
      'beforeend',
      renderCategories(currentRec)
    );

  refs.allButton.style.display =
    storageItems && storageItems.length ? 'block' : 'none';
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
