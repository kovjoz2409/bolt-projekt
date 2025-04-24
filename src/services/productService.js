import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

export async function postProduct(product) {
  return await instance.post(`/products`, product);
}

export async function getProductById(productId) {
  return await instance.get(`/products/${productId}`);
}

export async function getProducts() {
  return await instance.get(`/products`);
}

export async function putProduct(product) {
  return await instance.put(`/products/${product.id}`, product);
}

export async function deleteProduct(productId) {
  return await instance.delete(`/products/${productId}`);
}
