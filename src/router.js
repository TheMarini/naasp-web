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
import PatientCall from './views/call/Call.vue';
import PatientForm from './views/patient/form/PatientForm.vue';

// Calendar
import Calendar from './views/calendar/Calendar.vue';

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
      updateMode: true,
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
    path: '/acolhido/ligar/:id',
    name: 'patientCall',
    component: PatientCall,
  },
  {
    path: '/acolhido/rapido',
    name: 'patientQuickForm',
    component: PatientForm,
    props: {
      quickMode: true,
    },
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
      updateMode: true,
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
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
    },
    ...volunteer,
    ...patient,
  ],
});
