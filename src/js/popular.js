import RecipeApiService from './service/service-api';
import { notifyInfo } from './notifications';
const popularList = document.querySelector('.popular-list');

const recipeApiSeriсe = new RecipeApiService();

recipeApiSeriсe.getPopular().then(createPopularMarkup).catch(notifyInfo);


function createPopularMarkup(data) {
  const markup = data
    .map(
      ({ description, preview, title, _id }) => `
    <li class="popular-list-item" data-id="${_id}">
      <img src="${preview}" alt="${title}" class="popular-img" loading="lazy" />
            <div class="popular-list-item-box"><h3 class="popular-subtitle">${title}</h3>
            <p class="popular-description">${description}</p></div>
    </li>`
    )
    .join('');
  return popularList.insertAdjacentHTML('beforeend', markup);
}

console.log('hi')