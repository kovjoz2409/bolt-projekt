import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getProductById, getProducts, postProduct, putProduct } from '@/services/productService';

export const useProductStore = defineStore('product', () => {
  const products = ref([]);

  async function fetchProducts() {
    products.value.length = 0;
    products.value = (await getProducts()).data;
  }

  async function addProduct(product) {
    await postProduct(product);
  }

  async function decreaseProductStockById(id) {
    const product = (await getProductById(id)).data;
    if (product && product.stock > 0) {
      product.stock--;
      await putProduct(product);
      await fetchProducts();
    }
  }

  return { products, fetchProducts, addProduct, decreaseProductStockById };
});
