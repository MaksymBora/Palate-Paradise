import RecipeApiService from './service/service-api';
import Scrollbar from 'smooth-scrollbar';
import { notifyInfo } from './utils/notifications';
import { renderingAllRecips } from './all-cat/all-cat-render';
import { showLoader, hideLoader } from './utils/loader';

const selectListEl = document.querySelector('.all-cat-select-list');

const recipeApiService = new RecipeApiService();

//Add categories on page
recipeApiService
  .getCategories()
  .then(response => {
    showLoader(); // Показываем лоадер перед загрузкой категорий
    createCategories(response);
    hideLoader(); // Скрываем лоадер после рендеринга категорий
  })
  .catch(notifyInfo);

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

  const categoryButtons = document.querySelectorAll('.all-cat-select-btn');

  categoryButtons.forEach(button => {
    button.addEventListener('click', handleCategoryClick);
  });
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

document.addEventListener('click', event => {
  if (event.target.matches('.all-cat-main-btn')) {
    // Your code for handling the button click here
    recipeApiService.category = '';
    renderingOnClick();
  }
});

selectBtn.addEventListener('click', () => {
  recipeApiService.category = ''; // Reset the category to an empty string
  renderingOnClick(); // Call the renderingOnClick function after resetting the category
});

// Rendering by Categories
function renderingOnClick() {
  formSearch.querySelector('.form-input').value = '';

  showLoader();

  recipeApiService.getRecipe().then(response => {
    imageContainer.innerHTML = '';
    const recipesMarkup = response.results.map(recipe => {
      const { title, description, preview, rating, _id, category } = recipe;
      const id = _id;
      return renderingAllRecips(
        title,
        description,
        preview,
        rating,
        id,
        category
      ); // Make sure the ID property is correct here
    });
    imageContainer.innerHTML = recipesMarkup.join('');

    hideLoader();
  });
}

function handleCategoryClick(event) {
  const selectedCategory = event.target.dataset.name;

  recipeApiService.category = selectedCategory;

  renderingOnClick();
}
