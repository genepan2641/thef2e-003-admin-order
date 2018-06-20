import Vue from 'vue'
import Router from 'vue-router'

import DashboardPage from '../components/DashboardPage.vue';
import OrderPage from '../components/OrderPage.vue';
import ProductPage from '../components/ProductPage.vue';

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: DashboardPage
    },
    {
      path: '/order',
      component: OrderPage
    },
    {
      path: '/product',
      component: ProductPage
    },
  ]
})
