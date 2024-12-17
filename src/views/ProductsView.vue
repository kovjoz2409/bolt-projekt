<script setup>
import ProductList from '@/components/ProductList.vue';
import { useProductStore } from '@/stores/product.js';

const productStore = useProductStore();
</script>

<template>
  <h2 class="text-center">Termékek</h2>
  <ProductList v-if="productStore.products.length > 0" :products="productStore.products" />
  <p v-else class="text-center">Nincsenek elérhető termékek.</p>
</template>
