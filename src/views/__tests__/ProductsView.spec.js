import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

describe('ProductsView', () => {
  let cartStoreMock;
  let productStoreMock;
  let toastMock;

  beforeEach(() => {
    toastMock = vi.fn();

    cartStoreMock = {
      addToCart: vi.fn(),
    };

    productStoreMock = {
      products: [
        { id: 1, name: 'Termék 1', stock: 10, amount: 1, price: 1000 },
        { id: 2, name: 'Termék 2', stock: 5, amount: 1, price: 2000 },
      ],
      decreaseProductStockById: vi.fn(),
    };

    vi.doMock('vue-toastification', () => {
      return {
        useToast: () => toastMock,
      };
    });

    vi.doMock('@/stores/cart.js', () => {
      return {
        useCartStore: () => cartStoreMock,
      };
    });

    vi.doMock('@/stores/product.js', () => {
      return {
        useProductStore: () => productStoreMock,
      };
    });
  });

  it('renders products list correctly', async () => {
    const { default: ProductsView } = await import('@/views/ProductsView.vue');
    const wrapper = mount(ProductsView);

    expect(wrapper.text()).toContain('Termékek');
    expect(wrapper.findAllComponents({ name: 'ProductList' }).length).toBe(1);
    expect(wrapper.findComponent({ name: 'ProductList' }).exists()).toBe(true);
  });

  it('shows message when no products are available', async () => {
    productStoreMock.products = [];

    const { default: ProductsView } = await import('@/views/ProductsView.vue');
    const wrapper = mount(ProductsView);

    expect(wrapper.text()).toContain('Nincsenek elérhető termékek.');
    expect(wrapper.findComponent({ name: 'ProductList' }).exists()).toBe(false);
  });

  it('calls addToCart and decreaseProductStock when "add-to-cart" event is emitted', async () => {
    delete productStoreMock.products[0].stock;

    const { default: ProductsView } = await import('@/views/ProductsView.vue');
    const wrapper = mount(ProductsView);

    await wrapper
      .findComponent({ name: 'ProductList' })
      .vm.$emit('add-to-cart', productStoreMock.products[0]);

    expect(cartStoreMock.addToCart).toHaveBeenCalledWith({
      ...productStoreMock.products[0],
      pieceQty: 1,
    });
    expect(productStoreMock.decreaseProductStockById).toHaveBeenCalledWith(1);
  });

  it('handles the case where product stock is updated correctly', async () => {
    const { default: ProductsView } = await import('@/views/ProductsView.vue');
    const wrapper = mount(ProductsView);

    await wrapper
      .findComponent({ name: 'ProductList' })
      .vm.$emit('add-to-cart', productStoreMock.products[0]);

    expect(productStoreMock.decreaseProductStockById).toHaveBeenCalledWith(1);
    expect(toastMock).toHaveBeenCalledWith('Termék 1 hozzáadva a kosárhoz');
  });
});
