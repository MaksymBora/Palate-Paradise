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

function makeBtnActive(event) {
  const button = document.querySelectorAll('.all-cat-active-btn');

  const clickedButton = event.target;

  button.forEach(button => {
    button.classList.remove('all-cat-active-btn');
  });

  clickedButton.classList.add('all-cat-active-btn');
}

buttons.forEach(button => {
  button.addEventListener('click', makeBtnActive);
});
// Click on button "all-category" with adding all recipe
// allCatBtnEl.addEventListener('click', onAllCatClickHandler);

// function onAllCatClickHandler(evt) {
//     evt.preventDefault();

//     recipeApiService.getRecipe().then(resp => {

//         console.log(resp)
//     }
//  ).catch(err => notifyError('Opps ... something went wrong'))
// }

// Click on button-category with adding recipe
// selectWrapper.addEventListener('click', onSelectCategoryHandler);

// function onSelectCategoryHandler(evt) {
//   evt.preventDefault();

//   // const arrayItem = evt.currentTarget.children;
//   // for (let index = 0; index < arrayItem.length; index++) {
//   //     if (index.children.classList.contains('all-cat-active-btn'))
//   //     elem.classList.remove('all-cat-active-btn')
//   // }

//   if (!evt.target.matches('button')) {
//     return;
//   }
//   evt.target.classList.add('all-cat-active-btn');
//   recipeApiService.category = evt.target.textContent;
//   recipeApiService
//     .getRecipe()
//     .then(resp => {
//       console.log(resp);
//     })
//     .catch(err => notifyError('Opps ... something went wrong'));
// }
