import RecipeApiService from '../service/service-api';
import { renderMarkup } from '../search/renderingrecipes';
import { slimSelectTime } from './filterTime';
import { slimSelectArea } from './filtersArea';
import { slimSelectItems } from './filterIngredients';

const recipeApiService = new RecipeApiService();

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
    renderMarkup(result.results);
  } catch (error) {
    console.log(error);
  }
}
