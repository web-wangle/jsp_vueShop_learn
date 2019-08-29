import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css';
import "@/assets/common/common.scss";

import { Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Toast, Field, NavBar, Icon, Tab, Tabs, PullRefresh } from 'vant'

Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Toast).use(Field).use(NavBar).use(Icon).use(Tab).use(Tabs).use(PullRefresh)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
