<template lang="html">
	<div class="acolhido p-4">
		<header class="d-flex justify-content-between align-items-center">
			<div class="d-flex align-items-center">
				<heart-icon size="2.3x" class="title-icon"></heart-icon>
				<h2 class="ml-3 mb-0"><b>{{addMethod ? 'Adicionar' : 'Editar' }} acolhido</b></h2>
			</div>
			<div class="steps d-flex">
				<step v-for="index of steps" @click.native="currentStep = index" :number="index" :active="index <= currentStep" :addMethod="addMethod" class="step ml-2"></step>
			</div>
		</header>
		<div class="wrapper pt-4">
			<div class="infos">
				<p class="current-step">ETAPA {{currentStep}}</p>
			</div>
			<article>
				<div @click="currentStep--" v-if="currentStep > 1" class="d-flex prev-btn mb-2">
					<arrow-left-icon size="1.5x" class="custom-class"></arrow-left-icon>
					<p class="mb-0 ml-1">Voltar a etapa anterior</p>
				</div>
				<pre style="white-space: pre">
					{{JSON.stringify(form, null, 2)}}
				</pre>
				<form-step-1
					v-show="currentStep === 1"
					:name.sync="form.name"
					:rg.sync="form.RG"
					:cpf.sync="form.CPF"
					:nationality.sync="form.nationality"
					:naturality.sync="form.naturality"
					:street.sync="form.street"
					:neighborhood.sync="form.neighborhood"
					:cep.sync="form.CEP"
				></form-step-1>
			</article>
		</div>
		<footer class="pt-4 pb-2 d-flex justify-content-between align-items-center">
			<router-link :to="'/voluntario'" @click.native="$destroy()">
				<button type="button" name="button" class="cancel-btn btn py-2 px-3 d-flex align-items-center _rounded-100">
					<h5 class="mb-0 px-2"><b>Cancelar</b></h5>
				</button>
			</router-link>
			<button v-if="currentStep < steps" @click="currentStep++" :style="[addMethod ? {} : { color: '#000', backgroundColor: '#E3DB4A' }]" type="button" name="button" class="next-btn btn py-2 px-3 d-flex align-items-center _rounded-100">
				<h5 class="mb-0 px-2"><b>Próxima</b></h5>
				<chevron-right-icon size="1.5x" class="custom-class"></chevron-right-icon>
			</button>
			<button v-else @click="{{addMethod ? adicionar : editar }}" type="button" name="button" class="add-btn btn py-2 px-3 d-flex align-items-center _rounded-100">
				<plus-icon size="1.5x" class="add-icon"></plus-icon>
				<h5 class="mb-0 px-2"><b>{{addMethod ? 'Adicionar' : 'Editar' }}</b></h5>
			</button>
		</footer>
	</div>
</template>

<script>
import Step from '@/components/Step.vue';

import FormStep1 from '@/views/acolhido/step/AcolhidoStep1.vue';

import { UsersIcon, PlusIcon, ChevronRightIcon, ArrowLeftIcon, HeartIcon } from 'vue-feather-icons'

import axios from 'axios';
// BUGFIX: same Vue CLI Service URL for CORS with Cue CLI proxy (look at "vue.config.js" file)
axios.defaults.baseURL = 'http://localhost:4242';

export default {
	name: 'acolhidoControl',
	components: {
		Step,
		UsersIcon,
		PlusIcon,
		ChevronRightIcon,
		ArrowLeftIcon,
		HeartIcon,
		FormStep1,
	},
	props: {
		// Add or edit method
		addMethod: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			steps: 5,
			currentStep: 1,
			form: {	},
		}
	},
	methods: {
		adicionar () { },
		editar () { },
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

.prev-btn {
	color: #707070;
	font-weight: 500;
	cursor: pointer;
}

.add-btn, .next-btn {
	color: white;
	background-color: #175D2B;
}

.cancel-btn {
	color: #707070;
	border: 4px solid #707070;
}

.step {
	height: 45px;
	width: 45px;
	cursor: pointer;
}

.infos .current-step {
	color: #707070;
	font-weight: 600
}
</style>
