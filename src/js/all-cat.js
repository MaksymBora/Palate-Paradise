import RecipeApiService from "./service/service-api";
import Scrollbar from 'smooth-scrollbar';

// import 'overlayscrollbars/overlayscrollbars.css';
// import { 
//   OverlayScrollbars
// } from 'overlayscrollbars';

// const osInstance = OverlayScrollbars(document.querySelector('.myElement'), {});


const allCatBtnEl = document.querySelector('.all-cat-main-btn');
const selectListEl = document.querySelector('.all-cat-select-list')
console.log(selectListEl);

const recipeApiService = new RecipeApiService();

recipeApiService.getCategories().then(resp =>{
     createCategories(resp);
})

Scrollbar.init(document.querySelector('.my-scrollbar'));

function createCategories(resp) {
    const takeElementName = ({ _id, name }) => {
       return `<li class="all-cat-select-item">
        <button class="all-cat-select-btn" data-name="${_id}">${name}</button>
      </li>`
    }
    const markUpCat = resp.map(obj => takeElementName(obj)).join('');
    selectListEl.insertAdjacentHTML('afterbegin', markUpCat);
}

