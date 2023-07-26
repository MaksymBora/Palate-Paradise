import refs from './constants';
import { getFromLocalStorage } from '../favorite/localStorageUtils';
import { countPage, groupArrayIntoChunks } from '../favorite/utils';
import createPagination from '../favorite/pagination';
import { renderingFavRec } from '../favorite/rendering-fav';
import { showLoader, hideLoader } from '../loader';

export function displayFavorites(pageSet = 1) {
  showLoader();

  const data = getFromLocalStorage('favoriteRecipes');

  // Show or hide the "All" button based on whether there is data in localStorage.
  refs.allButton.style.display = data && data.length ? 'block' : 'none';

  // Display a message and hide the "All" button if there is no data in localStorage or the data array is empty.
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

  hideLoader();
}
