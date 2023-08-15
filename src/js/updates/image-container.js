import RecipeApiService from '../service/service-api';
import { renderMarkup } from '../search/renderingrecipes';
import { showLoader, hideLoader } from '../utils/loader';
import { notifyInfo } from '../utils/notifications';
import createPagination from '../favorite/pagination';

const recipeApiService = new RecipeApiService();

const paginationElm = document.getElementById('pagination');

async function renderImageContainerOnLoad() {
  showLoader();
  try {
    const result = await recipeApiService.getRecipe();

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
