import sprite from '../../images/sprite.svg';
import { getRating } from '../favorite/rendering-fav';

// Function to render the recipe markup
export function renderingRecipes(
  title,
  description,
  preview,
  rating,
  id,
  category
) {
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

// Function to render the markup for all filtered recipes
export function renderMarkup(data) {
  const post = document.querySelector('.image-container');

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
