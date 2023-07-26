import RecipeApiService from '../service/service-api';
const recipeApiService = new RecipeApiService();
import { renderMarkup } from './renderingrecipes';
import { notifyInfoResult } from '../notifications';

//===========================================//
// HANDLE TIME SELECTION       ==============//
//===========================================//
export async function handleTimeSelection(event) {
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
// HANDLE AREA SELECTION       ==============//
//===========================================//
export async function handleAreaSelection(event) {
  apiConstructorReset();
  const selectedArea = event.target.innerText;

  recipeApiService.area = selectedArea;

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
// HANDLE INGREDIENTS SELECTION==============//
//===========================================//
export async function handleIngredients(event) {
  apiConstructorReset();
  const selectedIngredients = event.target.dataset.value;

  recipeApiService.ingredients = selectedIngredients;

  try {
    const response = await recipeApiService.getRecByIngredient();

    if (response.results.length === 0) {
      notifyInfoResult();
      return;
    }

    renderMarkup(response.results);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
