import RecipeApiService from '../service/service-api';
import sprite from '../../images/sprite.svg';

const recipeApiSerive = new RecipeApiService();

recipeApiSerive.getRecipe().then(response => {
  const arr = response.results;

  const FAV_DATA = 'favotires-data';
  const { _id, title, category, rating, preview, description } = arr[0];

  const toStorage = [
    {
      _id,
      title,
      category,
      rating,
      preview,
      description,
    },
  ];

  localStorage.setItem(FAV_DATA, JSON.stringify(toStorage));
});

function renderingFavRec() {
  const favList = document.querySelector('.fav-list');
  const empty = document.querySelector('.fav-empty');

  const hero = document.querySelector('.fav-hero');

  const arrData = localStorage.getItem('favotires-data');
  const data = JSON.parse(arrData);
  console.log(data);

  const { _id, title, category, rating, preview, description } = data[0];

  const markup = `
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
  

          <h2 class="rec-card-title">BANANA PANCAKES</h2>
          <p class="rec-card-desc">
            Banana pancakes are a fluffy and sweet breakfast dish made with
            mashed ripe bananas, eggs, flour, and a touch of cinnamon, cooked to
            perfection on a
          </p>

          <div class="rec-rate">
            <p class="rate">5</p>
            <button type="button" class="rec-btn-open rec-btn">See recipe</button>
          </div>
        </div>
      </div>`;

  // empty.classList.add('visually-hidden');
  hero.classList.remove('visually-hidden');
  favList.insertAdjacentHTML('beforeend', markup);

  const heart = document.querySelector('.heart-btn');
  heart.classList.add('active');
}

renderingFavRec();
