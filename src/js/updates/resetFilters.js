import RecipeApiService from '../service/service-api';
import { renderMarkup } from '../search/renderingrecipes';
import { slimSelectTime } from './filterTime';
import { slimSelectArea } from './filtersArea';
import { slimSelectItems } from './filterIngredients';
import createPagination from '../favorite/pagination';
import { renderByPage } from './image-container';

const recipeApiService = new RecipeApiService();
const paginationElm = document.getElementById('pagination');

const reset = document.querySelector('.reset');
const resetFilterButton = document.getElementById('reset-filter');
const formSearchInput = document.querySelector('.form-input');

reset.addEventListener('click', resetFilterTime);
resetFilterButton.addEventListener('click', resetFilterTime);
async function resetFilterTime() {
  formSearchInput.value = '';
  slimSelectTime.setSelected([0]);
  slimSelectArea.setSelected([0]);
  slimSelectItems.setSelected([0]);
  try {
    const result = await recipeApiService.getRecipe();

    if (result) {
      renderMarkup(result.results);
      const perPage = result.perPage;
      const totalPages = result.totalPages;

      paginationElm.style.display = totalPages > 1 ? 'block' : 'none';
      createPagination(1, perPage, totalPages, renderByPage);
    }
  } catch (error) {
    console.log(error);
  }
}
