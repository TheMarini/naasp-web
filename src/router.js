// --- IMPORTS ---
import Vue from 'vue';
import Router from 'vue-router';

// ~ Pages ~
import Home from './views/Home.vue';
import Login from './views/Login.vue';

import Volunteer from './views/volunteer/Volunteer.vue';
import VolunteerForm from './views/volunteer/form/VolunteerForm.vue';

import Acolhido from './views/acolhido/Acolhido.vue';
import AcolhidoControl from './views/acolhido/AcolhidoControl.vue';

// Use vue-router
Vue.use(Router);

// --- EXPORT ---
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/voluntario',
      name: 'volunteer',
      component: Volunteer,
			children: [
				{
					path: '/adicionar',
					name: 'volunteerAdd',
					component: VolunteerForm,
					props: {
						method: 'add'
					}
				},
				{
					path: '/editar/:id',
					name: 'volunteerEdit',
					component: VolunteerForm,
					props: {
						method: 'edit'
					}
				}
			],
    },
    {
      path: '/acolhido',
      name: 'acolhido',
      component: Acolhido,
    },
		{
			path: '/acolhido/adicionar',
			name: 'acolhidoAdd',
			component: AcolhidoControl,
			props: {
				addMethod: true
			}
		},
		{
			path: '/acolhido/editar/:id',
			name: 'acolhidoEdit',
			component: AcolhidoControl,
			props: {
				addMethod: false
			}
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
