import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

describe('CartView', () => {
  let cartStoreMock;
  let toastMock;

  beforeEach(async () => {
    toastMock = vi.fn();

    cartStoreMock = {
      cart: [],
      totalPrice: 0,
      clearCart: vi.fn(),
    };

    vi.doMock('vue-toastification', () => ({
      useToast: () => toastMock,
    }));

    vi.doMock('@/stores/cart.js', () => ({
      useCartStore: () => cartStoreMock,
    }));
  });

  it('renders message when cart is empty', async () => {
    const { default: CartView } = await import('@/views/CartView.vue');
    const wrapper = mount(CartView);

    expect(wrapper.text()).toContain('A kosár tartalma üres.');
    expect(wrapper.findComponent({ name: 'CartTable' }).exists()).toBe(false);
  });

  it('renders CartTable when cart has items', async () => {
    cartStoreMock.cart = [{ name: 'Alma', price: 100 }];
    cartStoreMock.totalPrice = 100;

    const { default: CartView } = await import('@/views/CartView.vue');
    const wrapper = mount(CartView);

    const cartTable = wrapper.findComponent({ name: 'CartTable' });

    expect(cartTable.exists()).toBe(true);
    expect(cartTable.props('cart')).toEqual(cartStoreMock.cart);
    expect(cartTable.props('totalPrice')).toBe(cartStoreMock.totalPrice);
  });

  it('calls clearCart and toast on clear-cart event', async () => {
    cartStoreMock.cart = [{ name: 'Alma', price: 100 }];

    const { default: CartView } = await import('@/views/CartView.vue');
    const wrapper = mount(CartView);

    const cartTable = wrapper.findComponent({ name: 'CartTable' });
    await cartTable.vm.$emit('clear-cart');

    expect(cartStoreMock.clearCart).toHaveBeenCalledOnce();
    expect(toastMock).toHaveBeenCalledWith('Kosár kiürítve');
  });
});
