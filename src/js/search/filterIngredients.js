import SlimSelect from 'slim-select';
import RecipeApiService from '../service/service-api';
import { renderMarkup } from './renderingrecipes';
import createPagination from '../favorite/pagination';
import { renderByPage } from './image-container';

const recipeApiService = new RecipeApiService();

const paginationElm = document.getElementById('pagination');

export let slimSelectItems;
// ====================================== //
// Rendering Ingredients in Select #filter-area //
// ====================================== //

async function getIngredients() {
  try {
    const result = await recipeApiService.getIngredients();

    renderOptions(result);

    slimSelectItems = new SlimSelect({
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
const selectItems = document.querySelector('#filter-items');

selectItems.addEventListener('change', filteredByIngredients);

async function filteredByIngredients(e) {
  const { value } = e.target;

  recipeApiService.otherIngredients = value;

  try {
    const result = await recipeApiService.getRecByIngredient();
    recipeApiService.filter = [...result.results];

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
