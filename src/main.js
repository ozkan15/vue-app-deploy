import Vue from 'vue';
import './plugins/vuetify';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import userList from './components/user-list.vue';
import login from './components/login.vue';
import register from './components/register.vue';
import store from './services/store';

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const routes = [
  {
    path: '/login',
    component: login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) next('/userlist');
      else next();
    },
  },
  {
    path: '/register',
    component: register,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) next({ path: '/userlist' });
      else next();
    },
  },
  {
    path: '/userlist',
    component: userList,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) next();
      else next({ path: '/login' });
    },
  },
];

const router = new VueRouter({
  routes,
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
