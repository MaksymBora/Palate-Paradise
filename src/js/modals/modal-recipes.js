import axios from 'axios';

// const url = 'https://tasty-treats-backend.p.goit.global/api/recipes';
// // Отримуємо дані рецептів з API
// async function fetchRecipes() {
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// // Дані рецептів  з API
// fetchRecipes().then(recipes => {
//   console.log(recipes);
// }).catch(error => {
//   console.log(error);
// });

// Отримую дані про конкретний рецепт з API по ID
async function fetchRecipe(recipeId) {
  const url = `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeId}`;
  
 
  try {
    const response = await axios.get(url);
    const recipe = response.data;
    displayRecipeVideo(recipe);
    displayRecipeTitle(recipe);
    displayRecipeDescription(recipe);
    displayRecipeTimeCooking(recipe);
    displayRecipeRating(recipe);
    displayRecipeHashtags(recipe);
    displayRecipeIngredients(recipe);
      displayStarRating(recipe);

           return recipe;
    } catch (error) {
      console.log(error);
    };
    };

    // Тимчасовий приклад 
fetchRecipe('6462a8f74c3d0ddd28897fba').then(recipe => {
  console.log(recipe);
 }).catch(error => {
  console.log(error);
});

// Відображаю відео на сторінці
function displayRecipeVideo(recipe) {
  const recipeVideoIframe = document.querySelector('.recipes-iframe-video');
  const youtubeLink = recipe.youtube;

  // ID відео з URL YouTube
  const videoId = getVideoIdFromLink(youtubeLink);


  recipeVideoIframe.src = `https://www.youtube.com/embed/${videoId}`;
}

// Функція для отримання ID відео з URL YouTube
function getVideoIdFromLink(link) {
  const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([\w-]+)/i;
  const matches = link.match(regex);
  return matches && matches[1] ? matches[1] : '';
}

// Функція виведення заголовку

function displayRecipeTitle(recipe) {
 const recipeTitleEl = document.querySelector('.recipes-title');
  recipeTitleEl.textContent = recipe.title;
}

//  Функція виведення опису приготування

function displayRecipeDescription(recipe) {
 const recipeTitleEl = document.querySelector('.recipes-description');
  recipeTitleEl.textContent = recipe.instructions;
}
// Функція виведення часу приготування
function displayRecipeTimeCooking(recipe) {
 const tmeCookingEl = document.querySelector('.recipes-cooking-time');
 tmeCookingEl.textContent = recipe.time;
}
// Функція виведення числового рейтингу
function displayRecipeRating(recipe) {
 const recipeRatingEl = document.querySelector('.ratinng-value');
 recipeRatingEl.textContent = recipe.rating;
}


// Функція виведення хештегів
function displayRecipeHashtags(recipe) {
  const recipeHashtagsEl = document.querySelector('.recipes-hashtags-list');
  recipeHashtagsEl.innerHTML = '';
  recipe.tags.forEach(tag => {
    const hashtagItemHtml = `<li class="recipes-hashtags-item">#${tag}</li>`;
    recipeHashtagsEl.insertAdjacentHTML('beforeend', hashtagItemHtml);
  });
  
}


// Функція виведення інгредіентів
function displayRecipeIngredients(recipe) {
  const recipeIngredientsEl = document.querySelector('.recipes-components-list');
  recipeIngredientsEl.innerHTML = '';
  recipe.ingredients.forEach(({measure, name})=> {
    const ingredientsItemHtml = `<li class="recipes-components-item">
        <p class="recipes-components-item_name">${name}</p>
        <p class="recipes-components-item_quantity">${measure}</p>
      </li>`;
    recipeIngredientsEl.insertAdjacentHTML('beforeend', ingredientsItemHtml);
  });
  
}

// Функція зіркового рейтингу залежно від числового
function displayStarRating(recipe) {
  const ratingValue = parseFloat(recipe.rating);
  const starElements = document.querySelectorAll(".modal-rating-star-icon");

  for (let i = 0; i < starElements.length; i++) {
    if (i < ratingValue) {
      starElements[i].classList.add("active");
    } else {
      starElements[i].classList.remove("active");
    }
  }
}

// Закриття модального вікна:
function closeModal() {
  const modal = document.querySelector('.modal-recipes');
  modal.classList.add('is-hidden');
  document.removeEventListener('keydown', onEscKeyPress);
  backdrop.removeEventListener('click', closeModal);
  closeButton.removeEventListener('click', closeModal);
   backdrop.classList.add('is-hidden');
}


function onEscKeyPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

const backdrop = document.querySelector('.backdrop');

backdrop.addEventListener('click', (event) => {
  if (event.target === backdrop) {
    closeModal();
  }
});

const closeButton = document.querySelector('.modal-close-btn');
closeButton.addEventListener('click', closeModal);

document.addEventListener('keydown', onEscKeyPress);









