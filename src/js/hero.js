fetch('https://tasty-treats-backend.p.goit.global/api/events')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    displayEvents(data);
  })

  .catch(error => {
    console.error('Error fetching data:', error);
  });

function displayEvents(eventsData) {
  const eventsContainer = document.querySelector('.eventsContainer');

  eventsContainer.innerHTML = '';

  eventsData.forEach(event => {
    const eventCard = document.createElement('li');
    eventCard.classList.add('event-card');

    const chefImageWrapper = document.createElement('div');
    chefImageWrapper.classList.add('schef-image-wrapper');
    const chefImage = document.createElement('img');
    chefImage.src = event.cook.imgUrl;
    chefImage.alt = event.cook.name;
    chefImageWrapper.appendChild(chefImage);
    eventCard.appendChild(chefImageWrapper);

    const dishPreviewImageWrapper = document.createElement('div');
    dishPreviewImageWrapper.classList.add('dish-Preview-image-wrapper');
    const dishPreviewImage = document.createElement('img');
    dishPreviewImage.src = event.topic.previewUrl;
    dishPreviewImage.alt = event.topic.name;
    dishPreviewImageWrapper.appendChild(dishPreviewImage);
    dishPreviewImage.classList.add('dishPreview-img');

    const eventName = document.createElement('h2');
    eventName.textContent = event.topic.name;
    dishPreviewImageWrapper.appendChild(eventName);
    eventName.classList.add('event-name');

    const eventRegion = document.createElement('p');
    eventRegion.textContent = event.topic.area;
    dishPreviewImageWrapper.appendChild(eventRegion);
    eventRegion.classList.add('event-region');
    eventCard.appendChild(dishPreviewImageWrapper);

    const dishImageWrapper = document.createElement('div');
    dishImageWrapper.classList.add('dish-image-wrapper');
    const dishImage = document.createElement('img');
    dishImage.src = event.topic.imgUrl;
    dishImage.alt = event.topic.name;
    dishImage.classList.add('dish-img');
    dishImageWrapper.appendChild(dishImage);
    eventCard.appendChild(dishImageWrapper);

    eventsContainer.appendChild(eventCard);
  });
}

//const swiper = new Swiper('.swiper-container', {
//     slidesPerView: 1, // Кількість видимих слайдів
//     spaceBetween: 20, // Відстань між слайдами
//     loop: true, // Циклічний режим слайдера (можна вимкнути, якщо не потрібен)
//     pagination: {
//       el: '.swiper-pagination', // Створення пагінації для переключення між слайдами
//       clickable: true, // Дозволяє переключати слайди, натискаючи на пагінацію
//     },
//   });
// })
