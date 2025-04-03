import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ProductList from '../ProductList.vue';

const products = [
  { id: 1, name: 'Alma', price: 300, stock: 4, amount: { value: 1, unit: 'kg' } },
  { id: 2, name: 'Tej', price: 400, stock: 0, amount: { value: 1, unit: 'l' } },
];

describe('ProductList', () => {
  it('renders products correctly', () => {
    const wrapper = mount(ProductList, {
      props: { products },
    });

    const productCards = wrapper.findAllComponents({ name: 'BCard' });

    expect(productCards.length).toBe(products.length);
    expect(wrapper.text()).toContain('Alma 1 kg');
    expect(wrapper.text()).toContain('300 Ft');
    expect(wrapper.text()).toContain('Tej 1 l');
    expect(wrapper.text()).toContain('400 Ft');
  });

  it('emits add-to-cart event when button is clicked', async () => {
    const wrapper = mount(ProductList, {
      props: { products: products },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('add-to-cart')).toBeTruthy();
    expect(wrapper.emitted('add-to-cart')[0]).toEqual([products[0]]);
  });

  it('does not render button if product is out of stock', () => {
    const wrapper = mount(ProductList, {
      props: { products: products },
    });

    const buttons = wrapper.findAll('button');

    expect(buttons.length).toBe(1);
  });
});
