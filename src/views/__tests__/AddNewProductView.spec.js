import { describe, it, vi, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('AddNewProductView', () => {
  it('calls productStore.addProduct and toast when add-new-product is emitted', async () => {
    const toastMock = vi.fn();
    const productStoreMock = { addProduct: vi.fn() };

    vi.doMock('vue-toastification', () => ({
      useToast: () => toastMock,
    }));

    vi.doMock('@/stores/product.js', () => ({
      useProductStore: () => productStoreMock,
    }));

    const { default: AddNewProductView } = await import('@/views/AddNewProductView.vue');

    const wrapper = mount(AddNewProductView, {
      global: {
        stubs: {
          AddNewProductForm: true,
        },
      },
    });

    wrapper
      .findComponent({ name: 'AddNewProductForm' })
      .vm.$emit('add-new-product', { name: 'Mocked Termék' });

    expect(productStoreMock.addProduct).toHaveBeenCalledWith({ name: 'Mocked Termék' });
    expect(toastMock).toHaveBeenCalledWith('Mocked Termék hozzáadva a termékekhez');
  });
});
