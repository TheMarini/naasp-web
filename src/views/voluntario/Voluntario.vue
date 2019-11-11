<template lang="html">
	<div class="voluntarios p-4">
		<header class="d-flex justify-content-between align-items-center">
			<div class="d-flex align-items-center">
				<users-icon size="2.3x" class="title-icon"></users-icon>
				<h2 class="ml-3 mb-0"><b>Voluntários</b></h2>
			</div>
			<div>
				<router-link :to="'/voluntario/adicionar'">
					<button type="button" name="button" class="add-btn btn py-2 px-3 d-flex align-items-center _rounded-100">
						<plus-icon size="1.5x" class="add-icon"></plus-icon>
						<h5 class="mb-0 px-2"><b>Adicionar</b></h5>
					</button>
				</router-link>
			</div>
		</header>
		<article>

		</article>
	</div>
</template>

<script>
import { UsersIcon, PlusIcon } from 'vue-feather-icons'


import axios from 'axios';
// BUGFIX: same Vue CLI Service URL for CORS with Cue CLI proxy (look at "vue.config.js" file)
axios.defaults.baseURL = 'http://localhost:4242';

export default {
	name: 'voluntario',
	components: {
		UsersIcon,
		PlusIcon
	},
	data() {
		return {

		}
	},
	methods: {
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
