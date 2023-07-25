import RecipeApiService from './service/service-api';
import { showLoader, hideLoader } from './loader';
import { notifyInfoResult, notifyError } from './notifications';
import { filterByTitle } from './search/filter-by-title';
import { renderMarkup } from './search/renderingrecipes';
import { resetFilters } from './search/reset-filters';
import {
  fetchAndPopulateAreas,
  fetchAndPopulateIngredients,
  createTimeDropdownList,
} from './search/rendering-selects';

const recipeApiService = new RecipeApiService();

const searchInput = document.querySelector('.form-input');

showLoader();
let data = [];

// ===========================================================//
// Function to fetch data from the API and render the markup
//  ========================================================//
async function getApi() {
  try {
    const results = await recipeApiService.getRecipe();
    data = results.results;

    renderMarkup(results.results);
    hideLoader();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const dropdownContainer = document.querySelector('.custom-dropdown');

// Function to handle the selection and color change for dropdowns
function handleSelection(container) {
  if (!container) {
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
      options.forEach(item => {
        if (item === option) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
    });
  });
}

// ==================================================================
// Function to handle AREA selection and color change for dropdowns
// ==================================================================
function handleAreaSelect(container) {
  if (!container) {
    console.error(
      'Container is undefined. Please provide a valid container element.'
    );
    return;
  }

  const selectedOption = container.querySelector('.selected-option');
  const dropdownList = container.querySelector('.dropdown-list');

  // Add a click event listener to the whole dropdown list
  dropdownList.addEventListener('click', event => {
    const clickedOption = event.target.closest('li'); // Find the closest <li> element

    if (!clickedOption) return; // If the click was not on an <li> element, return

    selectedOption.textContent = clickedOption.textContent;
    selectedOption.style.color = 'rgba(5, 5, 5, 1)';

    // Add a class to indicate the selected option
    const options = dropdownList.querySelectorAll('li');
    options.forEach(option => {
      if (option === clickedOption) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    });
  });
}

//===========================================//
// HANDLE TIME SELECTION       ==============//
//===========================================//
async function handleTimeSelection(event) {
  apiConstructorReset();
  const selectedTime = parseInt(event.target.getAttribute('data-value'));

  recipeApiService.time = selectedTime;
  try {
    const response = await recipeApiService.getRecipe();

    if (response.results.length === 0) {
      notifyInfoResult();
      return;
    }

    renderMarkup(response.results);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function apiConstructorReset() {
  recipeApiService.time = '';
  recipeApiService.area = '';
  recipeApiService.ingredients = '';
}

//===========================================//
// HANDLE TIME SELECTION       ==============//
//===========================================//
async function handleAreaSelection(event) {
  apiConstructorReset();
  const selectedTime = event.target.innerText;

  recipeApiService.area = selectedTime;

  try {
    const response = await recipeApiService.getRecipe();

    if (response.results.length === 0) {
      notifyInfoResult();
      return;
    }

    renderMarkup(response.results);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

//===========================================//
// INITIALAZING       =======================//
//===========================================//
async function init() {
  const areaDropdownList = document.querySelector(
    '.choice__area.custom-dropdown'
  );

  const timeDropdownList = document.querySelector(
    '.choice__time.custom-dropdown'
  );
  try {
    showLoader();

    await fetchAndPopulateAreas();
    await fetchAndPopulateIngredients();
    createTimeDropdownList();
    handleSelection(dropdownContainer);

    handleAreaSelect(areaDropdownList);
    timeDropdownList.addEventListener('click', handleTimeSelection);
    areaDropdownList.addEventListener('click', handleAreaSelection);

    await getApi();
    hideLoader();
  } catch (error) {
    console.error('Error initializing script:', error);
  }
}

//==============================================================
// RESET FILTERS
// =============================================================

const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', resetFilters);

//==============================================================
// Event listener for search input to filter recipes
// =============================================================
searchInput.addEventListener('input', () => {
  const filterValue = searchInput.value.trim();
  const filteredData = filterValue ? filterByTitle(filterValue, data) : data;
  renderMarkup(filteredData);
});

// Initiating the script
init();

//COMMIT>>??
