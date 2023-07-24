import axios from 'axios';
import RecipeApiService from './service/service-api';
import sprite from '../images/sprite.svg';

const recipeApiSerive = new RecipeApiService();
const post = document.querySelector('.recipes');
const searchInput = document.querySelector('.form-input');

let data = [];

async function getApi() {
  recipeApiSerive.limit = 8;
  try {
    const response = await recipeApiSerive.getRecipe();
    data = response.results;
    renderCardList(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
getApi();

function renderCardList(data) {
  post.innerHTML = data
    .map(({ preview, title, description, _id, rating }) => {
      const fixedRating = Math.min(rating, 5).toFixed(1);
      return `
        <div class="rec-item" style="background: linear-gradient(0deg, rgba(5, 5, 5, 0.6),
            rgba(5, 5, 5, 0)),
            url(${preview}); 
            background-position: center;
            background-size: cover;">
          <div class="upper-part">
            <button class="heart-btn" type="button">
              <svg class="icon-heart" width="18" height="16">
                <use href="${sprite}#heart"></use>
              </svg>
            </button>
            <h2 class="rec-card-title title-cut">${title}</h2>
            <p class="rec-card-desc desc-cut">
              ${description}
            </p>
            <div class="rec-rate">
              <p class="rate">${fixedRating}</p>
              <button type="button" class="rec-btn-open rec-btn" data-id="${_id}">See recipe</button>
            </div>
          </div>
        </div>`;
    })
    .join('');
}

// Функція фільтра по пошуку

// function filterByTitle(title) {
//   return data.filter(item =>
//     item.title.toLowerCase().includes(title.toLowerCase())
//   );
// }

// function renderList(data) {
//   const post = document.querySelector('.recipes');
//   const searchInput = document.querySelector('.form-input');

//   searchInput.addEventListener('input', () => {

//     const filterValue = searchInput.value.trim();
//     const filteredData = filterValue ? filterByTitle(data, filterValue) : data;

//     renderMarkup(filteredData);
//   });

//   function renderMarkup(filteredData) {

//     const markup = filteredData
//       .map(({ preview, title, description, _id }) => {
//         const markup = `<div class="rec-item" style="background: linear-gradient(0deg, rgba(5, 5, 5, 0.6),
//                       rgba(5, 5, 5, 0)),
//                       url(${preview});
//                       background-position: center;
//                       background-size: cover;">
//         <div class="upper-part">

//           <button class="heart-btn" type="button">
//             <svg class="icon-heart" width="18" height="16">
//               <use href="${sprite}#heart"></use>
//             </svg>
//           </button>

//           <h2 class="rec-card-title title-cut">${title}</h2>
//           <p class="rec-card-desc desc-cut">
//             ${description}
//           </p>

//           <div class="rec-rate">
//             <p class="rate">5</p>

//             <button type="button" class="rec-btn-open rec-btn" data-id="${_id}">See recipe</button>
//           </div>
//         </div>
//       </div>`;

//         return markup;
//       })
//       .join('');

//     post.innerHTML = markup;
//   }

// renderMarkup(data);
// }


// Function to fetch areas
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

  fetchAndPopulateAreas();
  fetchAndPopulateIngredients();


document.addEventListener('DOMContentLoaded', async function () {
  // Создание списка времени от 5 до 120 минут с шагом 5
  const timeDropdownList = document.getElementById('time-dropdown');
  for (let i = 1; i <= 24; i++) {
    const timeValue = i * 5;
    const listItem = document.createElement('li');
    listItem.setAttribute('data-value', timeValue);
    listItem.textContent = timeValue + ' min';
    timeDropdownList.appendChild(listItem);
  }

  // Function to handle the selection and color change for dropdowns
  function handleSelection(container) {
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

  await fetchAndPopulateAreas();
  await fetchAndPopulateIngredients();

  // Обработчики событий для всех выпадающих списков
  const dropdownContainers = document.querySelectorAll('.custom-dropdown');
  dropdownContainers.forEach(container => {
    handleSelection(container);
  });
});


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
  const selectedIngredientsOption = document.getElementById('selected-ingredients');
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







