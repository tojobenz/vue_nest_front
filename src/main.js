import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BootstrapVue from 'bootstrap-vue'
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);
import './index.css'
import VueTailwind from 'vue-tailwind'
import './global.js';
import {
  TTextarea,
  TSelect,
  TButton,
} from 'vue-tailwind/dist/components';
import "tailwindcss/tailwind.css"
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

const components = {
  't-textarea': {
    component: TTextarea,
    props: {
      classes: 'border-2 block w-full rounded text-gray-800'
    }
  },
  't-select': {
    component: TSelect,
  },
  't-button': {
    component: TButton,
  },
}



router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
Vue.use(BootstrapVue);
Vue.use(VueTailwind, components)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
