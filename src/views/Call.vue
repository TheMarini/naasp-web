<template>
  <div class="call p-4">
    <Header title="Ligar para acolhido">
      <template #icon>
        <phone-call-icon size="2.3x" class="title-icon"></phone-call-icon>
      </template>
      <template #CTA>
        <button
          type="button"
          name="button"
          class="add-btn btn py-2 px-3 d-flex align-items-center _rounded-100"
          @click="$bvModal.show('create')"
        >
          <plus-icon size="1.5x" class="add-icon"></plus-icon>
          <h5 class="mb-0 px-2"><b>Registrar chamada</b></h5>
        </button>
      </template>
    </Header>
    <article class="mt-4">
      <b-modal id="create" hide-header>
        <form>
          <div class="form-row">
            <div class="form-group mb-0 col-md-6">
              <label for="name">Data</label>
              <input
                id="date"
                v-model="time"
                type="date"
                class="form-control _rounded"
                placeholder="Douglas Adams"
              />
            </div>
            <div class="form-group mb-0 col-md-6">
              <label for="birth-date">Hora</label>
              <input
                id="time"
                v-model="date"
                type="time"
                class="form-control _rounded"
              />
            </div>
          </div>
        </form>
        <template v-slot:modal-footer="{ ok, cancel }">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <b-button variant="light" class="_rounded-100" @click="cancel()">
              Cancelar
            </b-button>
            <b-button
              variant="default"
              class="add-btn _rounded-100 d-flex align-items-center"
              @click="ok()"
            >
              <plus-icon size="1.5x" class="add-icon mr-1"></plus-icon>
              Registrar chamada
            </b-button>
          </div>
        </template>
      </b-modal>
      <section class="d-flex">
        <div class="_card p-3 shadow-sm">
          <h3>{{ name }}</h3>
          <p class="mb-0">
            Preferência de contato: {{ contactTimePreference }}
          </p>
          <hr />
          <p class="mb-0">
            Telefone celular: {{ cellPhoneNumber }} <br />
            Telefone residencial: {{ homePhoneNumber }} <br />
            Telefone comercial: {{ businessPhoneNumber }}
          </p>
        </div>
      </section>
      <section class="mt-4 history">
        <h4 class="text-muted">Histórico de chamadas</h4>
        <b-table
          class="table _rounded bg-white"
          :items="history"
          :fields="fields"
          :busy="isBusy"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          primary-key="id"
          head-variant="light"
          responsive
          bordered
          hover
          fixed
          show-empty
        >
          <template v-slot:cell(actions)="data">
            <router-link :to="`/acolhido/editar/${data.item.id}`">
              <button
                type="button"
                name="button"
                class="edit-btn btn _rounded"
                title="Editar"
              >
                <edit-icon size="1.5x" class="edit-icon"></edit-icon>
              </button>
            </router-link>
            <button
              type="button"
              name="button"
              class="delete-btn btn _rounded"
              title="Deletar"
              @click="destroy(data.item.id)"
            >
              <trash-2-icon size="1.5x" class="delete-icon"></trash-2-icon>
            </button>
          </template>
          <template v-slot:table-busy>
            <div class="text-center text-dark my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Carregando...</strong>
            </div>
          </template>
          <template v-slot:empty>
            <p class="text-muted mb-0">Não há nenhum acolhido a ser exibido.</p>
          </template>
        </b-table>
      </section>
    </article>
  </div>
</template>

<script>
// Icons
import {
  PhoneCallIcon,
  PlusIcon,
  EditIcon,
  Trash2Icon,
} from 'vue-feather-icons';

// Header
import Header from '@/components/Header.vue';

// Moment
import moment from 'moment';

export default {
  name: 'Call',
  components: {
    Header,
    PhoneCallIcon,
    PlusIcon,
    EditIcon,
    Trash2Icon,
  },
  data() {
    return {
      name: 'Bruno Marini',
      cellPhoneNumber: '(31) 9 8384-8472',
      homePhoneNumber: '(31) 9 3287-1622',
      businessPhoneNumber: '(31) 9 3323-1542',
      contactTimePreference: 'Dia Útil - Tarde',
      datetime: null,
      history: [
        {
          date: moment().subtract(10, 'days').calendar(),
          time: moment().format('LTS'),
          user: 'Bruno Marini',
        },
        {
          date: moment().subtract(9, 'days').calendar(),
          time: moment().format('LTS'),
          user: 'Nayane Ornelas',
        },
      ],
      fields: [
        {
          key: 'date',
          label: 'Data',
          sortable: true,
        },
        {
          key: 'time',
          label: 'Hora',
          sortable: true,
        },
        {
          key: 'user',
          label: 'Secretária',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Ações',
        },
      ],
      isBusy: false,
      sortBy: 'date',
      sortDesc: false,
    };
  },
  methods: {
    create() {},
  },
};
</script>

<style scoped>
header {
  color: #707070;
}

.add-btn,
.add-btn:hover {
  background-color: cadetblue;
}

.title-icon {
  stroke-width: 3px;
}
</style>
