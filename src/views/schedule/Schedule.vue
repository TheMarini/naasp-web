<template>
  <div class="schedule p-4">
    <Header title="Agenda">
      <template #icon>
        <calendar-icon size="2.3x" class="title-icon"></calendar-icon>
      </template>
    </Header>
    <article class="mt-4">
      <form class="_card p-3 shadow-sm">
        <h4>Filtrar</h4>
        <div class="form-row">
          <div class="form-group mb-0 col-md-4">
            <label for="patient">Acolhido</label>
            <SingleSelect
              id="patient"
              v-model="patient"
              :options="patientOptions"
            ></SingleSelect>
          </div>
          <div class="form-group mb-0 col-md-4">
            <label for="volunteer">Voluntário</label>
            <SingleSelect
              id="volunteer"
              v-model="volunteer"
              :options="volunteerOptions"
            ></SingleSelect>
          </div>
          <div class="form-group mb-0 col-md-4">
            <label for="room">Sala</label>
            <SingleSelect
              id="room"
              v-model="room"
              :options="roomOptions"
            ></SingleSelect>
          </div>
        </div>
      </form>
      <hr class="my-4" />
      <Calendar
        :events="events"
        :calendar-api.sync="calendarApi"
        @select="select"
      ></Calendar>
      <EventModalForm
        v-model="showModal"
        :calendar-api="calendarApi"
        :patient-options="patientOptions"
        :volunteer-options="volunteerOptions"
        :room-options="roomOptions"
      ></EventModalForm>
    </article>
  </div>
</template>

<script>
// Icons
import { CalendarIcon } from 'vue-feather-icons';

// Header
import Header from '@/components/Header.vue';

// Calendar
import Calendar from '@/components/Calendar.vue';

// Calendar
import EventModalForm from '@/components/forms/EventModalForm.vue';

// SingleSelect
import SingleSelect from '@/components/SingleSelect.vue';

// Moment
import moment from 'moment';

export default {
  name: 'Schedule',
  components: {
    Header,
    Calendar,
    EventModalForm,
    CalendarIcon,
    SingleSelect,
  },
  data() {
    return {
      calendarApi: null,
      showModal: false,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      repeat: null,
      repeatOptions: [
        { value: null, text: 'Não se repete' },
        { value: 'day', text: 'Diariamente' },
        { value: 'week', text: 'Semanalmente' },
        { value: 'month', text: 'Mensalmente' },
        { value: 'businessDay', text: 'Dia útil (segunda a sexta-feita)' },
      ],
      volunteer: null,
      volunteerOptions: [
        {
          id: 0,
          name: 'Bruno Marini',
        },
        {
          id: 1,
          name: 'Nayane Ornelas',
        },
        {
          id: 2,
          name: 'Pedro Guerra',
        },
      ],
      patient: null,
      patientOptions: [
        {
          id: 0,
          name: 'Igor Oliveira',
        },
        {
          id: 1,
          name: 'Renato Pugedo',
        },
        {
          id: 2,
          name: 'Guilherme Willer',
        },
      ],
      room: null,
      roomOptions: [
        {
          id: 0,
          name: 'Sala 1',
        },
        {
          id: 1,
          name: 'Sala 2',
        },
        {
          id: 2,
          name: 'Sala 3',
        },
      ],
      events: [
        /*         {
          title: 'event1',
          start: '2020-06-03',
        },
        {
          title: 'event2',
          start: '2020-06-04',
          end: '2020-06-06',
        }, */
        {
          title: 'AS | Igor Oliveira',
          start: '2020-06-05T12:30:00',
          allDay: false, // will make the time show
        },
        {
          title: 'AS | Guilherme Willer',
          start: '2020-06-05T13:45:00',
          allDay: false, // will make the time show
        },
        {
          title: 'AS | Renato Pugedo',
          start: '2020-06-05T13:30:00',
          allDay: false, // will make the time show
        },
        {
          title: 'ES | Douglas Adams',
          start: '2020-06-03T18:30:00',
          allDay: false, // will make the time show
        },
        {
          title: 'ES | Douglas Adams',
          start: '2020-06-10T18:30:00',
          allDay: false, // will make the time show
        },
        {
          title: 'ES | Douglas Adams',
          start: '2020-06-17T18:30:00',
          allDay: false, // will make the time show
        },
        {
          title: 'ES | Douglas Adams',
          start: '2020-06-24T18:30:00',
          allDay: false, // will make the time show
        },
      ],
      selected: null,
    };
  },
  computed: {
    start() {
      return null;
    },
  },
  methods: {
    select(info) {
      this.selected = info;

      this.startDate = moment(info.start, 'YYYY-MM-DD').format('YYYY-MM-DD');
      this.startTime = moment(info.start, 'hh:mm').format('HH:mm');
      this.endDate = moment(info.end, 'YYYY-MM-DD').format('YYYY-MM-DD');
      this.endTime = moment(info.end, 'hh:mm').format('HH:mm');

      console.log(this.selected);
      console.log('time', this.startTime);

      this.showModal = true;
    },
    create() {},
  },
};
</script>

<style scoped>
/* TODO: check repeated styles like this */
header {
  color: #707070;
}
</style>
