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

// Axios
import Axios from 'axios';

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

// --- GLOBALS ---
// SweetAlert toast
Vue.prototype.$toast = function swalToast(object) {
  this.$swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', this.$swal.stopTimer);
      toast.addEventListener('mouseleave', this.$swal.resumeTimer);
    },
  }).fire(object);
};

// Axios
Axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Vue.prototype.$axios = Axios;

// --- CONFIGS ---
// Prevent the production tip on Vue startup
Vue.config.productionTip = false;

// --- INITIALIZATION ---
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
