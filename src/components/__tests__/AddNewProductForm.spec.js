import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import { Unit } from '@/models/unit';
import AddNewProductForm from '../AddNewProductForm.vue';

describe('AddNewProductForm', () => {
  it('renders the form fields correctly', () => {
    const wrapper = mount(AddNewProductForm);

    expect(wrapper.find('#product-name').exists()).toBe(true);
    expect(wrapper.find('#price').exists()).toBe(true);
    expect(wrapper.find('#stock').exists()).toBe(true);
    expect(wrapper.find('#amount-value').exists()).toBe(true);
    expect(wrapper.find('#amount-unit').exists()).toBe(true);
  });

  it('resets the form when reset function is called', async () => {
    const wrapper = mount(AddNewProductForm);

    await wrapper.find('#product-name').setValue('Répa');
    await wrapper.find('#price').setValue('350');
    await wrapper.find('#stock').setValue('14');
    await wrapper.find('#amount-value').setValue('25');
    await wrapper.find('#amount-unit').setValue(Unit.KG);

    await wrapper.vm.resetForm();

    expect(wrapper.find('#product-name').element.value).toBe('');
    expect(wrapper.find('#price').element.value).toBe('');
    expect(wrapper.find('#stock').element.value).toBe('');
    expect(wrapper.find('#amount-value').element.value).toBe('');
    expect(wrapper.find('#amount-unit').element.value).toBe('Kiszerelés kiválasztása');
  });
});
