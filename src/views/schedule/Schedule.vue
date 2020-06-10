<template>
  <div class="schedule p-4">
    <Header title="Agenda">
      <template #icon>
        <calendar-icon size="2.3x" class="title-icon"></calendar-icon>
      </template>
      <template #CTA>
        <div v-if="socketStatus.updated" class="d-flex align-itens-center">
          <span class="mr-1">Atualizado</span>
          <check-circle-icon
            size="1.5x"
            class="check-circle-icon"
          ></check-circle-icon>
        </div>
        <div
          v-else-if="socketStatus.connecting"
          class="d-flex align-itens-center"
        >
          <span class="mr-1">Conectando</span>
          <cloud-lightning-icon
            size="1.5x"
            class="cloud-lightning-icon"
          ></cloud-lightning-icon>
        </div>
        <div
          v-else-if="!socketStatus.connected"
          class="d-flex align-itens-center"
        >
          <span class="mr-1">Desconectado</span>
          <cloud-off-icon size="1.5x" class="cloud-off-icon"></cloud-off-icon>
        </div>
        <div
          v-else-if="socketStatus.downloading"
          class="d-flex align-itens-center"
        >
          <span class="mr-1">Baixando atualizações</span>
          <download-cloud-icon
            size="1.5x"
            class="download-cloud-icon"
          ></download-cloud-icon>
        </div>
        <div
          v-else-if="socketStatus.uploading"
          class="d-flex align-itens-center"
        >
          <span class="mr-1">Enviando atualizações</span>
          <upload-cloud-icon
            size="1.5x"
            class="upload-cloud-icon"
          ></upload-cloud-icon>
        </div>
        <div v-else class="d-flex align-itens-center">
          <span class="mr-1">Conectado</span>
          <cloud-icon size="1.5x" class="cloud-icon"></cloud-icon>
        </div>
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
        @click="click"
      ></Calendar>
      <EventModalForm
        v-model="showModal"
        :calendar-api="calendarApi"
        :patient-options="patientOptions"
        :volunteer-options="volunteerOptions"
        :room-options="roomOptions"
        :start.sync="selectedStart"
        :end.sync="selectedEnd"
        :current-sessao.sync="currentSessao"
      ></EventModalForm>
    </article>
  </div>
</template>

<script>
// Icons
import {
  CalendarIcon,
  CloudLightningIcon,
  CloudOffIcon,
  CloudIcon,
  UploadCloudIcon,
  DownloadCloudIcon,
  CheckCircleIcon,
} from 'vue-feather-icons';

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

moment.locale('pt-br');

// Formats
const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';

export default {
  name: 'Schedule',
  components: {
    Header,
    Calendar,
    EventModalForm,
    CalendarIcon,
    CloudLightningIcon,
    CloudOffIcon,
    UploadCloudIcon,
    DownloadCloudIcon,
    CloudIcon,
    CheckCircleIcon,
    SingleSelect,
  },
  data() {
    return {
      currentSessao: null,
      socketStatus: {
        connected: false,
        connecting: false,
        downloading: false,
        uploading: false,
        updated: false,
      },
      calendarApi: null,
      showModal: false,
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
      events: [],
      selectedStart: null,
      selectedEnd: null,
    };
  },
  computed: {
    start() {
      return null;
    },
  },
  mounted() {
    this.updateVolunteerOptions();
    this.updatePatientOptions();

    if (this.$socket.connected) {
      this.socketStatus.connected = true;
      this.socketStatus.downloading = true;
      this.$socket.emit('sessao');
      this.socketStatus.updated = true;
    } else {
      this.socketStatus.connecting = true;
    }
  },
  sockets: {
    connect() {
      this.socketStatus.connecting = false;
      this.socketStatus.connected = true;
    },
    disconnect() {
      this.socketStatus.updated = false;
      this.socketStatus.connected = false;
    },
    reconnecting() {
      this.socketStatus.connected = false;
      this.socketStatus.connecting = true;
    },
    sessao(sessao) {
      this.socketStatus.updated = false;
      this.socketStatus.uploading = true;

      this.events.push({
        title: `${sessao.Voluntario.tipo === 0 ? 'ES' : 'AS'} | ${
          sessao.Voluntario.Pessoa.nome
        }`,
        start: moment(
          `${sessao.dataInicioSessao} ${sessao.horaInicioSessao}`,
          `${dateFormat} ${timeFormat}`
        ).toDate(),
        end: moment(
          `${sessao.dataTerminoSessao} ${sessao.horaTerminoSessao}`,
          `${dateFormat} ${timeFormat}`
        ).toDate(),
        sessao,
      });

      this.socketStatus.uploading = false;
      this.socketStatus.updated = true;
    },
    login(sessoes) {
      this.socketStatus.updated = false;
      this.socketStatus.downloading = true;

      this.events = [];
      sessoes.forEach((sessao) => {
        this.events.push({
          title: `${sessao.Voluntario.tipo === 0 ? 'ES' : 'AS'} | ${
            sessao.Voluntario.Pessoa.nome
          }`,
          start: moment(
            `${sessao.dataInicioSessao} ${sessao.horaInicioSessao}`,
            `${dateFormat} ${timeFormat}`
          ).toDate(),
          end: moment(
            `${sessao.dataTerminoSessao} ${sessao.horaTerminoSessao}`,
            `${dateFormat} ${timeFormat}`
          ).toDate(),
          sessao,
        });
      });

      this.socketStatus.downloading = false;
      this.socketStatus.updated = true;
    },
  },
  methods: {
    select(info) {
      this.selectedStart = info.start;
      this.selectedEnd = info.end;
      this.showModal = true;
    },
    click(event) {
      // console.log(event.extendedProps.sessao);

      this.$swal({
        title: `<strong>${event.title}</strong>`,
        icon: 'info',
        html:
          `<b>Início: </b>${moment(event.start).format('llll')} </br>` +
          `<b>Fim: </b>${moment(event.end).format('llll')} </br>` +
          '<hr>' +
          `<b>Acolhido: </b>${event.extendedProps.sessao.Acolhido.Pessoa.nome} </br>` +
          `<b>Voluntário: </b>${event.extendedProps.sessao.Voluntario.Pessoa.nome} </br>` +
          `<b>Sala: </b>${event.extendedProps.sessao.Sala.nome}`,
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
      });
      /*       let msg = 'Início: ';
      msg += moment(event.extendedProps.sessao.dataInicioSessao).format(
        'DD/MM/YYY'
      );
      alert(msg); */

      // this.showModal = true;
      this.currentSessao = event.extendedProps.sessao;
    },
    updateVolunteerOptions() {
      this.$axios
        .get('/voluntario')
        .then((response) => {
          this.volunteerOptions = response.data.map((a) => ({
            name: a.Pessoa.nome,
            id: a.voluntario.id,
          }));
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.$toast({
              icon: 'error',
              title: 'Erro ao obter a lista de acolhidos',
              text: `${error.response.status} - ${error.response.statusText}`,
            });
          } else if (error.request) {
            // The request was made but no response was received
            this.$toast({
              icon: 'error',
              title: 'Erro ao obter a lista de acolhidos',
              text: 'Não houve resposta da requisição',
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            this.$toast({
              icon: 'error',
              title: 'Erro ao obter a lista de acolhidos',
              text: 'Problema na configuração da requisição',
            });
          }
        });
    },
    updatePatientOptions() {
      this.$axios
        .get('/acolhido')
        .then((response) => {
          this.patientOptions = response.data.map((a) => ({
            name: a.Pessoa.nome,
            id: a.id,
          }));
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.$toast({
              icon: 'error',
              title: 'Erro ao obter a lista de acolhidos',
              text: `${error.response.status} - ${error.response.statusText}`,
            });
          } else if (error.request) {
            // The request was made but no response was received
            this.$toast({
              icon: 'error',
              title: 'Erro ao obter a lista de acolhidos',
              text: 'Não houve resposta da requisição',
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            this.$toast({
              icon: 'error',
              title: 'Erro ao obter a lista de acolhidos',
              text: 'Problema na configuração da requisição',
            });
          }
        });
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
