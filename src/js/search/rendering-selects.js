import RecipeApiService from '../service/service-api';
const recipeApiService = new RecipeApiService();

// ============================================//
// FETCH AREAS
//  ============================================//
export async function fetchAndPopulateAreas() {
  try {
    const areas = await recipeApiService.getAreas();
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

//===========================================//
// Function to fetch ingredients ==============//
////===========================================//
export async function fetchAndPopulateIngredients() {
  try {
    const ingredients = await recipeApiService.getIngredients();
    const ingredientsDropdownList = document.getElementById(
      'ingredients-dropdown'
    );

    ingredients.forEach(ingredient => {
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

export function createTimeDropdownList() {
  for (let i = 1; i <= 24; i++) {
    const timeValue = i * 5;
    const listItem = document.createElement('li');
    listItem.setAttribute('data-value', timeValue);
    listItem.textContent = timeValue + ' min';
    timeDropdownList.appendChild(listItem);
  }
}
