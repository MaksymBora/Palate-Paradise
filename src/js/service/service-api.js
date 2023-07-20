import axios from 'axios';

export default class RecipeApiService {
  constructor() {
    this.BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
    this.category = '';
    this.page = '';
    this.limit = 1;
    this.time = 0;
    this.area = '';
    this.ingredients = '';
    this.recipeId = '';
  }

  async getCooksEvents() {
    const url = `${this.BASE_URL}/events`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getCategories() {
    const url = `${this.BASE_URL}/categories`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getRecipe() {
    const url = `${this.BASE_URL}/recipes?category=${this.category}&page=${this.page}&limit=${this.limit}&time=${this.time}&area=${this.area}&ingredients=${this.ingredients}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getPopular() {
    const url = `${this.BASE_URL}/recipes/popular`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getRecipeById() {
    const url = `${this.BASE_URL}/recipes/${this.recipeId}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // !!! PATCH RATING  !!!//
  async patchRatingById() {
    const url = `${this.BASE_URL}/recipes/${this.recipeId}/rating`;
    try {
      const response = await axios.patch(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getIngredients() {
    const url = `${this.BASE_URL}/ingredients`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAreas() {
    const url = `${this.BASE_URL}/areas`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // !!! POST ORDER  CHECK DOCS!!!//
  async postOrder() {
    const url = `${this.BASE_URL}/recipes/${this.recipeId}/orders/add`;
    try {
      const response = await axios.post(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
