import axios from 'axios';
import '../../node_modules/swiper/swiper.css';
import '../../node_modules/swiper/modules/pagination/pagination-element.min.css';

import Swiper, { Pagination, Autoplay } from 'swiper';

const refs = {
  swiper: document.querySelector('.swiper-wrapper'),
  loader: document.querySelector('.loader'),
  body: document.querySelector('body'),
};

async function findGeneralClasses() {
  try {
    const cooks = await axios.get(
      'https://tasty-treats-backend.p.goit.global/api/events'
    );
    return cooks.data;
  } catch (error) {
    console.log(error);
  }
}

createSlider();

async function createSlider() {
  try {
    const markup = await generateIventsMarkup();
    await addIventsInSlick(markup);

    const swiper = await new Swiper('.swiper', {
      modules: [Pagination, Autoplay],
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 6000,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function generateIventsMarkup() {
  refs.loader.classList.remove('visible');

  try {
    const ivents = await findGeneralClasses();
    refs.loader.classList.add('visible');

    return ivents.reduce((markup, ivent) => markup + createMarkup(ivent), '');
  } catch (error) {
    console.log(error);
  }
}

function createMarkup(ivent) {
  const { name, previewUrl, area } = ivent.topic;
  const cookName = ivent.cook.name;
  const cookImgUrl = ivent.cook.imgUrl;
  return `<div class="swiper-slide">
    <div class="slide-item">
      <img
        class="slider-cook"
        src="${cookImgUrl}"
        alt="${cookName}"
      />
      <div class="slide-event-box">
        <img
          class="slider-event"
          src="${previewUrl}"
          alt=""
        />
        <div class="event-info-box">
        <p class="event-title">${name}</p>
        <p class="event-country">${area}</p>
        </div>
      </div>
      <div
        class="dish-box"
        style="
          background-image: url('${previewUrl}');
        ">
        </div>
    </div>
</div>
    `;
}

function addIventsInSlick(markup) {
  refs.swiper.insertAdjacentHTML('beforeend', markup);
}
