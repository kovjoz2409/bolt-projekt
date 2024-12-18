import { createRouter, createWebHistory } from 'vue-router';
import ProductsView from '@/views/ProductsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: ProductsView,
    },
    {
      path: '/add-new-product',
      name: 'addNewProduct',
      component: () => import('@/views/AddNewProductView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
    },
  ],
});

export default router;
