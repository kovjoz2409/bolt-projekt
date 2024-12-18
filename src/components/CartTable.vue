<script setup>
defineProps({
  cart: {
    type: Array,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['clear-cart']);
</script>

<template>
  <BTableSimple hover striped responsive bordered>
    <BThead head-variant="dark">
      <BTr class="text-center">
        <BTh>Termék</BTh>
        <BTh>Darabszám</BTh>
        <BTh>Egységár</BTh>
        <BTh>Teljesár</BTh>
      </BTr>
    </BThead>
    <BTbody>
      <BTr v-for="product in cart" :key="product.id">
        <BTd>{{ product.name }}</BTd>
        <BTd class="text-end">{{ product.pieceQty }}</BTd>
        <BTd class="text-end">{{ product.price }} Ft</BTd>
        <BTd class="text-end">{{ product.price * product.pieceQty }} Ft</BTd>
      </BTr>
    </BTbody>
    <BTfoot>
      <BTr>
        <BTd colspan="4" variant="secondary" class="text-end">
          <b>Összesen: {{ totalPrice }} Ft</b></BTd
        >
      </BTr>
    </BTfoot>
  </BTableSimple>
  <div class="d-flex justify-content-center">
    <BButton @click="emit('clear-cart')">Kosár ürítése</BButton>
  </div>
</template>
