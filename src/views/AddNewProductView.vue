<script setup>
import AddNewProductForm from '@/components/AddNewProductForm.vue';
import { useProductStore } from '@/stores/product.js';

const productStore = useProductStore();
</script>

<template>
  <h2 class="text-center">Új termék felvétele</h2>
  <AddNewProductForm @add-new-product="productStore.addProduct" />
</template>
