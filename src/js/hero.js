// import Swiper from 'swiper';
// import '/node_modules/swiper/swiper-bundle.js';

// import 'swiper/swiper-bundle.css';

fetch('https://tasty-treats-backend.p.goit.global/api/events')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    displayEvents(data);

    const swiper = new Swiper('.swiper-container', {
      effect: 'slide',
      simulateTouch: true,
      grabCursor: true,
      loop: true,
      slideToClickedSlide: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      autoplay: {
        delay: 3000,
      },
      slidesPerView: 0.5,
      spaceBetween: -40,
      speed: 3500,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
      },
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

function displayEvents(eventsData) {
  const eventsContainer = document.querySelector('.swiper-wrapper');

  eventsContainer.innerHTML = '';

  eventsData.forEach(event => {
    eventsContainer.innerHTML += `
      <div class="swiper-slide">
      <div class="element-wrapper">
    <div class="schef-image-wrapper">
        <img src="${event.cook.imgUrl}" alt="${event.cook.name}">
    </div>
    
    <div class="dish-Preview-image-wrapper">
        <img src="${event.topic.previewUrl}" alt="${event.topic.name}">
        <p class="event-name">${event.topic.name}</p>
        <p class="event-region">${event.topic.area}</p>
    </div>

    <div class="dish-image-wrapper">
        <img src="${event.topic.imgUrl}" alt="${event.topic.name}">
    </div>

    </div>
</div>
      `;
  });
}
