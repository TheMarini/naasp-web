<template lang="html">
	<div class="voluntarios p-4">
		<header class="d-flex justify-content-between align-items-center">
			<div class="d-flex align-items-center">
				<users-icon size="2.3x" class="title-icon"></users-icon>
				<h2 class="ml-3 mb-0"><b>Voluntários</b></h2>
			</div>
			<router-link :to="'/voluntario/adicionar'">
				<button type="button" name="button" class="add-btn btn py-2 px-3 d-flex align-items-center _rounded-100">
					<plus-icon size="1.5x" class="add-icon"></plus-icon>
					<h5 class="mb-0 px-2"><b>Adicionar</b></h5>
				</button>
			</router-link>
		</header>
		<article class="mt-4">
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
		</article>
	</div>
</template>

<script>
import { UsersIcon, PlusIcon, EditIcon, Trash2Icon, } from 'vue-feather-icons'

import axios from 'axios';
// BUGFIX: same Vue CLI Service URL for CORS with Cue CLI proxy (look at "vue.config.js" file)
axios.defaults.baseURL = 'http://localhost:4242';

export default {
	name: 'voluntario',
	components: {
		UsersIcon,
		PlusIcon,
		EditIcon,
		Trash2Icon,
	},
	data() {
		return {
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
			items: [],
			isBusy: false,
		}
	},
	watch: {
		$route(to, from) {
			this.updateData();
		}
	},
	mounted () {
		this.updateData();
	},
	methods: {
		async updateData () {
			this.isBusy = true;
			axios.get('/employee')
				.then(async response => {
					this.voluntarios = response.data;
					console.log(this.voluntarios);
					let voluntarios = response.data;
					let persons = [];

					// for (var i = 0; i < voluntarios.length; i++) {
					// 	await axios.get(`/person/?id=${acolhidos[i].idWelcomed}`)
					// 		.then(response => {
					// 			response.data.age = moment().diff(new Date(response.data.birthDate), 'years');
					// 			persons.push(response.data);
					// 		})
					// 		.catch(console.log)
					// }
					setTimeout(() => {
						this.items = persons;
						this.isBusy = false;
						console.log(this.items)
					}, 1000);
				})
				.catch(console.log);
		},
		//
		// updateData () {
		// 	this.items = [{
		// 		"name": "Perdo Guerra",
		// 		"RG": 12345678,
		// 		"CPF": 12345678900,
		// 		"profession": "full stack developer",
		// 		"degree": "Software engineer Major",
		// 		"birthDate": "2000-05-08",
		// 		"age": 19,
		// 		"sex": "M",
		// 		"matrialStatus": "Solteiro",
		// 		"email": "pedrowar.pw@gmail.com",
		// 		"religion": "Agnóstico",
		// 		"telephones":
		// 			[
		// 				31988190055,
		// 				3136711768
		// 			]
		// 	}];

			// this.items = [
			// 	{
			// 		"adress": {
			// 			"number": 125,
			// 			"street": "Rua Dom Pedro II",
			// 			"neighborhood": "Centro",
			// 			"CEP": 34505000
			// 		},
			// 		"person": {
			// 			"name": "Perdo Guerra Machado Pinto",
			// 			"RG": 12345678,
			// 			"CPF": 12345678900,
			// 			"profession": "full stack developer",
			// 			"degree": "Software engineer Major",
			// 			"birthDate": "08/05/2000",
			// 			"sex": "M",
			// 			"matrialStatus": "Solteiro",
			// 			"email": "pedrowar.pw@gmail.com",
			// 			"religion": "Agnóstico",
			// 			"telephones":
			// 				[
			// 					31988190055,
			// 					3136711768
			// 				]
			// 		},
			// 		"employee": {
			// 			"profissionalSituation": "qqr coisa",
			// 			"schooling": "Superior em curso",
			// 			"availability": "STRING",
			// 			"dayTimeAvailability": "manhã",
			// 			"type": "medic"
			// 		}
			// 	}
			// ]
		// }
	},
};
</script>

<style lang="css" scoped>
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
