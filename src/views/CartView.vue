<script setup>
import CartTable from '@/components/CartTable.vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
</script>

<template>
  <h2 class="text-center">Kosár tartalma</h2>
  <CartTable
    v-if="cartStore.cart.length > 0"
    :cart="cartStore.cart"
    :total-price="cartStore.totalPrice"
    @clear-cart="cartStore.clearCart"
  />
  <p v-else class="text-center">A kosár tartalma üres.</p>
</template>
