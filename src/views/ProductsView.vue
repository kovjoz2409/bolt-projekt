<script setup>
import ProductList from '@/components/ProductList.vue';
import { useCartStore } from '@/stores/cart.js';
import { useProductStore } from '@/stores/product.js';
import { toRaw } from 'vue';
import { useToast } from 'vue-toastification';

const productStore = useProductStore();
const cartStore = useCartStore();
const toast = useToast();

await productStore.fetchProducts();

async function addToCartHandler(product) {
  const cartProduct = { ...toRaw(product), pieceQty: 1 };
  delete cartProduct.stock;

  cartStore.addToCart(cartProduct);
  await productStore.decreaseProductStockById(cartProduct.id);

  toast(`${cartProduct.name} hozzáadva a kosárhoz`);
}
</script>

<template>
  <h2 class="text-center">Termékek</h2>
  <ProductList
    v-if="productStore.products.length > 0"
    :products="productStore.products"
    @add-to-cart="addToCartHandler"
  />
  <p v-else class="text-center">Nincsenek elérhető termékek.</p>
</template>
