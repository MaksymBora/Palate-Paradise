import RecipeApiService from './service/service-api';
import sprite from '../images/sprite.svg';

const recipeApiSerive = new RecipeApiService();

recipeApiSerive.getRecipe().then(response => {
  const data = response.results;

  renderList(data);
});

function renderList(data) {
  const post = document.querySelector('.recipes');

  const renderMarkup = data
    .map(({ preview, title, description, _id }) => {
      const markup = `<div class="rec-item" style="background: linear-gradient(0deg, rgba(5, 5, 5, 0.6),
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
            <p class="rate">5</p>
     
            <button type="button" class="rec-btn-open rec-btn" data-id="${_id}">See recipe</button>
          </div>
        </div>
      </div>`;

      return markup;
    })
    .join('');

    post.innerHTML = renderMarkup;
    

}


// Фунція фільтрації

function filterByTitle(data, title) {
  return data.filter(item =>
    item.title.toLowerCase().includes(title.toLowerCase())
  );
}

function renderList(data) {
  const post = document.querySelector('.recipes');
  const searchInput = document.querySelector('.form-input');
    
  searchInput.addEventListener('input', () => {
    
    const filterValue = searchInput.value.trim();
    const filteredData = filterValue ? filterByTitle(data, filterValue) : data;
   
    renderMarkup(filteredData); 
  });

  function renderMarkup(filteredData) {
   
    const markup = filteredData 
      .map(({ preview, title, description, _id }) => {
        const markup = `<div class="rec-item" style="background: linear-gradient(0deg, rgba(5, 5, 5, 0.6),
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
            <p class="rate">5</p>
     
            <button type="button" class="rec-btn-open rec-btn" data-id="${_id}">See recipe</button>
          </div>
        </div>
      </div>`;

        return markup;
      })
      .join('');

    post.innerHTML = markup; 
  }

  renderMarkup(data); 
}



