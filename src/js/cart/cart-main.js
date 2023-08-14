import RecipeApiService from '../service/service-api';
import { notifyError } from '../notifications';
import '../mobile-menu';
import '../../js/theme-switch';
import './modal-order';
const apiRecipe = new RecipeApiService();

const cartWrapper = document.querySelector('.cart-recipe-list');

apiRecipe.limit = 9;

// Rendering cards
async function fillCartWrap() {
  try {
    const recipe = await apiRecipe.getRecipe();

    return fillCart(recipe);
  } catch (error) {
    notifyError();
  }
}

fillCartWrap();

//Make markUp in cart
function fillCart(resp) {
  const takeValues = ({
    thumb,
    area,
    rating,
    description,
    title,
    category,
  }) => {
    return `<li class="cart-recipe-item">
        <img class="cart-recipe-img" src="${thumb}" alt = "${category}"></img>
        <div class = "cart-text-wrap">
        <h3 class="cart-recipe-title">${title}</h3>
        <p class="cart-recipe-area"><b>Area:</b> ${area}</p>
        <p class="cart-recipe-descr"><b>Description:</b> ${description}</p>
        <p class="cart-recipe-rating"><b>Rating:</b> ${rating}</p>
        </div>
        <button id="cart-order" type="button" class="hero__button button cart-recipe-btn" data-modal-order-cart>
        Order now
        </button>
      </li>`;
  };
  const { results } = resp;
  const markUpCart = results.map(obj => takeValues(obj)).join('');
  cartWrapper.innerHTML = markUpCart;
}
