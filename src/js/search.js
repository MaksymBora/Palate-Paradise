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

function filterByTitle(title) {
  return data.filter(item =>
    item.title.toLowerCase().includes(title.toLowerCase())
  );
}

searchInput.addEventListener('input', () => {
  const filterValue = searchInput.value.trim();
  const filteredData = filterValue ? filterByTitle(filterValue) : data;
  renderCardList(filteredData);
});

getApi();
