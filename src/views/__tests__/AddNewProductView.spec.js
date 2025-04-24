import { describe, it, vi, expect } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

describe('AddNewProductView', async () => {
  it('calls productStore.addProduct and toast when add-new-product is emitted', async () => {
    const toastMock = vi.fn();
    const productStoreMock = {
      addProduct: vi.fn(),
      fetchProducts: vi.fn(),
    };

    vi.doMock('vue-toastification', () => ({
      useToast: () => toastMock,
    }));

    vi.doMock('@/stores/product.js', () => ({
      useProductStore: () => productStoreMock,
    }));

    const { default: AddNewProductView } = await import('@/views/AddNewProductView.vue');

    const component = defineComponent({
      components: { AddNewProductView },
      template: '<Suspense><AddNewProductView/></Suspense>',
    });

    const wrapper = mount(component, {
      global: {
        stubs: {
          AddNewProductForm: true,
        },
      },
    });

    await flushPromises();

    wrapper
      .findComponent({ name: 'AddNewProductForm' })
      .vm.$emit('add-new-product', { name: 'Mocked Termék' });

    await flushPromises();

    expect(productStoreMock.fetchProducts).toBeCalledTimes(1);
    expect(productStoreMock.addProduct).toHaveBeenCalledWith({ name: 'Mocked Termék' });
    expect(toastMock).toHaveBeenCalledWith('Mocked Termék hozzáadva a termékekhez');
  });
});
