<script setup>
import AddNewProductForm from '@/components/AddNewProductForm.vue';
import { useProductStore } from '@/stores/product.js';

const productStore = useProductStore();

function addNewProductHandler(newProduct) {
  productStore.addProduct(newProduct);
}
</script>

<template>
  <h2 class="text-center">Új termék felvétele</h2>
  <AddNewProductForm @add-new-product="addNewProductHandler" />
</template>
