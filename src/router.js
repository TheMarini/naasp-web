// --- IMPORTS ---
import Vue from 'vue';
import Router from 'vue-router';

// ~ Pages ~
import Home from './views/Home.vue';
import Login from './views/Login.vue';

import Voluntario from './views/voluntario/Voluntario.vue';
import VoluntarioControl from './views/voluntario/VoluntarioControl.vue';

import Acolhido from './views/acolhido/Acolhido.vue';


// Use vue-router
Vue.use(Router);

// --- EXPORT ---
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'voluntario',
      component: Voluntario,
    },
    {
      path: '/voluntario',
      name: 'voluntario',
      component: Voluntario,
    },
    {
      path: '/voluntario/add',
      name: 'voluntarioAdd',
      component: VoluntarioControl,
			props: {
				addMethod: true
			}
    },
		{
			path: '/voluntario/edit',
			name: 'voluntarioEdit',
			component: VoluntarioControl,
			props: {
				addMethod: false
			}
		},
    {
      path: '/acolhido',
      name: 'acolhido',
      component: Acolhido,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
