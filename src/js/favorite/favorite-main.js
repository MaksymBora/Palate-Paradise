import RecipeApiService from '../service/service-api';
import sprite from '../../images/sprite.svg';


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

function getRating(rating) {
  return `<ul class='stars-list'>
             <li class=${obtainRating(1, rating)}>
              <svg class='star-icon' width='18' height='18'>
                <use href='${sprite}#rate-star'></use>
              </svg>
            </li>
            <li class=${obtainRating(2, rating)}>
              <svg class='star-icon' width='18' height='18'>
                <use href='${sprite}#rate-star'></use>
              </svg>
            </li>
            <li class=${obtainRating(3, rating)}>
              <svg class='star-icon' width='18' height='18'>
                <use href='${sprite}#rate-star'></use>
              </svg>
            </li>
            <li class=${obtainRating(4, rating)}>
              <svg class='star-icon' width='18' height='18'>
                <use href='${sprite}#rate-star'></use>
              </svg>
            </li>
            <li class=${obtainRating(5, rating)}>
              <svg class='star-icon' width='18' height='18'>
                <use href='${sprite}#rate-star'></use>
              </svg>
            </li>
          </ul>`;
}

function obtainRating(star, rating) {
  if (star <= rating) {
    return 'star-rated-item';
  }
  return 'star-item';
}

function renderingFavRec() {
  const favList = document.querySelector('.fav-list');
  const empty = document.querySelector('.fav-empty');

  const hero = document.querySelector('.fav-hero');

  const arrData = localStorage.getItem('favotires-data');
  const data = JSON.parse(arrData);
  console.log(data);

  const { _id, title, category, rating, preview, description } = data[0];

  let setRating = 1;

  if (rating > 5) {
    setRating = Number(5).toFixed(1);
  } else {
    setRating = rating.toFixed(1);
  }

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
  

          <h2 class="rec-card-title title-cut">${title}</h2>
          <p class="rec-card-desc desc-cut">
            ${description}
          </p>
          
          <div class="rec-rate">
            <p class="rate">${setRating}</p>
            ${getRating(setRating)}
            <button type="button" class="rec-btn-open rec-btn" data-id="${_id}">See recipe</button>
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
