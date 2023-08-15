import { getFromLocalStorage } from '../favorite/localStorageUtils';
import { showLoader, hideLoader } from '../utils/loader';

/**
 * Generates the markup for a category button.
 * {string} category - The category name.
 * return {string} The category button markup.
 */
export function renderCategories(category) {
  return `<button class="fav-button">${category}</button>`;
}

/**
 * Updates the category list in the favorites view based on the selected recipe's category.
 *  target - The target element representing the selected recipe.
 */
export function updateCategoryList(target) {
  showLoader();

  const currentRec = target.closest('div.recipe-item').dataset.category;
  const storageItems = getFromLocalStorage('favoriteRecipes');
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

  hideLoader();
}
