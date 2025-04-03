import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import CartTable from '../CartTable.vue';

const cart = [
  { id: 1, name: 'Alma', pieceQty: 3, price: 1000 },
  { id: 2, name: 'Tej', pieceQty: 1, price: 2000 },
];

const totalPrice = cart.reduce((sum, product) => sum + product.price * product.pieceQty, 0);

describe('CartTable', () => {
  it('renders cart items correctly', () => {
    const wrapper = mount(CartTable, {
      props: { cart, totalPrice },
    });

    expect(wrapper.text()).toContain('Alma');
    expect(wrapper.text()).toContain('1000 Ft'); // Egységár
    expect(wrapper.text()).toContain('3000 Ft'); // Teljesár

    expect(wrapper.text()).toContain('Tej');
    expect(wrapper.text()).toContain('2000 Ft'); // Egységár & Teljesár

    expect(wrapper.text()).toContain('Összesen: 5000');
  });

  it('emits clear-cart event when button is clicked', async () => {
    const wrapper = mount(CartTable, {
      props: { cart, totalPrice },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('clear-cart')).toBeTruthy();
  });
});
