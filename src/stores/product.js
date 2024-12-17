import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', () => {
  const products = ref([
    { id: 1, name: 'Alma', price: 300, stock: 40, amount: { value: 1, unit: 'kg' } },
    { id: 2, name: 'Tej', price: 400, stock: 20, amount: { value: 1, unit: 'l' } },
    { id: 3, name: 'Vöröslencse', price: 499, stock: 200, amount: { value: 500, unit: 'g' } },
    { id: 4, name: 'Vöröslencse', price: 998, stock: 130, amount: { value: 1, unit: 'kg' } },
  ]);

  return { products };
});
