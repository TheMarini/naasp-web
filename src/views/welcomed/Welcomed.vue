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
				class="_rounded bg-white"
				:items="welcomed"
				:fields="fields"
				:busy="isBusy"
				primary-key="idPerson"
				head-variant="dark"
				responsive bordered hover
			>
				<template v-slot:cell(actions)="data">
					<router-link :to="`/acolhido/editar/${data.item.idPerson}`">
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
		}
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
