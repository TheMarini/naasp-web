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
			<div class="_card p-3">
				<b-table
					class="_rounded"
					:items="items"
					:fields="fields"
					:busy="isBusy"
					primary-key="id"
					head-variant="dark"
					fixed responsive bordered hover
				>
				<template v-slot:cell(actions)="data">
					<router-link :to="`/acolhido/editar/${data.item.id}`">
						<button type="button" name="button" class="edit-btn btn" title="Editar">
							<edit-icon size="1.5x" class="edit-icon"></edit-icon>
						</button>
					</router-link>
					<button type="button" name="button" class="edit-btn btn" title="Deletar">
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
			</div>
		</article>
	</div>
</template>

<script>
import { UsersIcon, PlusIcon, EditIcon, Trash2Icon, } from 'vue-feather-icons'


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
				{
          key: 'actions',
          label: 'Ações',
        },
      ],
      items: [
        { id: 5, isActive: true, age: 40, name: 'Dickerson' },
        { id: 6, isActive: false, age: 21, name: 'Larsen' },
        { id: 7, isActive: false, age: 89, name: 'Geneva' },
        { id: 8, isActive: true, age: 38, name: 'Jami' }
      ],
			isBusy: false,
		}
	},
	methods: {
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
