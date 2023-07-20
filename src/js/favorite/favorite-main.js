import RecipeApiService from '../service/service-api';

const recipeApiSerive = new RecipeApiService();

recipeApiSerive.getRecipe().then(response => {
  const arr = response.results;

  const FAV_DATA = 'favotires-data';
  const { _id, title, category, rating, preview, description } = arr[0];

  const toStorage = [
    {
      _id,
      title,
      category,
      rating,
      preview,
      description,
    },
  ];

  localStorage.setItem(FAV_DATA, JSON.stringify(toStorage));
});

function renderingFavRec() {
  const favList = document.querySelector('.fav-list');

  const arrData = localStorage.getItem('favotires-data');
  const data = JSON.parse(arrData);
  console.log(data);

  const { _id, title, category, rating, preview, description } = data[0];

  const markup = `<div>${_id}</div>`;

  favList.insertAdjacentHTML('beforeend', markup);
}

renderingFavRec();
