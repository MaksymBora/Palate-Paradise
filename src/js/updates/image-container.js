import RecipeApiService from '../service/service-api';
import { renderMarkup } from '../search/renderingrecipes';
import { showLoader, hideLoader } from '../loader';
import { notifyInfo } from '../notifications';

const recipeApiService = new RecipeApiService();

async function renderImageContainerOnLoad() {
  showLoader();
  try {
    const result = await recipeApiService.getRecipe();

    if (result) {
      renderMarkup(result.results);
    }

    hideLoader();
  } catch (error) {
    notifyInfo();
    hideLoader();
  }
}

renderImageContainerOnLoad();
