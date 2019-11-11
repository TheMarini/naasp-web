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
				<div @click="currentStep--" v-if="currentStep > 1" class="d-inline-flex prev-btn mb-2">
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
					:sex.sync="form.sex"
					:work.sync="form.work"
					:school.sync="form.school"
					:civil.sync="form.civil"
					:religion.sync="form.religion"
					:end.sync="form.end"
					:cep.sync="form.CEP"
					:email.sync="form.email"
					:tel1.sync="form.tel1"
					:tel2.sync="form.tel2"
					:birthDate.sync="form.birthDate"
					:nameResp.sync="form.responsible.name"
					:rgResp.sync="form.responsible.RG"
				></form-step-1>
				<form-step-2
					v-show="currentStep === 2"
					:home.sync="form.home"
				></form-step-2>
				<form-step-3
					v-show="currentStep === 3"
					:physicalActivity.sync="form.physicalActivity"
					:medicines.sync="form.medicines"
					:qtdCigarettes.sync="form.qtdCigarettes"
					:qtdDrinks.sync="form.qtdDrinks"
					:familyAbuse.sync="form.familyAbuse"
					:familyDiseases.sync="form.familyDiseases"
					:familyMedicines.sync="form.familyMedicines"
				></form-step-3>
				<form-step-4
					v-show="currentStep === 4"
					:parish.sync="form.parish"
					:religiousActivities.sync="form.religiousActivities"
				></form-step-4>
				<form-step-5
					v-show="currentStep === 5"
					:demands.sync="form.demands"
					:comments.sync="form.comments"
				></form-step-5>
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
			<button v-else-if="addMethod" @click="adicionar" type="button" name="button" class="add-btn btn py-2 px-3 d-flex align-items-center _rounded-100">
				<plus-icon size="1.5x" class="add-icon"></plus-icon>
				<h5 class="mb-0 px-2"><b>Adicionar</b></h5>
			</button>
			<button v-else @click="editar" type="button" name="button" class="edit-btn btn py-2 px-3 pl-4 d-flex align-items-center _rounded-100">
				<edit-icon size="1.5x" class="edit-icon"></edit-icon>
				<h5 class="mb-0 px-2"><b>Editar</b></h5>
			</button>
		</footer>
	</div>
</template>

<script>
import Step from '@/components/Step.vue';

import FormStep1 from '@/views/acolhido/step/AcolhidoStep1.vue';
import FormStep2 from '@/views/acolhido/step/AcolhidoStep2.vue';
import FormStep3 from '@/views/acolhido/step/AcolhidoStep3.vue';
import FormStep4 from '@/views/acolhido/step/AcolhidoStep4.vue';
import FormStep5 from '@/views/acolhido/step/AcolhidoStep5.vue';

import { UsersIcon, PlusIcon, ChevronRightIcon, ArrowLeftIcon, HeartIcon, EditIcon } from 'vue-feather-icons'

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
		EditIcon,
		FormStep1,
		FormStep2,
		FormStep3,
		FormStep4,
		FormStep5,
	},
	props: {
		// Add or edit method
		addMethod: {
			type: Boolean,
			default: true,
		},
	},
	mounted () {
		this.acolhidoId = this.$route.params.id;
	},
	data() {
		return {
			acolhidoId: null,
			steps: 5,
			currentStep: 1,
			form: {
				responsible: {}
			},
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

.edit-btn {
	color: black;
	background-color: #E3DB4A;
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
