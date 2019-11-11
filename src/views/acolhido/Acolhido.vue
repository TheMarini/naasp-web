<template lang="html">
	<div class="acolhidos">

	</div>
</template>

<script>
// TODO: verify if has a away to do this import as global
// Axios
import axios from 'axios';
// BUGFIX: same Vue CLI Service URL for CORS with Cue CLI proxy (look at "vue.config.js" file)
axios.defaults.baseURL = 'http://localhost:4242';

export default {
	name: 'acolhidos',
	data() {
		return {

		}
	},
	methods: {
	},
};
</script>

<style lang="css" scoped>

</style>
