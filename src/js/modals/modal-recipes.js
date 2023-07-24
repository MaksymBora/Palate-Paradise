import axios from 'axios';

// const url = 'https://tasty-treats-backend.p.goit.global/api/recipes';
// // Отримуємо дані рецептів з API
// function fetchRecipes() {
//   return axios.get(url)
//     .then(response => response.data)
//     .catch(error => {
//       console.log(error);
//     });
// }

// // Дані рецептів, коли вони будуть отримані з API
// fetchRecipes().then(recipes => {
//   console.log(recipes);
// }).catch(error => {
//   console.log(error);
// });

// Отримую дані про конкретний рецепт з API по ID
function fetchRecipe(recipeId) {
  const url = `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeId}`;
  
 return axios
    .get(url)
    .then((response) => response.data)
    .then((recipe) => {
    displayRecipeVideo(recipe);
    displayRecipeTitle(recipe);
    displayRecipeDescription(recipe);
    displayRecipeTimeCooking(recipe);
    displayRecipeRating(recipe);
    displayRecipeHashtags(recipe);
    displayRecipeIngredients(recipe);
    displayStarRating(recipe);
    })
    .catch((error) => {
      console.log(error);
    });
    };

fetchRecipe('6462a8f74c3d0ddd28897fbb').then(recipe => {
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

function displayRecipeTimeCooking(recipe) {
 const tmeCookingEl = document.querySelector('.recipes-cooking-time');
 tmeCookingEl.textContent = recipe.time;
}

function displayRecipeRating(recipe) {
 const recipeRatingEl = document.querySelector('.ratinng-value');
 recipeRatingEl.textContent = recipe.rating;
}



function displayRecipeHashtags(recipe) {
  const recipeHashtagsEl = document.querySelector('.recipes-hashtags-list');
  recipeHashtagsEl.innerHTML = '';
  recipe.tags.forEach(tag => {
    const hashtagItemHtml = `<li class="recipes-hashtags-item">#${tag}</li>`;
    recipeHashtagsEl.insertAdjacentHTML('beforeend', hashtagItemHtml);
  });
  
}



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























