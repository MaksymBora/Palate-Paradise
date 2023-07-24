import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
const popularBox = document.querySelector('.popular');


getPopular();

async function getPopular() {
    const url = `${BASE_URL}/recipes/popular`;
    try {
        const {data} = await axios.get(url);
        createPopularMarkup(data);
        return data;
    } catch (error) {
      return Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    timeout: 6000,
  });
    }
};



function createPopularMarkup(data) {
    const markup = data.map(({ description, preview, title}) => `<ul class="popular-list">
    <li class="popular-list-item">
      <img src="${preview}" alt="${title}" class="popular-img" loading="lazy" />
            <h3 class="popular-subtitle">${title}</h3>
            <p class="popular-description">${description}</p>
    </li>
  </ul>`).join('');
    return popularBox.insertAdjacentHTML('beforeend', markup);
};
