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

    const chefImage = document.createElement('img');
    chefImage.src = event.cook.imgUrl;
    chefImage.alt = event.cook.name;
    eventCard.appendChild(chefImage);
    chefImage.classList.add('chef-img');

    const dishPreviewImage = document.createElement('img');
    dishPreviewImage.src = event.topic.previewUrl;
    dishPreviewImage.alt = event.topic.name;
    eventCard.appendChild(dishPreviewImage);
    dishPreviewImage.classList.add('dishPreview-img');

    const eventName = document.createElement('h2');
    eventName.textContent = event.topic.name;
    eventCard.appendChild(eventName);
    eventName.classList.add('event-name');

    const eventRegion = document.createElement('p');
    eventRegion.textContent = event.topic.area;
    eventCard.appendChild(eventRegion);
    eventRegion.classList.add('event-region');

    const dishImage = document.createElement('img');
    dishImage.src = event.topic.imgUrl;
    dishImage.alt = event.topic.name;
    eventCard.appendChild(dishImage);
    dishImage.classList.add('dish-img');

    eventsContainer.appendChild(eventCard);
  });
}
