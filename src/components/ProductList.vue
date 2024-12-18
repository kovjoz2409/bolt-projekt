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
  <BRow cols="1" cols-sm="2" cols-lg="4">
    <BCol v-for="product in products" :key="product.id" class="text-center p-2">
      <BCard :title="`${product.name} ${product.amount.value} ${product.amount.unit}`">
        <BCardText>{{ product.price }} Ft</BCardText>
        <BButton v-if="product.stock > 0" @click="emit('add-to-cart', product)">Kosárba</BButton>
      </BCard>
    </BCol>
  </BRow>
</template>
