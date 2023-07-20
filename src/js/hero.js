import RecipeApiService from './service/service-api';

const getcooks = new RecipeApiService();

// getcooks.getRecipe().then(r => console.log(r));

function test() {
  getcooks.page = 1;
  getcooks.limit = 6;
  getcooks.time = 160;
  getcooks.area = 'Irish';
  getcooks.ingredients = '640c2dd963a319ea671e3796';

  getcooks.getRecipe().then(r => console.log(r));
}

test();

function test2() {
  getcooks.page = 1;
  getcooks.limit = 6;

  getcooks.getRecipeById().then(r => console.log(r));
}
test2();
