import SlimSelect from 'slim-select';
import RecipeApiService from '../service/service-api';
import { renderMarkup } from '../search/renderingrecipes';

const recipeApiService = new RecipeApiService();

export let slimSelectArea;
// ====================================== //
// Rendering Areas in Select #filter-area //
// ====================================== //

async function getAreas() {
  try {
    const result = await recipeApiService.getRecipe();

    renderOptions(result.results);

    slimSelectArea = new SlimSelect({
      select: '#filter-area',
      settings: {
        showSearch: false,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// ======================================== //
// Rendering Options in Select #filter-area //
// ======================================== //
function renderOptions(data) {
  const areaFilter = document.querySelector('#filter-area');
  areaFilter.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = 'Country';
  defaultOption.textContent = 'Country';
  areaFilter.appendChild(defaultOption);

  data.forEach(result => {
    const option = document.createElement('option');
    option.value = result.area;
    option.textContent = result.area;
    areaFilter.appendChild(option);
  });
}

getAreas();

// =============================== //
// Rendering Card filtered by Area //
// =============================== //
const selectArea = document.querySelector('#filter-area');

selectArea.addEventListener('change', filteredByArea);

async function filteredByArea(e) {
  const { value } = e.target;

  recipeApiService.otherArea = value;

  try {
    const result = await recipeApiService.getRecipe();
    renderMarkup(result.results);
  } catch (error) {
    console.log(error);
  }
}
