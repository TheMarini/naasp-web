<template>
  <b-modal
    v-model="showModal"
    hide-header
    centered
    scrollable
    @hidden="handleClose"
  >
    <form>
      <div>
        <h5>Início</h5>
        <div class="form-row">
          <div class="form-group mb-0 col-md-6">
            <label for="start-date">Data</label>
            <input
              id="start-date"
              v-model="start.date"
              type="date"
              class="form-control _rounded"
            />
          </div>
          <div class="form-group mb-0 col-md-6">
            <label for="start-time">Hora</label>
            <input
              id="start-time"
              v-model="start.time"
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
            <label for="end-date">Data</label>
            <input
              id="end-date"
              v-model="end.date"
              type="date"
              class="form-control _rounded"
            />
          </div>
          <div class="form-group mb-0 col-md-6">
            <label for="end-time">Hora</label>
            <input
              id="end-time"
              v-model="end.time"
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
      <label for="repeat">Repetir por</label>
      <b-form-select
        id="repeat"
        v-model="repeat"
        :options="repeatsOptions"
        class="_rounded"
      ></b-form-select>
    </form>
    <template v-slot:modal-footer="{ cancel }">
      <div class="d-flex w-100 align-items-center justify-content-between">
        <b-button variant="light" class="_rounded-100" @click="cancel()">
          Cancelar
        </b-button>
        <b-button
          variant="default"
          class="add-btn _rounded-100 d-flex align-items-center"
          @click="confirm"
        >
          <plus-icon size="1.5x" class="add-icon mr-1"></plus-icon>
          Adicionar atendimento
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
// Icons
import { PlusIcon } from 'vue-feather-icons';

// SingleSelect
import SingleSelect from '@/components/SingleSelect.vue';

export default {
  name: 'EventModalForm',
  components: {
    PlusIcon,
    SingleSelect,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    calendarApi: {
      type: Object,
      default: null,
    },
    patientOptions: {
      type: Array,
      default: () => this.retrievePatients(),
    },
    volunteerOptions: {
      type: Array,
      default: () => this.retrieveVolunteers(),
    },
    roomOptions: {
      type: Array,
      default: () => this.retrieveRooms(),
    },
  },
  data() {
    return {
      start: {
        date: null,
        time: null,
      },
      end: {
        date: null,
        time: null,
      },
      patient: null,
      volunteer: null,
      room: null,
      repeat: null,
      repeatsOptions: [
        { value: null, text: 'Não se repete' },
        { value: 'day', text: 'Diariamente' },
        { value: 'week', text: 'Semanalmente' },
        { value: 'month', text: 'Mensalmente' },
        { value: 'businessDay', text: 'Dia útil (segunda a sexta-feita)' },
      ],
    };
  },
  computed: {
    showModal: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    calendarUnselect() {
      if (this.calendarApi) this.calendarApi.unselect();
    },
    clear() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    close() {
      this.showModal = false;
    },
    handleClose() {
      this.clear();
      this.calendarUnselect();
    },
    confirm() {
      this.close();
    },
    retrievePatients() {
      return [
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
      ];
    },
    retrieveVolunteers() {
      return [
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
      ];
    },
    retrieveRooms() {
      return [
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
      ];
    },
  },
};
</script>

<style scoped></style>
