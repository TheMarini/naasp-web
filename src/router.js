// --- IMPORTS ---
import Vue from 'vue';
import Router from 'vue-router';

// ~ Pages ~
// Home
import Home from './views/Home.vue';

// Volunteer
import Volunteer from './views/volunteer/Volunteer.vue';
import VolunteerForm from './views/volunteer/form/VolunteerForm.vue';

// Welcomed
import Welcomed from './views/welcomed/Welcomed.vue';
import WelcomedForm from './views/welcomed/form/WelcomedForm.vue';

// Use vue-router
Vue.use(Router);

// --- PATHS ---
// TODO: check a better way to do this
const volunteer = [
  {
    path: '/voluntario',
    name: 'volunteer',
    component: Volunteer,
  },
  {
    path: '/voluntario/adicionar',
    name: 'volunteerAdd',
    component: VolunteerForm,
  },
  {
    path: '/voluntario/editar/:id',
    name: 'volunteerEdit',
    component: VolunteerForm,
    props: {
      addMethod: false,
    },
  },
];

const welcomed = [
  {
    path: '/acolhido',
    name: 'welcomed',
    component: Welcomed,
  },
  {
    path: '/acolhido/adicionar',
    name: 'welcomedAdd',
    component: WelcomedForm,
  },
  {
    path: '/acolhido/editar/:id',
    name: 'welcomedEdit',
    component: WelcomedForm,
    props: {
      addMethod: false,
    },
  },
];

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
    ...volunteer,
    ...welcomed,
  ],
});
