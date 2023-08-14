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
