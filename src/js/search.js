import RecipeApiService from './service/service-api';
import { showLoader, hideLoader } from './loader';
import { filterByTitle } from './search/filter-by-title';
import { renderMarkup } from './search/renderingrecipes';
import { resetFilters } from './search/reset-filters';
import {
  fetchAndPopulateAreas,
  fetchAndPopulateIngredients,
  createTimeDropdownList,
} from './search/rendering-selects';
import {
  handleTimeSelection,
  handleAreaSelection,
  handleIngredients,
} from './search/handle-selects';

const recipeApiService = new RecipeApiService();

const searchInput = document.querySelector('.form-input');

showLoader();
let data = [];

// ===========================================================//
// Function to fetch data from the API and render the markup
//  ========================================================//
// export async function getApi() {
//   try {
//     const results = await recipeApiService.getRecipe();
//     data = results.results;

//     renderMarkup(results.results);

//     hideLoader();
//     return {
//       perPage: results.perPage,
//       totalPages: results.totalPages,
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

export async function getApi() {
  try {
    const results = await recipeApiService.getRecipe();
    data = results.results;

    renderMarkup(results.results);

    hideLoader();
    return {
      perPage: results.perPage,
      totalPages: results.totalPages,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Paint Heats on load
setTimeout(() => {
  const buttons = document.querySelectorAll('.heart-btn[data-ids]');

  const storedData = localStorage.getItem('favoriteRecipes');
  const allObj = JSON.parse(storedData);

  buttons.forEach(button => {
    const dataIdsValue = button.getAttribute('data-ids');
    console.log(dataIdsValue);

    const favButton = allObj.find(obj => obj.id === dataIdsValue);
    if (favButton) {
      button.classList.add('on-active');
    }
  });
}, 1000);

const dropdownContainer = document.querySelector('.custom-dropdown');

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

  const ingredientsDropdownContainer = document.querySelector(
    '.choice__ingredients.custom-dropdown'
  );
  try {
    showLoader();
    await getApi();
    await fetchAndPopulateAreas();
    await fetchAndPopulateIngredients();
    createTimeDropdownList();
    handleSelection(dropdownContainer);

    handleAreaSelect(areaDropdownList);

    handleIngredientsSelect(ingredientsDropdownContainer);

    timeDropdownList.addEventListener('click', handleTimeSelection);
    areaDropdownList.addEventListener('click', handleAreaSelection);

    ingredientsDropdownContainer.addEventListener('click', handleIngredients);

    hideLoader();
  } catch (error) {
    console.error('Error initializing script:', error);
  }
}

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

// ==================================================================
// Function to handle INGREDIENTS selection and color change for dropdowns
// ==================================================================

function handleIngredientsSelect(container) {
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
// ==============PAGINATION==================================

//===========================================================
