<script setup>
import AddNewProductForm from '@/components/AddNewProductForm.vue';
import { useProductStore } from '@/stores/product.js';
import { useToast } from 'vue-toastification';

const productStore = useProductStore();
const toast = useToast();

function add(product) {
  productStore.addProduct(product);
  toast(`${product.name} hozzáadva a termékekhez`);
}
</script>

<template>
  <h2 class="text-center">Új termék felvétele</h2>
  <AddNewProductForm @add-new-product="add" />
</template>
