import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  const cart = ref([]);
  const totalPrice = computed(() =>
    cart.value.reduce((total, product) => total + product.price * product.pieceQty, 0),
  );

  function addToCart(product) {
    const item = cart.value.find((cartProduct) => cartProduct.id === product.id);
    if (item) item.pieceQty += product.pieceQty;
    else cart.value.push(product);
  }

  function clearCart() {
    cart.value = [];
  }

  return { cart, totalPrice, addToCart, clearCart };
});
