<template lang="html">
	<div class="voluntarios p-4">
		<header class="d-flex justify-content-between align-items-center">
			<div class="d-flex align-items-center">
				<users-icon size="2.3x" class="title-icon"></users-icon>
				<h2 class="ml-3 mb-0"><b>Acolhidos</b></h2>
			</div>
			<div>
				<router-link :to="'/acolhido/adicionar'">
					<button type="button" name="button" class="add-btn btn py-2 px-3 d-flex align-items-center _rounded-100">
						<plus-icon size="1.5x" class="add-icon"></plus-icon>
						<h5 class="mb-0 px-2"><b>Adicionar</b></h5>
					</button>
				</router-link>
			</div>
		</header>
		<article class="mt-4">
			<!-- <div class="_card p-3"> -->
				<b-table
					class="_rounded bg-white"
					:items="items"
					:fields="fields"
					:busy="isBusy"
					primary-key="id"
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
			<!-- </div> -->
		</article>
	</div>
</template>

<script>
import { UsersIcon, PlusIcon, EditIcon, Trash2Icon, } from 'vue-feather-icons'

import moment from 'moment';

import axios from 'axios';
// BUGFIX: same Vue CLI Service URL for CORS with Cue CLI proxy (look at "vue.config.js" file)
axios.defaults.baseURL = 'http://localhost:4242';

export default {
	name: 'acolhido',
	components: {
		UsersIcon,
		PlusIcon,
		EditIcon,
		Trash2Icon,
	},
	mounted () {
		this.updateData();
	},
	watch: {
    $route(to, from) {
      this.updateData();
    }
  },
	data() {
		return {
			acolhidos: [],
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
      items: [

      ],
			isBusy: true,
		}
	},
	methods: {
		async updateData () {
			this.isBusy = true;
			axios.get('/welcomed')
				.then(async response => {
					this.acolhidos = response.data;
					console.log(this.acolhidos)
					let acolhidos = response.data;
					let persons = [];
					for (var i = 0; i < acolhidos.length; i++) {
						await axios.get(`/person/?id=${acolhidos[i].idWelcomed}`)
							.then(response => {
								response.data.age = moment().diff(new Date(response.data.birthDate), 'years');
								persons.push(response.data);
							})
							.catch(console.log)
					}
					setTimeout(() => {
						this.items = persons;
						this.isBusy = false;
						console.log(this.items)
					}, 1000);
				})
				.catch(console.log);
		},
		deleteData (index) {
			let acolhido = this.acolhidos[index];
			axios.delete(`/welcomed/?id=${acolhido.idWelcomed}`)
				.then(response => {
					if (response.status == 200)
						this.updateData();
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
