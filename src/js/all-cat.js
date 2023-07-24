import RecipeApiService from './service/service-api';
import Scrollbar from 'smooth-scrollbar';
import { notifyError } from './notifications';

const allCatBtnEl = document.querySelector('.all-cat-main-btn');
const selectListEl = document.querySelector('.all-cat-select-list');
const selectWrapper = document.querySelector('.all-cat-select-list');

const recipeApiService = new RecipeApiService();

//Add categories on page
recipeApiService
  .getCategories()
  .then(resp => {
    createCategories(resp);
  })
  .catch(err => notifyError('Opps ... something went wrong'));

//Make scroll  in categories
Scrollbar.init(document.querySelector('.my-scrollbar'));

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
