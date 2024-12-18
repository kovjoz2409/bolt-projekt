import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', () => {
  const products = ref([
    { id: 1, name: 'Alma', price: 300, stock: 4, amount: { value: 1, unit: 'kg' } },
    { id: 2, name: 'Tej', price: 400, stock: 3, amount: { value: 1, unit: 'l' } },
    { id: 3, name: 'Vöröslencse', price: 499, stock: 5, amount: { value: 500, unit: 'g' } },
    { id: 4, name: 'Vöröslencse', price: 998, stock: 10, amount: { value: 1, unit: 'kg' } },
  ]);
  let nextId = 5;

  function addProduct(product) {
    const newProduct = {
      id: nextId++,
      ...product,
    };
    products.value.push(newProduct);
  }

  function decreaseProductStockById(id) {
    const product = products.value.find((products) => products.id === id);
    if (product && product.stock > 0) product.stock--;
  }

  return { products, addProduct, decreaseProductStockById };
});
