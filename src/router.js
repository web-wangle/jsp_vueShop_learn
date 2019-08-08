import Vue from 'vue'
import Router from 'vue-router'

import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/', name: 'ShoppingMall', component: ShoppingMall},
    {path: '/register', name: 'Register', component: Register},
  ]
})
