
import axios from 'axios';


// Отримуємо зображення з API
async function fetchReceipt() {
  const url = 'https://tasty-treats-backend.p.goit.global/api/recipes';

  try {
    const response = await axios.get(url);
    return response.data; // Повертаємо дані з API
  } catch (error) {
    console.error('Помилка при отриманні даних з API:', error);
    return null;
  }
}

fetchReceipt()
  .then(data => {
    if (data) {
      console.log(data);
    } else {
      console.log('Отримання даних не вдалося.');
    }
  })
  .catch(err => {
    console.error('Сталася помилка:', err);
  });





  



// Рендеримо розмітку та відображаємо дані з API
function displayRecipes(recipe) {
  const { youtube, title, rating, time, ingredients, tags, instructions } = recipe;

  const html = ` <div class="recipes-iframe-wrapper">
      <iframe
        class="recipes-iframe-video"
        src="https://www.youtube.com/embed/${youtube}"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <h2 class="recipes-title">${title}</h2>`
}

















    // <div class="rating-time-container">
    //   <p class="ratinng-value">${rating}</p>
     
    //   <p class="recipes-cooking-time">${time}</p>
    // </div>

    // <ul class="recipes-components-list">
    //   <li class="recipes-components-item">
    //     <p class="recipes-components-item_name">${ingredients[id]}</p>
    //     <p class="recipes-components-item_quantity">${ingredients[measure]}</p>
    //   </li>
    //   </ul>
    // <ul class="recipes-hashtags-list">
    //   <li class="recipes-hashtags-item">${tags}</li>
     
    // </ul>

    // <p class="recipes-description">${instructions}
    // </p>