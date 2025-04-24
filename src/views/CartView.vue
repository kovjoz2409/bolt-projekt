<script setup>
import CartTable from '@/components/CartTable.vue';
import { useCartStore } from '@/stores/cart.js';
import { useToast } from 'vue-toastification';

const cartStore = useCartStore();
const toast = useToast();

function clear() {
  cartStore.clearCart();
  toast(`Kosár kiürítve`);
}
</script>

<template>
  <h2 class="text-center">Kosár tartalma</h2>
  <CartTable
    v-if="cartStore.cart.length > 0"
    :cart="cartStore.cart"
    :total-price="cartStore.totalPrice"
    @clear-cart="clear"
  />
  <p v-else class="text-center">A kosár tartalma üres.</p>
</template>
