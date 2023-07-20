function displayEvents(eventsData) {
  const eventsContainer = document.getElementById('eventsContainer');

  eventsContainer.innerHTML = '';

  eventsData.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');

    const chefImage = document.createElement('img');
    chefImage.src = event.cook.imgUrl;
    chefImage.alt = event.cook.name;
    eventCard.appendChild(chefImage);

    const dishPreviewImage = document.createElement('img');
    dishPreviewImage.src = event.topic.previewUrl;
    dishPreviewImage.alt = event.topic.name;
    eventCard.appendChild(dishPreviewImage);

    const eventName = document.createElement('h2');
    eventName.textContent = event.topic.name;
    eventCard.appendChild(eventName);

    const eventRegion = document.createElement('p');
    eventRegion.textContent = `Region: ${event.topic.area}`;

    const dishImage = document.createElement('img');
    dishImage.src = event.topic.imgUrl;
    dishImage.alt = event.topic.name;
    eventCard.appendChild(dishImage);

    eventsContainer.appendChild(eventCard);
  });
}

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
