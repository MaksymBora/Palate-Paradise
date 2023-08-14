import RecipeApiService from './service/service-api';
import { notifyInfo } from './notifications';

const recipeApiSeriсe = new RecipeApiService();

const popularList = document.querySelector('.popular-list');

function countRec() {
  recipeApiSeriсe
    .getPopular()
    .then(response => {
      createPopularMarkup(response);
    })
    .catch(notifyInfo);
}

countRec();

function createPopularMarkup(data) {
  const markup = data
    .map(
      ({ description, preview, title, _id }) => `
    <li class="popular-list-item" data-id="${_id}">
      <img srcset="${preview}" src="${preview}" alt="${title}" class="popular-img" loading="lazy" />
            <div class="popular-list-item-box"><h3 class="popular-subtitle">${title}</h3>
            <p class="popular-description">${description}</p></div>
    </li>`
    )
    .join('');
  return popularList.insertAdjacentHTML('beforeend', markup);
}
