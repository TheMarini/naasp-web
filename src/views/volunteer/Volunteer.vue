<template lang="html">
  <div class="voluntarios p-4">
    <header class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <users-icon size="2.3x" class="title-icon"></users-icon>
        <h2 class="ml-3 mb-0"><b>Voluntários</b></h2>
      </div>
      <router-link :to="'/voluntario/adicionar'">
        <button type="button" name="button"
          class="add-btn btn py-2 px-3 d-flex align-items-center _rounded-100"
        >
          <plus-icon size="1.5x" class="add-icon"></plus-icon>
          <h5 class="mb-0 px-2"><b>Adicionar</b></h5>
        </button>
      </router-link>
    </header>
    <article class="mt-4">
      <b-table
        class="_rounded bg-white"
        :items="volunteers"
        :fields="fields"
        :busy="isBusy"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        primary-key="id"
        head-variant="dark"
        responsive bordered hover show-empty
      >
        <template v-slot:cell(actions)="data">
          <router-link :to="`/voluntario/editar/${data.item.idPerson}`">
            <button type="button" name="button" class="edit-btn btn" title="Editar">
              <edit-icon size="1.5x" class="edit-icon"></edit-icon>
            </button>
          </router-link>
          <button
            @click="deleteData(data.index)"
            class="edit-btn btn" title="Deletar"
            type="button" name="button"
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
    </article>
  </div>
</template>

<script>
// Icons
import {
  UsersIcon, PlusIcon, EditIcon, Trash2Icon,
} from 'vue-feather-icons';

// Axios
import axios from 'axios';

// FakeDB
import fakedb from '@/fakedb/welcomed.json';

// BUGFIX: same URL as Vue CLI Service for CORS using proxy (look at "vue.config.js" file)
axios.defaults.baseURL = 'http://localhost:4242';

export default {
  name: 'Volunteer',
  components: {
    UsersIcon,
    PlusIcon,
    EditIcon,
    Trash2Icon,
  },
  mounted() {
    this.update();
  },
  data() {
    return {
      volunteers: [],
      fields: [
        {
          key: 'name',
          label: 'Nome',
          sortable: true,
        },
        {
          key: 'age',
          label: 'Idade',
          sortable: true,
        },
        'RG',
        'CPF',
        'email',
        {
          key: 'actions',
          label: 'Ações',
        },
      ],
      isBusy: true,
      sortBy: 'priority',
      sortDesc: false,
    };
  },
  methods: {
    update() {
      axios.get('/volunteer')
        .then((response) => {
          this.patients = response.data;
        }).catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.$toast({
              icon: 'error',
              title: 'Erro ao obter a lista de voluntários',
              text: `${error.response.status} - ${error.response.statusText}`,
            });
          } else if (error.request) {
            // The request was made but no response was received
            this.$toast({
              icon: 'error',
              title: 'Erro ao obter a lista de voluntários',
              text: 'Não houve resposta da requisição',
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            this.$toast({
              icon: 'error',
              title: 'Erro ao obter a lista de voluntários',
              text: 'Problema na configuração da requisição',
            });
          }

          // DEBUG
          console.error(error);
          console.warn('[WARN]', 'Error with request, using fake databse...');
          this.volunteers = fakedb;
        });

      this.isBusy = false;
    },
    deleteData(id) {
      this.$swal({
        title: "<span>Realmente deseja <span style='color: indianred'>deletar</span><span>?",
        text: 'Esta ação não poderá ser revertida!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'indianred',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          axios.delete(`/patient/${id}`)
            .then(() => {
              this.$toast({
                icon: 'success',
                title: 'Voluntário deletado com sucesso',
              });
            }).catch((error) => {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                this.$toast({
                  icon: 'error',
                  title: 'Erro ao deletar o voluntário',
                  text: `${error.response.status} - ${error.response.statusText}`,
                });
              } else if (error.request) {
                // The request was made but no response was received
                this.$toast({
                  icon: 'error',
                  title: 'Erro ao deletar o voluntário',
                  text: 'Não houve resposta da requisição',
                });
              } else {
                // Something happened in setting up the request that triggered an Error
                this.$toast({
                  icon: 'error',
                  title: 'Erro ao deletar o voluntário',
                  text: 'Problema na configuração da requisição',
                });
              }
            });
        }
      });
    },
  },
};
</script>

<style lang="css" scoped>
/* Busy table styling */
table.b-table[aria-busy='true'] {
  opacity: 0.6;
}

header {
  color: #707070
}

.title-icon {
  stroke-width: 3px
}

.add-btn {
  color: white;
  background-color: #175D2B;
}
</style>
