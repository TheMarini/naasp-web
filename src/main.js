// --- IMPORTS ---
// ~ Third party ~
// Bootstrap
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// SweetAlert2
import VueSweetalert2 from 'vue-sweetalert2';

// Mask
import VueTheMask from 'vue-the-mask';

// ~ Essentials ~
import Vue from 'vue';
import router from './router';
import store from './store';

// Root component
import App from './App.vue';

// --- USES ---
Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(VueTheMask);

// --- CONFIGS ---
// Prevent the production tip on Vue startup
Vue.config.productionTip = false;

// --- INITIALIZATION ---
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
