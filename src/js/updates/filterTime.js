import SlimSelect from 'slim-select';
import RecipeApiService from '../service/service-api';
import { renderMarkup } from '../search/renderingrecipes';

const recipeApiService = new RecipeApiService();
const timeFilter = document.querySelector('#filter-time');

export const slimSelectTime = new SlimSelect({
  select: '#filter-time',
  settings: {
    showSearch: false,
  },
});

// ======================================== //
// Rendering Options in Select #filter-time //
// ======================================== //
export function renderOptionsTime() {
  timeFilter.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = 'Time';
  defaultOption.textContent = 'Min';
  timeFilter.appendChild(defaultOption);

  for (let i = 1; i <= 24; i++) {
    const timeValue = i * 5;
    const option = document.createElement('option');
    option.value = timeValue;
    option.textContent = timeValue + ' min';
    timeFilter.appendChild(option);
  }

  slimSelectTime.setData([
    { value: 'Time', text: 'Min' },
    ...Array.from(timeFilter.options).map(option => ({
      value: option.value,
      text: option.textContent,
    })),
  ]);
}

renderOptionsTime();

// =============================== //
// Rendering Card filtered by Time //
// =============================== //
const selectTime = document.querySelector('#filter-time');

selectTime.addEventListener('change', filteredByTime);

async function filteredByTime(e) {
  const { value } = e.target;

  recipeApiService.otherTime = value;

  try {
    const result = await recipeApiService.getRecipe();
    renderMarkup(result.results);
  } catch (error) {
    console.log(error);
  }
}
