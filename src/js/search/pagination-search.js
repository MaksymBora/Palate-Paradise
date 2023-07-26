import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { getApi } from '../search';
import RecipeApiService from '../service/service-api';
import { apiConstructorReset } from './handle-selects';
import { renderMarkup } from '../search/renderingrecipes';
import { showLoader, hideLoader } from '../loader';

const URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
const container = document.getElementById('pagination');

const recipeList = document.querySelector('.image-container');

const recipeApiService = new RecipeApiService();

const windowWidth = document.documentElement.clientWidth;
let limitCount = 0;
function resizeVisPage() {
  const screenWidth = window.innerWidth;
  return screenWidth < 768 ? 2 : 3;
}

async function getRecipesData() {
  const { perPage, totalPages } = await getApi();

  return { perPage, totalPages };
}

async function createPagination(url, params) {
  const { perPage, totalPages } = await getRecipesData(url, params);

  const options = {
    totalItems: perPage * totalPages,
    itemsPerPage: perPage,
    visiblePages: resizeVisPage(),
    page: 1,
    centerAlign: false,
    omitMiddlePages: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn pag-page">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}} move-button">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}} prev-button">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip more-button">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const paginationP = new Pagination(container, options);

  paginationP.getCurrentPage();
  paginationP.on('afterMove', event => {
    const currentPage = event.page;
    recipeApiService.page = currentPage;

    async function getCards() {
      try {
        const results = await recipeApiService.getRecipe();

        renderMarkup(results.results);

        hideLoader();
        return {
          perPage: results.perPage,
          totalPages: results.totalPages,
        };
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getCards();
  });
}

export function showPagination(url, params = {}) {
  container.innerHTML = '';
  createPagination(url, { ...params, limit: limitCount });
}
showPagination(URL);
