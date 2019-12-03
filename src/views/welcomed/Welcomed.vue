<template lang="html">
	<div class="voluntarios p-4">
		<header class="d-flex justify-content-between align-items-center">
			<div class="d-flex align-items-center">
				<users-icon size="2.3x" class="title-icon"></users-icon>
				<h2 class="ml-3 mb-0"><b>Acolhidos</b></h2>
			</div>
			<router-link :to="'/acolhido/adicionar'">
				<button type="button" name="button" class="add-btn btn py-2 px-3 d-flex align-items-center _rounded-100">
					<plus-icon size="1.5x" class="add-icon"></plus-icon>
					<h5 class="mb-0 px-2"><b>Adicionar</b></h5>
				</button>
			</router-link>
		</header>
		<article class="mt-4">
			<b-table
				class="table _rounded bg-white"
				:items="welcomed"
				:fields="fields"
				:busy="isBusy"
				:sort-by.sync="sortBy"
      	:sort-desc.sync="sortDesc"
				primary-key="id"
				head-variant="dark"
				responsive bordered hover
			>
				<template v-slot:cell(priority)="data">
					<b-badge :variant="priorityClass(data.item.priority)">{{priorityText(data.item.priority)}}</b-badge>
	      </template>
				<template v-slot:cell(status)="data">
					<b-badge pill variant="light">{{data.item.status}} - {{statusText(data.item.status)}}</b-badge>
				</template>
				<template v-slot:cell(actions)="data">
					<router-link :to="`/acolhido/editar/${data.item.id}`">
						<button type="button" name="button" class="edit-btn btn" title="Editar">
							<edit-icon size="1.5x" class="edit-icon"></edit-icon>
						</button>
					</router-link>
					<button @click="deleteData(data.index)" type="button" name="button" class="edit-btn btn" title="Deletar">
						<trash-2-icon size="1.5x" class="delete-icon"></trash-2-icon>
					</button>
	      </template>
				<template v-slot:table-busy>
	        <div class="text-center text-dark my-2">
	          <b-spinner class="align-middle"></b-spinner>
	          <strong>Carregando...</strong>
	        </div>
	      </template>
			</b-table>
		</article>
	</div>
</template>

<script>
// FakeDB
import fakedb from '@/fakedb/welcomed.json';

import { UsersIcon, PlusIcon, EditIcon, Trash2Icon, } from 'vue-feather-icons'

import moment from 'moment';

import axios from 'axios';
// BUGFIX: same Vue CLI Service URL for CORS with Cue CLI proxy (look at "vue.config.js" file)
axios.defaults.baseURL = 'http://localhost:4242';

export default {
	name: 'welcomed',
	components: {
		UsersIcon,
		PlusIcon,
		EditIcon,
		Trash2Icon,
	},
	mounted () {
		this.update();
	},
	watch: {
    $route(to, from) {
      this.update();
    }
  },
	data() {
		return {
			welcomed: [],
			sortBy: "priority",
      sortDesc: false,
			fields: [
        {
          key: 'name',
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
		}
	},
	methods: {
		async update () {
			this.isBusy = true;
			try {
				await axios.get('/welcomed')
					.then(response => {
						this.welcomed = response.data;

						let persons = [];

						for (let w of this.welcomed) {
							persons.push(
								axios.get(`/person/?id=${w.idWelcomed}`)
									.then(response => {
										let person = response.data;
										person.age = moment().diff(new Date(person.birthDate), 'years');

										return person;
									})
									.catch(console.log)
							)
						}

						Promise.all(persons).then(persons => {
							this.welcomed = persons;
							this.isBusy = false;
						});
					})
			} catch (e) {
				console.error(e);
				console.warn("[WARN]", "Error with request, using fake databse...");

				this.welcomed = fakedb;
				this.isBusy = false;
			} finally {
				console.log("Welcomed:", this.welcomed);
			}
		},
		deleteData (index) {
			let acolhido = this.acolhidos[index];
			axios.delete(`/welcomed/?id=${acolhido.idWelcomed}`)
				.then(response => {
					if (response.status == 200)
						this.update();
				})
				.catch(console.log);
		},
		priorityClass (level) {
			switch (level) {
				case 0:
					return 'danger';
					break;
				case 1:
					return 'warning';
					break;
				case 2:
					return 'secondary';
					break;
				case 3:
					return 'info';
					break;
			}
		},
		// TODO: This info bellow should be in the database
		priorityText (level) {
			switch (level) {
				case 0:
					return 'Urgente';
					break;
				case 1:
					return 'Alta';
					break;
				case 2:
					return 'Média';
					break;
				case 3:
					return 'Baixa';
					break;
			}
		},
		// TODO: This info bellow should be in the database
		statusText (level) {
			switch (level) {
				case 1:
					return 'Desistente';
					break;
				case 2:
					return 'Primeiro contato';
					break;
				case 3:
					return 'Esperando triagem';
					break;
				case 4:
					return 'Em triagem';
					break;
				case 5:
					return 'Esperando atendimento';
					break;
				case 6:
					return 'Em atendimento';
					break;
				case 7:
					return 'Alta médica';
					break;

				case 0:
				default:
					return 'Indefinido';
					break;
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
	color: #707070
}

.title-icon {
	stroke-width: 3px
}

.add-btn {
	color: white;
	background-color: #175D2B;
}

/* Table */
.table >>> tr[role="row"]:not(.b-table-details) {
	cursor: pointer !important;
}
</style>
