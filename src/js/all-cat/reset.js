import RecipeApiService from '../service/service-api';
import { renderingAllRecips } from '../all-cat/all-cat-render';

const recipeApiService = new RecipeApiService();

const resetFilterButton = document.getElementById('reset-filter');
const iconX = document.querySelector('.icon-x');
const formSearchInput = document.querySelector('.form-input');
const customDropdowns = document.querySelectorAll(
  '.custom-dropdown .selected-option'
);

function resetFilter() {
  const imageContainer = document.getElementById('image-container');

  formSearchInput.value = '';

  customDropdowns.forEach(dropdown => {
    dropdown.textContent = dropdown.dataset.defaultOption;
  });

  recipeApiService.getRecipe().then(response => {
    const recipesMarkup = response.results.map(recipe => {
      const { title, description, preview, rating, _id, category } = recipe;
      return renderingAllRecips(
        title,
        description,
        preview,
        rating,
        _id,
        category
      );
    });
    imageContainer.innerHTML = recipesMarkup.join('');
  });
}

resetFilterButton.addEventListener('click', resetFilter);

iconX.addEventListener('click', resetFilter);
