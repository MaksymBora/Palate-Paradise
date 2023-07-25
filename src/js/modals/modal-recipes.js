import axios from 'axios';

const backdrop = document.querySelector('.backdrop');
const closeButton = document.querySelector('.modal-close-btn');
closeButton.addEventListener('click', closeModal);
 document.addEventListener('keydown', onEscKeyPress);


// Відкриття модального вікна
function openModal() {
  const modal = document.querySelector('.modal-recipes');
  modal.classList.remove('is-hidden');
  backdrop.classList.remove('is-hidden');
  backdrop.addEventListener('click', closeModal);
}


// Закриття модального вікна:
function closeModal() {
  const modal = document.querySelector('.modal-recipes');
  modal.classList.add('is-hidden');
  document.removeEventListener('keydown', onEscKeyPress);
  backdrop.removeEventListener('click', closeModal);
  backdrop.classList.add('is-hidden');
}

function onEscKeyPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}


backdrop.addEventListener('click', (event) => {
  if (event.target === backdrop) {
    closeModal();
  }
});



// Слухач на пул рецептів для визначення кліку на кнопку картки
const recipesContainer = document.querySelector('.recipes');
recipesContainer.addEventListener('click', async (event) => {
  const seeRecipeBtn = event.target.closest(`.rec-btn-open`);
  if (!seeRecipeBtn) return; 

  const recipeId = seeRecipeBtn.dataset.id;
  console.log(recipeId);
  try {
     await fetchRecipe(recipeId);
    openModal();
   
  } catch (error) {
    console.log(error);
  }
});



// Отримую дані про конкретний рецепт з API по ID
async function fetchRecipe(recipeId) {
  console.log(recipeId);
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
  }
}


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











