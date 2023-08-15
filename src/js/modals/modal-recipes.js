import axios from 'axios';
import './onheartaddtofav';
let recipe;
const backdrop = document.querySelector('.backdrop-recipes');
const closeButton = document.querySelector('.modal-close-btn');
const modal = document.querySelector('.modal-recipes');

closeButton.addEventListener('click', closeModal);
document.addEventListener('keydown', onEscKeyPress);

backdrop.addEventListener('click', event => {
  if (event.target !== modal && !modal.contains(event.target)) {
    closeModal();
  }
});

// Відкриття модального вікна
function openModal() {
  if (modal) {
    modal.classList.remove('is-hidden');
    backdrop.classList.remove('is-hidden');
    document.addEventListener('keydown', onEscKeyPress);

    modal.addEventListener('click', event => {
      event.stopPropagation();
    });

    backdrop.removeEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    updateFavoriteButtonStatus(recipe);
  }
}

// Закриття модального вікна:
function closeModal() {
  if (modal) {
    const recipeVideoIframe = document.querySelector('.recipes-iframe-video');
    recipeVideoIframe.src = '';
    modal.classList.add('is-hidden');
    document.removeEventListener('keydown', onEscKeyPress);
    backdrop.removeEventListener('click', closeModal);
    backdrop.classList.add('is-hidden');
  }
}

function onEscKeyPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeModal();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const recipesContainer = document.querySelector('.image-container');
  const popularList = document.querySelector('.popular-list');

  recipesContainer.addEventListener('click', async event => {
    const seeRecipeBtn = event.target.closest('.rec-btn-open');
    if (!seeRecipeBtn) return;

    const recipeId = seeRecipeBtn.dataset.id;
    try {
      const fetchedRecipe = await fetchRecipe(recipeId);
      if (fetchedRecipe) {
        recipe = fetchedRecipe;

        updateFavoriteButtonStatus(recipe);
        openModal();
      }
    } catch (error) {
      console.log(error);
    }
  });

  // Event listener for <li> elements inside '.popular-list'
  if (popularList) {
    // Event listener for <li> elements inside '.popular-list'
    popularList.addEventListener('click', async event => {
      const listItem = event.target.closest('.popular-list-item');
      if (!listItem) return;

      const recipeId = listItem.dataset.id;
      try {
        const fetchedRecipe = await fetchRecipe(recipeId);
        if (fetchedRecipe) {
          recipe = fetchedRecipe;
          updateFavoriteButtonStatus(recipe);
          openModal();
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
});

let currentRecipeId; // Global variable to store the current recipeId

// Function to set the recipeId
export function setRecipeId(recipeId) {
  currentRecipeId = recipeId;
}
// Отримую дані про конкретний рецепт з API по ID
async function fetchRecipe(recipeId) {
  const url = `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeId}`;
  try {
    const response = await axios.get(url);
    const recipe = response.data;

    setRecipeId(recipeId);

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

// let currentVideoId = ''

// Створюю об'єкт для збереження в ньому посилання на відео з Id
const videoCache = {};

function displayRecipeVideo(recipe) {
  const recipeVideoIframe = document.querySelector('.recipes-iframe-video');
  const youtubeLink = recipe.youtube;
  const videoId = getVideoIdFromLink(youtubeLink);

  // if (videoId !== currentVideoId) {recipeVideoIframe.src = `https://www.youtube.com/embed/${videoId}`;
  //   }

  // Додаю умову завантаження з перевіркою наяності посилання на відео в кеші
  if (videoCache[youtubeLink]) {
    recipeVideoIframe.src = videoCache[youtubeLink];
  } else {
    recipeVideoIframe.src = `https://www.youtube.com/embed/${videoId}`;
    videoCache[youtubeLink] = `https://www.youtube.com/embed/${videoId}`;
  }
}

// Функція для отримання ID відео з URL YouTube
function getVideoIdFromLink(link) {
  const regex =
    /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([\w-]+)/i;
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
  recipeHashtagsEl.innerHTML = recipe.tags
    .map(tag => `<li class="recipes-hashtags-item">#${tag}</li>`)
    .join('');
}

// Функція виведення інгредіентів
function displayRecipeIngredients(recipe) {
  const recipeIngredientsEl = document.querySelector(
    '.recipes-components-list'
  );
  recipeIngredientsEl.innerHTML = recipe.ingredients
    .map(
      ({ measure, name }) => `
    <li class="recipes-components-item">
      <p class="recipes-components-item_name">${name}</p>
      <p class="recipes-components-item_quantity">${measure}</p>
    </li>
  `
    )
    .join('');
}

// Функція зіркового рейтингу залежно від числового
function displayStarRating(recipe) {
  const ratingValue = parseFloat(recipe.rating);
  const starElements = document.querySelectorAll('.modal-rating-star-icon');

  for (let i = 0; i < starElements.length; i++) {
    if (i < ratingValue) {
      starElements[i].classList.add('active');
    } else {
      starElements[i].classList.remove('active');
    }
  }
}

// Додавання/видалення рецептів в localStorage

// Функція для отримання списку обраних рецептів з localStorage
function getFavoriteRecipes() {
  const favoriteRecipes =
    JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  return favoriteRecipes;
}
// Функція для збереження списку обраних рецептів з localStorage
function saveFavoriteRecipes(favoriteRecipes) {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
}
//  Функція для видалення рецепту зі списку обраних рецептів в localStorage
function removeFromFavorites(recipe) {
  const favoriteRecipes = getFavoriteRecipes();
  const updatedFavorites = favoriteRecipes.filter(
    favoriteRecipe => favoriteRecipe.id !== recipe._id
  );

  saveFavoriteRecipes(updatedFavorites);
}

// Чіпляємося до кнопки "Add to favorite"
const addToFavoriteButton = document.querySelector('.btn-add-favorite');

// Функція перевірки перебування рецепта в localStorage
function isRecipeInFavorites(recipe) {
  const favoriteRecipes = getFavoriteRecipes();
  const isFavorite = favoriteRecipes.some(
    favoriteRecipe => favoriteRecipe.id === recipe._id
  );

  return isFavorite;
}
// Функція для додавання/видалення обраного рецепту з масиву localStorage
function addToFavorites(recipe) {
  const favoriteRecipes = getFavoriteRecipes();
  const { _id, title, category, rating, thumb, description } = recipe;

  const newRecipe = { id: _id, title, category, rating, thumb, description };

  const isDuplicate = isRecipeInFavorites(recipe);
  if (!isDuplicate) {
    favoriteRecipes.push(newRecipe);
    addToFavoriteButton.textContent = 'Remove from favorite';
  } else {
    const updatedFavorites = favoriteRecipes.filter(
      favoriteRecipe => favoriteRecipe.id !== _id
    );
    saveFavoriteRecipes(updatedFavorites);
    addToFavoriteButton.textContent = 'Add to favorite';
  }
  saveFavoriteRecipes(favoriteRecipes);
}

//  Слухач події для кнопки "Add to favorite", який для додавання/видалення обраного рецепту з масиву localStorage

addToFavoriteButton.addEventListener('click', () => {
  const heartIcon = document.querySelector(
    `.heart-btn[data-ids="${recipe._id}"]`
  );

  const isFavorite = isRecipeInFavorites(recipe);

  if (isFavorite) {
    removeFromFavorites(recipe);
    addToFavoriteButton.textContent = 'Add to favorite';
    heartIcon.classList.remove('on-active');
  } else {
    addToFavorites(recipe);
    addToFavoriteButton.textContent = 'Remove from favorite';
    heartIcon.classList.add('on-active');
  }
});

// Функція для оновлення тексту кнопки на "Add to favorite" або "Remove from favorite" в залежності від статусу
function updateFavoriteButtonStatus(recipe) {
  const isFavorite = isRecipeInFavorites(recipe);
  addToFavoriteButton.textContent = isFavorite
    ? 'Remove from favorite'
    : 'Add to favorite';
}

export { currentRecipeId };
