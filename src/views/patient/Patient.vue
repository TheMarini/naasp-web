<template lang="html">
  <div class="voluntarios p-4">
    <header class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <heart-icon size="2.3x" class="title-icon"></heart-icon>
        <h2 class="ml-3 mb-0"><b>Acolhidos</b></h2>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <router-link :to="'/acolhido/rapido'" class="ml-2">
          <button
            type="button"
            name="button"
            class="quick-btn btn py-2 px-3 d-flex align-items-center _rounded-100"
          >
            <clipboard-icon size="1.5x" class="custom-class"></clipboard-icon>
            <h5 class="mb-0 px-2"><b>Pré-cadastro</b></h5>
          </button>
        </router-link>
        <router-link :to="'/acolhido/adicionar'" class="ml-2">
          <button
            type="button"
            name="button"
            class="add-btn btn py-2 px-3 d-flex align-items-center _rounded-100"
          >
            <plus-icon size="1.5x" class="add-icon"></plus-icon>
            <h5 class="mb-0 px-2"><b>Adicionar</b></h5>
          </button>
        </router-link>
      </div>
    </header>
    <article class="mt-4">
      <b-table
        class="table _rounded bg-white"
        :items="patients"
        :fields="fields"
        :busy="isBusy"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        primary-key="id"
        head-variant="dark"
        responsive
        bordered
        hover
        show-empty
      >
        <template v-slot:cell(priority)="data">
          <b-badge :variant="priorityClass(data.item.priority)">
            {{ priorityText(data.item.priority) }}
          </b-badge>
        </template>
        <template v-slot:cell(status)="data">
          <b-badge pill variant="light">
            {{ data.item.status }} - {{ statusText(data.item.status) }}
          </b-badge>
        </template>
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
    </article>
  </div>
</template>

<script>
// Icons
import {
  PlusIcon,
  EditIcon,
  Trash2Icon,
  ClipboardIcon,
  HeartIcon,
} from 'vue-feather-icons';

// FakeDB
import fakedb from '@/fakedb/welcomed.json';

export default {
  name: 'Patient',
  components: {
    PlusIcon,
    EditIcon,
    Trash2Icon,
    ClipboardIcon,
    HeartIcon,
  },
  data() {
    return {
      patients: [],
      fields: [
        {
          key: 'Pessoa.nome',
          label: 'Nome',
          sortable: true,
        },
        {
          key: 'cpf',
          label: 'CPF',
        },
        {
          key: 'cellPhoneNumber',
          label: 'Telefone Celular',
        },
        {
          key: 'email',
          label: 'E-mail',
        },
        {
          key: 'priority',
          label: 'Prioridade',
          sortable: true,
        },
        {
          key: 'status',
          label: 'Estado',
          sortable: true,
        },
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
  mounted() {
    this.update();
  },
  methods: {
    update() {
      this.isBusy = true;

      this.$axios
        .get('/acolhido')
        .then((response) => {
          this.patients = response.data;
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

          // DEBUG
          // console.error(error);
          // console.warn('[WARN]', 'Error with request, using fake databse...');
          this.patients = fakedb;
        });

      this.isBusy = false;
    },
    destroy(id) {
      this.$swal({
        title:
          "<span>Realmente deseja <span style='color: indianred'>deletar</span><span>?",
        text: 'Esta ação não poderá ser revertida!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'indianred',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.$axios
            .delete(`/acolhido?id=${id}`)
            .then(() => {
              this.$toast({
                icon: 'success',
                title: 'Acolhido deletado com sucesso',
              });

              this.update();
            })
            .catch((error) => {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                this.$toast({
                  icon: 'error',
                  title: 'Erro ao deletar o acolhido',
                  text: `${error.response.status} - ${error.response.statusText}`,
                });
              } else if (error.request) {
                // The request was made but no response was received
                this.$toast({
                  icon: 'error',
                  title: 'Erro ao deletar o acolhido',
                  text: 'Não houve resposta da requisição',
                });
              } else {
                // Something happened in setting up the request that triggered an Error
                this.$toast({
                  icon: 'error',
                  title: 'Erro ao deletar o acolhido',
                  text: 'Problema na configuração da requisição',
                });
              }
            });
        }
      });
    },
    priorityClass(level) {
      switch (level) {
        case 0:
          return 'danger';
        case 1:
          return 'warning';
        case 2:
          return 'secondary';
        case 3:
          return 'info';
        default:
          return 'light';
      }
    },
    // TODO: This info bellow should be in the database
    priorityText(level) {
      switch (level) {
        case 0:
          return 'Urgente';
        case 1:
          return 'Alta';
        case 2:
          return 'Média';
        case 3:
          return 'Baixa';
        default:
          return '';
      }
    },
    // TODO: This info bellow should be in the database
    statusText(level) {
      switch (level) {
        case 1:
          return 'Desistente';
        case 2:
          return 'Primeiro contato';
        case 3:
          return 'Esperando triagem';
        case 4:
          return 'Em triagem';
        case 5:
          return 'Esperando atendimento';
        case 6:
          return 'Em atendimento';
        case 7:
          return 'Alta médica';
        case 0:
        default:
          return 'Indefinido';
      }
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
  color: #707070;
}

.title-icon {
  stroke-width: 3px;
}

.quick-btn {
  color: #175d2b;
  border: 3px solid #175d2b;
}

.add-btn {
  color: white;
  background-color: #175d2b;
}

/* Table */
.table >>> tr[role='row']:not(.b-table-details) {
  cursor: pointer !important;
}
</style>
