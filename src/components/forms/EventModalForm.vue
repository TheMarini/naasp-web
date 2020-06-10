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
              v-model="startDate"
              type="date"
              class="form-control _rounded"
            />
          </div>
          <div class="form-group mb-0 col-md-6">
            <label for="start-time">Hora</label>
            <input
              id="start-time"
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
            <label for="end-date">Data</label>
            <input
              id="end-date"
              v-model="endDate"
              type="date"
              class="form-control _rounded"
            />
          </div>
          <div class="form-group mb-0 col-md-6">
            <label for="end-time">Hora</label>
            <input
              id="end-time"
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
            <multiselect
              id="room"
              v-model="room"
              :options="options.room"
              track-by="id"
              label="name"
              :taggable="true"
              tag-placeholder="Adicionar nova sala"
              placeholder="Escolha uma opção"
              select-label="Pressione enter para selecionar"
              selected-label="Selecionado"
              deselect-label="Pressione enter para remover seleção"
              @tag="createOption('room', $event)"
              @remove="destroyCreatedOption('room', $event)"
              @select="destroyUnnusedCreatedOptions('room')"
            >
            </multiselect>
            <!--             <SingleSelect
              id="room"
              v-model="room"
              :options="roomOptions"
            ></SingleSelect> -->
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
// Multiselect
import Multiselect from 'vue-multiselect';

// Moment
import moment from 'moment';

// Formats
const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';

export default {
  name: 'EventModalForm',
  components: {
    PlusIcon,
    SingleSelect,
    Multiselect,
  },
  props: {
    currentSessao: {
      type: Object,
      default: null,
    },
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
      required: true,
    },
    volunteerOptions: {
      type: Array,
      required: true,
    },
    roomOptions: {
      type: Array,
      default: () => this.retrieveRooms(),
    },
    start: {
      type: Date || String,
      default: () => new Date(),
    },
    end: {
      type: Date || String,
      default: () => new Date(),
    },
  },
  data() {
    return {
      options: {
        room: this.roomOptions,
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
    startToDate() {
      return moment(
        `${this.startDate} ${this.startTime}`,
        `${dateFormat} ${timeFormat}`
      ).toDate();
    },
    endToDate() {
      return moment(
        `${this.endDate} ${this.endTime}`,
        `${dateFormat} ${timeFormat}`
      ).toDate();
    },
    startDate: {
      get() {
        return moment(this.start).format('YYYY-MM-DD');
      },
      set() {
        this.$emit('update:start', this.startToDate);
      },
    },
    startTime: {
      get() {
        return moment(this.start).format('HH:mm');
      },
      set() {
        this.$emit('update:start', this.startToDate);
      },
    },
    endDate: {
      get() {
        return moment(this.end).format('YYYY-MM-DD');
      },
      set() {
        this.$emit('update:end', this.endToDate);
      },
    },
    endTime: {
      get() {
        return moment(this.end).format('HH:mm');
      },
      set() {
        this.$emit('update:end', this.endToDate);
      },
    },
    showModal: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  mounted() {
    /*     console.log(this.currentSessao.dataInicioSessao);
    if (this.currentSessao != null) {
      this.startDate = this.currentSessao.dataInicioSessao;
      this.startTime = this.currentSessao.horaInicioSessao;
      this.endDate = this.currentSessao.dataTerminoSessao;
      this.endTime = this.currentSessao.horaTerminoSessao;
    } */
  },
  methods: {
    createOption(attr, name) {
      // Destroy option previously created
      this.destroyUnnusedCreatedOptions(attr);

      const lastIndex = this.options[attr][this.options[attr].length - 1];

      const newId = lastIndex !== undefined ? lastIndex.id + 1 : 1;

      // New option
      const option = {
        id: newId,
        name,
        new: true,
      };

      // Add to array of options
      this.options[attr].push(option);
      // Set to current option
      this[attr] = option;
    },
    destroyCreatedOption(attr, option) {
      // Check if its new
      if (option.new) {
        // Find it in the array of options
        const index = this.options[attr].findIndex((o) => o.id === option.id);
        // Destroy
        this.options[attr].splice(index, 1);
      }
    },
    destroyUnnusedCreatedOptions(attr) {
      // For each option in array of options
      this.options[attr].forEach((item) => {
        // Destroy it if its new
        this.destroyCreatedOption(attr, item);
      });
    },
    calendarUnselect() {
      if (this.calendarApi) this.calendarApi.unselect();
    },
    clear() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    close() {
      this.showModal = false;
      this.$emit('update:currentSessao', null);
    },
    handleClose() {
      this.clear();
      this.calendarUnselect();
    },
    confirm() {
      const obj = {
        dataInicioSessao: this.startDate,
        horaInicioSessao: this.startTime,
        dataTerminoSessao: this.endDate,
        horaTerminoSessao: this.endTime,
        observacao: this.repeat,
        presenca: false,
        AcolhidoId: this.patient.id,
        VoluntarioId: this.volunteer.id,
        salaNome: this.room.name,
      };
      console.log(obj);
      this.$socket.emit('sessao', obj);
      this.close();
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
