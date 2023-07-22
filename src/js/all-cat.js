import RecipeApiService from "./service/service-api";
import Scrollbar from 'smooth-scrollbar';
import { notifyError } from './notifications';

const allCatBtnEl = document.querySelector('.all-cat-main-btn');
const selectListEl = document.querySelector('.all-cat-select-list');
const recipeWrap = document.querySelector('.recipe-list');
const selectWrapper = document.querySelector('.all-cat-select-list');
console.log(selectWrapper);



const recipeApiService = new RecipeApiService();

recipeApiService.getCategories().then(resp => {
    createCategories(resp);
}).catch(err => notifyError('Opps ... something went wrong'));



Scrollbar.init(document.querySelector('.my-scrollbar'));


function createCategories(resp) {
    const takeElementName = ({ _id, name }) => {
       return `<li class="all-cat-select-item">
        <button class="all-cat-select-btn" data-name="${name}">${name}</button>
      </li>`
    }
    const markUpCat = resp.map(obj => takeElementName(obj)).join('');
    selectListEl.innerHTML = markUpCat;
}

allCatBtnEl.addEventListener('click', onAllCatClickHandler);

function onAllCatClickHandler(evt) {
    evt.preventDefault();

    recipeApiService.getRecipe().then(resp => {
         createReceptMark(resp)
        console.log(resp)
    }
 ).catch(err => notifyError('Opps ... something went wrong'))
}

function createReceptMark(resp) {
    const { results } = resp;
    const takeRecipe = ({ title, category }) => {
         return `<li class="recipe">
        <h4>${title}</h4>
      </li>`
    }
    const markUpRecipe = results.map(item => takeRecipe(item)).join('');
    recipeWrap.innerHTML = markUpRecipe;
}

selectWrapper.addEventListener('click', onSelectCategoryHandler);

function onSelectCategoryHandler(evt) {
    evt.preventDefault();

    if (!evt.target.matches('button')) {
    return
    }
    recipeApiService.category = evt.target.textContent;
    recipeApiService.getRecipe().then(resp => {
        createReceptMark(resp)
        console.log(resp)
    }).catch(err => notifyError('Opps ... something went wrong'))

}