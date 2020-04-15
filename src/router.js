// --- IMPORTS ---
import Vue from 'vue';
import Router from 'vue-router';

// ~ Pages ~
// Home
import Home from './views/Home.vue';

// Volunteer
import Volunteer from './views/volunteer/Volunteer.vue';
import VolunteerForm from './views/volunteer/form/VolunteerForm.vue';

// Patient
import Patient from './views/patient/Patient.vue';
import PatientForm from './views/patient/form/PatientForm.vue';

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

const patient = [
  {
    path: '/acolhido',
    name: 'patient',
    component: Patient,
  },
  {
    path: '/acolhido/adicionar',
    name: 'patientAdd',
    component: PatientForm,
  },
  {
    path: '/acolhido/editar/:id',
    name: 'patientEdit',
    component: PatientForm,
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
    ...patient,
  ],
});
