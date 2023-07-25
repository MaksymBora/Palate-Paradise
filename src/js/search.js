import axios from 'axios';
import RecipeApiService from './service/service-api';
import sprite from '../images/sprite.svg';
import { getRating } from '../js/favorite/rendering-fav';
import { showLoader, hideLoader } from './loader';
import { notifyInfoResult } from './notifications';

// Initializing variables and elements
const recipeApiService = new RecipeApiService();
const post = document.querySelector('.image-container');
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

// Function to render the recipe markup
function renderingRecipes(title, description, preview, rating, id, category) {
  // Create an object with recipe information.
  const infoRecipe = {
    title,
    description: description.replace("'", ''),
    preview,
    rating,
    id,
    category,
  };

  const fixedRating = Math.min(rating, 5).toFixed(1);

  return `
    <div data-category="${category}" class="rec-search-item" 
      style="background: linear-gradient(0deg, rgba(5, 5, 5, 0.6), rgba(5, 5, 5, 0)),
      url(${preview}); background-position: center; background-size: cover;">
      <div class="upper-part">
        <button type="button" class="heart-btn" data-info="${JSON.stringify(
          infoRecipe
        )}" name="favorite">
          <svg class="icon-heart" width="22" height="22">
            <use href="${sprite}#heart"></use>
          </svg>
        </button>
        <h2 class="rec-card-title title-cut">${title}</h2>
        <p class="rec-card-desc desc-cut">${description}</p>
        <div class="rec-rate">
          <p class="rate">${fixedRating}</p>
           ${getRating(fixedRating)}
          <button type="button" name="details" class="rec-btn-open rec-btn" data-id="${id}">See recipe</button>
        </div>
      </div>
    </div>
  `;
}

async function fetchAndPopulateAreas() {
  const apiUrl = 'https://tasty-treats-backend.p.goit.global/api/areas';

  try {
    const response = await axios.get(apiUrl);
    const areas = response.data;
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
  const apiUrl = 'https://tasty-treats-backend.p.goit.global/api/ingredients';

  try {
    const response = await axios.get(apiUrl);
    const ingredients = response.data;
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
    console.error('Error fetching ingredients:', error);
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

// Функция для сброса фильтров
function resetFilters() {
  // Сбрасываем выбранные опции в списке времени
  const selectedTimeOption = document.getElementById('selected-time');
  selectedTimeOption.textContent = '10 min';
  selectedTimeOption.style.color = '';

  // Сбрасываем выбранные опции в списке области
  const selectedAreaOption = document.getElementById('selected-area');
  selectedAreaOption.textContent = 'Italian';
  selectedAreaOption.style.color = '';

  // Сбрасываем выбранные опции в списке ингредиентов
  const selectedIngredientsOption = document.getElementById(
    'selected-ingredients'
  );
  selectedIngredientsOption.textContent = 'Tomato';
  selectedIngredientsOption.style.color = '';

  //Все рецепты
  const recipesContainer = document.querySelector('.recipes');

  // Добавляем класс "pressed" при клике на кнопку
  resetButton.classList.add('pressed');

  // Удаляем класс "pressed" через небольшой промежуток времени, чтобы вернуть обычный стиль кнопки
  setTimeout(function () {
    resetButton.classList.remove('pressed');
  }, 100);
}

const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', resetFilters);

// Function to filter recipes by title
function filterByTitle(title) {
  return data.filter(item =>
    item.title.toLowerCase().includes(title.toLowerCase())
  );
}

// Function to render the markup for all filtered recipes
function renderMarkup(data) {
  const markup = data
    .map(recipe =>
      renderingRecipes(
        recipe.title,
        recipe.description,
        recipe.preview,
        recipe.rating,
        recipe._id,
        recipe.category
      )
    )
    .join('');
  post.innerHTML = markup;
}

// Event listener for search input to filter recipes
searchInput.addEventListener('input', () => {
  const filterValue = searchInput.value.trim();
  const filteredData = filterValue ? filterByTitle(filterValue) : data;
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
