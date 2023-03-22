export class Constance {
  static base_url = 'https://fakestoreapi.com/';

  //   https://fakestoreapi.com/products/categories (GET)
  //   https://fakestoreapi.com/products/category/jewelery (POST)
  //   https://fakestoreapi.com/carts (POST)
  //   https://fakestoreapi.com/carts (GET)

  static GET_CATEGORIES = `${this.base_url}products/categories`;
  static GET_CART = `${this.base_url}cart`;
  static GET_PRODUCTS_BY_CATEGORY = `${this.base_url}products/category/`;
  static GET_CATEGORIES = `${this.base_url}products/categories`;
}
