<template>
  <div class="schedule p-4">
    <header class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <calendar-icon size="2.3x" class="title-icon"></calendar-icon>
        <h2 class="ml-3 mb-0"><b>Agenda</b></h2>
      </div>
    </header>
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
      <Calendar :events="events" @select="select"></Calendar>
      <b-modal id="create" hide-header centered scrollable>
        <form>
          <div>
            <h5>Início</h5>
            <div class="form-row">
              <div class="form-group mb-0 col-md-6">
                <label for="name">Data</label>
                <input
                  id="date"
                  v-model="startDate"
                  type="date"
                  class="form-control _rounded"
                />
              </div>
              <div class="form-group mb-0 col-md-6">
                <label for="birth-date">Hora</label>
                <input
                  id="time"
                  v-model="startTime"
                  type="time"
                  class="form-control _rounded"
                />
              </div>
            </div>
          </div>
          <div class="mt-3">
            <h5>Término</h5>
            <div class="form-row">
              <div class="form-group mb-0 col-md-6">
                <label for="name">Data</label>
                <input
                  id="date"
                  v-model="endDate"
                  type="date"
                  class="form-control _rounded"
                  placeholder="Douglas Adams"
                />
              </div>
              <div class="form-group mb-0 col-md-6">
                <label for="birth-date">Hora</label>
                <input
                  id="time"
                  v-model="endTime"
                  type="time"
                  class="form-control _rounded"
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="mt-2">
            <div class="form-row">
              <div class="form-group mb-0 col-md-12">
                <label for="patient">Acolhido</label>
                <SingleSelect
                  id="patient"
                  v-model="patient"
                  :options="patientOptions"
                ></SingleSelect>
              </div>
            </div>
            <div class="form-row mt-2">
              <div class="form-group mb-0 col-md-12">
                <label for="volunteer">Voluntário</label>
                <SingleSelect
                  id="volunteer"
                  v-model="volunteer"
                  :options="volunteerOptions"
                ></SingleSelect>
              </div>
            </div>
            <div class="form-row mt-2">
              <div class="form-group mb-0 col-md-12">
                <label for="room">Sala</label>
                <SingleSelect
                  id="room"
                  v-model="room"
                  :options="roomOptions"
                ></SingleSelect>
              </div>
            </div>
          </div>
          <hr />
          <label for="">Repetir por</label>
          <b-form-select
            v-model="repeat"
            class="_rounded"
            :options="repeatOptions"
          ></b-form-select>
        </form>
        <template v-slot:modal-footer="{ ok, cancel }">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <b-button variant="light" class="_rounded-100" @click="cancel()">
              Cancelar
            </b-button>
            <b-button
              variant="default"
              class="add-btn _rounded-100 d-flex align-items-center"
              @click="create()"
            >
              <plus-icon size="1.5x" class="add-icon mr-1"></plus-icon>
              Adicionar atendimento
            </b-button>
          </div>
        </template>
      </b-modal>
    </article>
  </div>
</template>

<script>
// Icons
import { CalendarIcon, PlusIcon } from 'vue-feather-icons';

// Calendar
import Calendar from '@/components/Calendar.vue';

// SingleSelect
import SingleSelect from '@/components/SingleSelect.vue';

// Moment
import moment from 'moment';

export default {
  name: 'Schedule',
  components: {
    Calendar,
    CalendarIcon,
    PlusIcon,
    SingleSelect,
  },
  data() {
    return {
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

      this.$bvModal.show('create');
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
