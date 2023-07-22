import sprite from '../../images/sprite.svg';

/**
 * Generates an HTML representation of a star rating based on the input rating value.
 *
 *  rating - The rating value to be displayed (should be between 0 and 5).
 * returns string HTML markup representing the star rating.
 */
function getRating(rating) {
  // Ensure the rating is capped at a maximum of 5 stars.
  const roundedRating = rating > 5 ? 5 : rating;

  // Create an array of five elements representing the five stars.
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  // Generate the HTML for the star rating.
  return `
    <ul class="stars-list">
      ${stars
        .map(
          star => `
            <li class="${
              star <= roundedRating ? 'star-rated-item' : 'star-item'
            }">
              <svg class="star-icon" width="18" height="18">
                <use href="${sprite}#star"></use>
              </svg>
            </li>
          `
        )
        .join('')}
    </ul>
  `;
}

/**
 * Checks if a recipe with the specified ID exists in the favorites data stored in localStorage.
 *
 *  id - The ID of the recipe to be checked.
 *  Returns 'active' if the recipe is in favorites, or an empty string if not.
 */
function checkForFav(id) {
  // Retrieve the favorites data from localStorage.
  const storage = localStorage.getItem('favorites-data');

  // Parse the favorites data into an array of recipe objects.
  const data = JSON.parse(storage);

  // Check if the recipe with the specified ID exists in the favorites data.
  // If it exists, return 'active', indicating that the recipe is in favorites.
  // Otherwise, return an empty string.
  return storage && data.find(el => el.id === id) ? 'active' : '';
}

export function renderingFavRec(
  title,
  description,
  preview,
  rating,
  id,
  category
) {
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
    <div data-category="${category}" class="rec-item" 
      style="background: linear-gradient(0deg, rgba(5, 5, 5, 0.6), rgba(5, 5, 5, 0)),
      url(${preview}); background-position: center; background-size: cover;">
      <div class="upper-part">
        <button type="button" class="heart-btn ${checkForFav(
          id
        )}" data-info="${JSON.stringify(infoRecipe)}" name="favorite">
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
