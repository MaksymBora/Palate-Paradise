import axios from 'axios';
import { notifyError } from '../utils/notifications';

export default class RecipeApiService {
  constructor() {
    this.BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
    this.category = '';
    this.page = 1;
    this.limit = 6;
    this.time = '';
    this.area = '';
    this.ingredients = '';
    this.recipeId = '';
    this.filterData = [];
  }

  resizePage() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1280) {
      return 'per_page=9&limit=9';
    }

    if (screenWidth >= 768 && screenWidth < 1280) {
      return 'per_page=8&limit=8';
    }

    if (screenWidth < 768) {
      return 'per_page=6&limit=6';
    }
  }

  async getCooksEvents() {
    const url = `${this.BASE_URL}/events`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError();
    }
  }

  async getCategories() {
    const url = `${this.BASE_URL}/categories`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError();
    }
  }

  async getRecipe() {
    const url = `${this.BASE_URL}/recipes?category=${this.category}&page=${
      this.page
    }&${this.resizePage()}&time=${this.time}&area=${this.area}&ingredients=${
      this.ingredients
    }`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError();
    }
  }

  async getRecipeByPage(page) {
    const url = `${this.BASE_URL}/recipes?category=${
      this.category
    }&page=${page}&${this.resizePage()}&time=${this.time}&area=${
      this.area
    }&ingredients=${this.ingredients}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError();
    }
  }

  async getRecByIngredient() {
    const url = `${this.BASE_URL}/recipes?ingredient=${
      this.ingredients
    }&page=1&${this.resizePage()}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError();
    }
  }

  async getPopular() {
    const url = `${this.BASE_URL}/recipes/popular`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError();
    }
  }

  async getRecipeById() {
    const url = `${this.BASE_URL}/recipes/${this.recipeId}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError();
    }
  }

  // !!! PATCH RATING  !!!//
  async patchRatingById() {
    const url = `${this.BASE_URL}/recipes/${this.recipeId}/rating`;
    try {
      const response = await axios.patch(url);
      return response.data;
    } catch (error) {
      notifyError();
    }
  }

  async getIngredients() {
    const url = `${this.BASE_URL}/ingredients`;
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      notifyError();
    }
  }

  async getAreas() {
    const url = `${this.BASE_URL}/areas`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError();
    }
  }

  // !!! POST ORDER  CHECK DOCS!!!//
  async postOrder() {
    const url = `${this.BASE_URL}/recipes/${this.recipeId}/orders/add`;
    try {
      const response = await axios.post(url);
      return response.data;
    } catch (error) {
      notifyError();
    }
  }

  set otherArea(newArea) {
    this.area = newArea;
  }

  set otherIngredients(newItem) {
    this.ingredients = newItem;
  }

  set otherTime(newTime) {
    this.time = newTime;
  }

  set currentPage(newPage) {
    this.page = newPage;
  }

  get currentPage() {
    return this.page;
  }

  set filter(newFilterData) {
    this.filterData = newFilterData;
  }

  get filter() {
    return this.filterData;
  }

  set updatedCategory(newCategory) {
    this.category = newCategory;
  }
}
