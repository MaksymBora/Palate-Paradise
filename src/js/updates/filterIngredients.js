import SlimSelect from 'slim-select';
import RecipeApiService from '../service/service-api';
import { renderMarkup } from '../search/renderingrecipes';

const recipeApiService = new RecipeApiService();

// ====================================== //
// Rendering Ingredients in Select #filter-area //
// ====================================== //

async function getIngredients() {
  try {
    const result = await recipeApiService.getIngredients();

    renderOptions(result);

    const slimSelect = new SlimSelect({
      select: '#filter-items',
      settings: {
        showSearch: false,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// ======================================== //
// Rendering Options in Select #filter-items //
// ======================================== //
function renderOptions(data) {
  const areaFilter = document.querySelector('#filter-items');
  areaFilter.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = 'Ingredients';
  defaultOption.textContent = 'Ingredients';
  areaFilter.appendChild(defaultOption);

  data.forEach(result => {
    const option = document.createElement('option');
    option.value = result._id;
    option.textContent = result.name;
    areaFilter.appendChild(option);
  });
}

getIngredients();

// =======================================//
// Rendering Card filtered by Ingredients //
// ====================================== //
const selectArea = document.querySelector('#filter-items');

selectArea.addEventListener('change', filteredByIngredients);

async function filteredByIngredients(e) {
  const { value } = e.target;
  console.log(value);
  recipeApiService.otherIngredients = value;

  try {
    const result = await recipeApiService.getRecByIngredient();
    renderMarkup(result.results);
  } catch (error) {
    console.log(error);
  }
}
