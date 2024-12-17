<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <BCard
    v-for="product in products"
    :key="product.id"
    :title="`${product.name} ${product.amount.value} ${product.amount.unit}`"
  >
    <BCardText>{{ product.price }} Ft</BCardText>
  </BCard>
</template>
