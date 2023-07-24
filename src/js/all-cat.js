import RecipeApiService from './service/service-api';
import Scrollbar from 'smooth-scrollbar';
import { notifyInfo } from './notifications';
import { renderingAllRecips } from './service/all-cat-render';

const selectListEl = document.querySelector('.all-cat-select-list');

const recipeApiService = new RecipeApiService();

//Add categories on page
recipeApiService.getCategories().then(createCategories).catch(notifyInfo);

//Make scroll  in categories
const scrollbar = Scrollbar.init(document.querySelector('.my-scrollbar'), {
  alwaysShowTracks: true,
});

//Create mark-up for adding categories
function createCategories(resp) {
  const takeElementName = ({ name }) => {
    return `<li class="all-cat-select-item">
        <button class="all-cat-select-btn" data-name="${name}">${name}</button>
      </li>`;
  };
  const markUpCat = resp.map(obj => takeElementName(obj)).join('');
  selectListEl.innerHTML = markUpCat;
}

// Make button Active
const button = document.querySelectorAll('.all-cat-active-btn');
function makeBtnActive(event) {
  const clickedButton = event.target;

  button.forEach(button => {
    button.classList.remove('all-cat-active-btn');
  });

  clickedButton.classList.add('all-cat-active-btn');
}

button.forEach(button => {
  button.addEventListener('click', makeBtnActive);
});

// Rendering Recipts on Click

const selectBtn = document.querySelector('.all-cat-main-btn');
const imageContainer = document.querySelector('.image-container');
const formSearch = document.querySelector('.form_search');

selectBtn.addEventListener('click', renderingOnClick);

function renderingOnClick() {
  formSearch.querySelector('.form-input').value = '';

  recipeApiService.getRecipe().then(response => {
    imageContainer.innerHTML = '';
    const recipesMarkup = response.results.map(recipe => {
      const { title, description, preview, rating, id, category } = recipe;
      return renderingAllRecips(
        title,
        description,
        preview,
        rating,
        id,
        category
      );
    });
    imageContainer.innerHTML = recipesMarkup.join('');
  });
}
