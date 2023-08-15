import axios from 'axios';

document.addEventListener('click', function (event) {
  const button = event.target.closest('.heart-btn');

  if (button) {
    onClickAddToFavRec(event, button); // Pass the button to the function
  }
});

async function onClickAddToFavRec(event, button) {
  const recipeId = event.target.dataset.info; // Get the recipe ID from the button

  // Check if the recipe is in favorites and add or remove it accordingly
  if (!isRecipeInFavorites(recipeId)) {
    const recipe = await fetchRecipeData(recipeId);
    if (recipe) {
      // Add the new recipe to favorites
      addToFavorites(recipe);
      button.classList.add('on-active');
    }
  } else {
    // Remove the recipe from favorites
    removeFromFavorites(recipeId);
    button.classList.remove('on-active');
  }
}

// Function to fetch the recipe from the API by ID
async function fetchRecipeData(recipeId) {
  const url = `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeId}`;
  try {
    const response = await axios.get(url);
    const recipe = response.data;
    return {
      id: recipe._id,
      title: recipe.title,
      category: recipe.category,
      rating: recipe.rating,
      thumb: recipe.thumb,
      description: recipe.description,
      // Add other recipe properties if needed
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

function addToFavorites(recipe) {
  const favoriteRecipes = getFavoriteRecipes();
  favoriteRecipes.push(recipe);
  saveFavoriteRecipes(favoriteRecipes);
}

function removeFromFavorites(recipeId) {
  const favoriteRecipes = getFavoriteRecipes();
  const updatedFavorites = favoriteRecipes.filter(
    recipe => recipe.id !== recipeId
  );
  saveFavoriteRecipes(updatedFavorites);
}

function getFavoriteRecipes() {
  const storage = localStorage.getItem('favoriteRecipes');
  return storage ? JSON.parse(storage) : [];
}

function saveFavoriteRecipes(favoriteRecipes) {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
}

function isRecipeInFavorites(recipeId) {
  const favoriteRecipes = getFavoriteRecipes();
  return favoriteRecipes.some(recipe => recipe.id === recipeId);
}
