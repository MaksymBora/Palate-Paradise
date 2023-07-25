import RecipeApiService from './service/service-api';
import { showLoader, hideLoader } from './loader';
import { notifyInfoResult, notifyError } from './notifications';
import { filterByTitle } from './search/filter-by-title';
import { renderMarkup } from './search/renderingrecipes';
import { resetFilters } from './search/reset-filters';

// Initializing variables and elements
const recipeApiService = new RecipeApiService();

const searchInput = document.querySelector('.form-input');
let data = [];

showLoader();

// Function to fetch data from the API and render the markup
async function getApi() {
  try {
    const response = await recipeApiService.getRecipe();
    data = response.results;
    renderMarkup(data);

    hideLoader();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function fetchAndPopulateAreas() {
  try {
    const response = await recipeApiService.getAreas();
    const areas = response;
    const areaDropdownList = document.getElementById('area-dropdown');

    areas.forEach(area => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-value', area._id);
      listItem.textContent = area.name;
      areaDropdownList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching areas:', error);
  }
}

// Function to fetch ingredients
async function fetchAndPopulateIngredients() {
  try {
    const response = await recipeApiService.getIngredients();

    const ingredientsDropdownList = document.getElementById(
      'ingredients-dropdown'
    );

    response.forEach(ingredient => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-value', ingredient._id);
      listItem.textContent = ingredient.name;
      ingredientsDropdownList.appendChild(listItem);
    });
  } catch (error) {
    notifyError();
  }
}

// Создание списка времени от 5 до 120 минут с шагом 5
const timeDropdownList = document.getElementById('time-dropdown');
for (let i = 1; i <= 24; i++) {
  const timeValue = i * 5;
  const listItem = document.createElement('li');
  listItem.setAttribute('data-value', timeValue);
  listItem.textContent = timeValue + ' min';
  timeDropdownList.appendChild(listItem);
}

const dropdownContainer = document.querySelector('.custom-dropdown');

// Function to handle the selection and color change for dropdowns
function handleSelection(container) {
  if (!container) {
    // Если контейнер не передан, выведите сообщение об ошибке или предпримите нужные действия.
    console.error(
      'Container is undefined. Please provide a valid container element.'
    );
    return;
  }

  const selectedOption = container.querySelector('.selected-option');
  const dropdownList = container.querySelector('.dropdown-list');

  const options = dropdownList.querySelectorAll('li');

  options.forEach(option => {
    option.addEventListener('click', () => {
      selectedOption.textContent = option.textContent;
      selectedOption.style.color = 'rgba(5, 5, 5, 1)';

      // Add a class to indicate the selected option
      options.forEach(item => item.classList.remove('selected'));
      option.classList.add('selected');
    });
  });
}

async function init() {
  await Promise.all([fetchAndPopulateAreas(), fetchAndPopulateIngredients()]);
  handleSelection(dropdownContainer);
  timeDropdownList.addEventListener('click', handleTimeSelection);
  getApi();
}

const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', resetFilters);

// Event listener for search input to filter recipes
searchInput.addEventListener('input', () => {
  const filterValue = searchInput.value.trim();
  const filteredData = filterValue ? filterByTitle(filterValue, data) : data;
  renderMarkup(filteredData);
});

async function handleTimeSelection(event) {
  const selectedTime = parseInt(event.target.getAttribute('data-value'));

  recipeApiService.time = selectedTime;
  try {
    const response = await recipeApiService.getRecipe();

    if (response.results.length === 0) {
      // If the filtered data is empty, display a message or take any other action
      notifyInfoResult();
      return; // Stop further execution
    }

    // Render the markup with the filtered data
    renderMarkup(response.results);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Initiating the script
init();
