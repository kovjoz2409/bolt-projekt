<script setup>
defineProps({
  products: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['add-to-cart']);
</script>

<template>
  <BCard
    v-for="product in products"
    :key="product.id"
    :title="`${product.name} ${product.amount.value} ${product.amount.unit}`"
  >
    <BCardText>{{ product.price }} Ft</BCardText>
    <BButton v-if="product.stock > 0" @click="emit('add-to-cart', product)">Kosárba</BButton>
  </BCard>
</template>
