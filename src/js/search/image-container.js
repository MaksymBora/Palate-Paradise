import RecipeApiService from '../service/service-api';
import { renderMarkup } from '../search/renderingrecipes';
import { showLoader, hideLoader } from '../utils/loader';
import { notifyInfo } from '../utils/notifications';
import createPagination from '../favorite/pagination';
import { filterByTitle } from '../search/filter-by-title';

const recipeApiService = new RecipeApiService();

const paginationElm = document.getElementById('pagination');

//==============================================================
// Rendering all Cards on page load & Pagination
// =============================================================

async function renderImageContainerOnLoad() {
  showLoader();
  try {
    const result = await recipeApiService.getRecipe();
    recipeApiService.filter = [...result.results];

    if (result) {
      renderMarkup(result.results);
      const perPage = result.perPage;
      const totalPages = result.totalPages;

      paginationElm.style.display = totalPages > 1 ? 'block' : 'none';
      createPagination(1, perPage, totalPages, renderByPage);
    }

    hideLoader();
  } catch (error) {
    notifyInfo();
    hideLoader();
  }
}

export async function renderByPage(page) {
  try {
    const result = await recipeApiService.getRecipeByPage(page);
    if (result) {
      renderMarkup(result.results);
    }
  } catch {
    notifyInfo();
  }
}

renderImageContainerOnLoad();

//==============================================================
// Event listener for search input to filter recipes
// =============================================================
const searchInput = document.querySelector('.form-input');

searchInput.addEventListener('input', () => {
  const filterValue = searchInput.value.trim();
  console.log(recipeApiService.filter);
  const filteredData = filterValue
    ? filterByTitle(filterValue, recipeApiService.filter)
    : recipeApiService.filter;
  renderMarkup(filteredData);
});

// Paint Heats on load
setTimeout(() => {
  const buttons = document.querySelectorAll('.heart-btn[data-ids]');

  const storedData = localStorage.getItem('favoriteRecipes');
  const allObj = JSON.parse(storedData);

  buttons.forEach(button => {
    const dataIdsValue = button.getAttribute('data-ids');

    const favButton = allObj.find(obj => obj.id === dataIdsValue);
    if (favButton) {
      button.classList.add('on-active');
    }
  });
}, 250);
