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
				<!-- <pre style="white-space: pre" class="bg-dark text-white p-2">
					{{JSON.stringify(form, null, 2)}}
				</pre> -->
				<form-step-1
					v-show="currentStep === 1"
					:name.sync="form.person.name"
					:rg.sync="form.person.RG"
					:cpf.sync="form.person.CPF"
					:sex.sync="form.person.sex"
					:work.sync="form.person.profession"
					:school.sync="form.person.degree"
					:civil.sync="form.person.matrialStatus"
					:religion.sync="form.person.religion"
					:end.sync="form.adress.street"
					:cep.sync="form.adress.CEP"
					:email.sync="form.person.email"
					:tel1.sync="form.person.telephones[0]"
					:tel2.sync="form.person.telephones[1]"
					:birthDate.sync="form.person.birthDate"
					:nameResp.sync="form.person.responsible.name"
					:rgResp.sync="form.person.responsible.RG"
				></form-step-1>
				<form-step-2
					v-show="currentStep === 2"
					:home.sync="form.welcomed.housingConditions"
				></form-step-2>
				<form-step-3
					v-show="currentStep === 3"
					:physicalActivity.sync="form.welcomed.physicalActivity"
					:medicines.sync="form.welcomed.medicines"
					:qtdCigarettes.sync="form.welcomed.cigarreteNumber"
					:qtdDrinks.sync="form.welcomed.qtdDrinks"
					:familyAbuse.sync="form.familyAbuse"
					:familyDiseases.sync="form.familyDiseases"
					:familyMedicines.sync="form.familyMedicines"
				></form-step-3>
				<form-step-4
					v-show="currentStep === 4"
					:parish.sync="form.welcomed.inParish"
					:religiousActivities.sync="form.welcomed.religiousActivities"
				></form-step-4>
				<form-step-5
					v-show="currentStep === 5"
					:demands.sync="form.others.demands"
					:comments.sync="form.others.comments"
				></form-step-5>
			</article>
		</div>
		<footer class="pt-4 pb-2 d-flex justify-content-between align-items-center">
			<router-link :to="'/acolhido'" @click.native="$destroy()">
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
			// form: {
			// 	responsible: {}
			// },
			// form: {
			// 	"adress": {
			// 		"number": 125,
			// 		"street": "Rua Dom Pedro II",
			// 		"neighborhood": "Centro",
			// 		"CEP": 34505000
			// 	},
			// 	"person": {
			// 		"name": "Perdo Guerra Machado Pinto",
			// 		"RG": 12345678,
			// 		"CPF": 12345678900,
			// 		"profession": "full stack developer",
			// 		"degree": "Software engineer Major",
			// 		"birthDate": "08/05/2000",
			// 		"sex": "M",
			// 		"matrialStatus": "Solteiro",
			// 		"email": "pedrowar.pw@gmail.com",
			// 		"religion": "Agnóstico",
			// 		"telephones":
			// 		[
			// 			31988190055,
			// 			3136711768
			// 		]
			// 	},
			// 	"welcomed": {
			// 		"housingConditions": "Própria",
			// 		"physicalActivity": "nope",
			// 		"areSmoker": "false",
			// 		"cigarreteNumber": null,
			// 		"onMedicine": "false",
			// 		"inParish": "false",
			// 		"inReligiousActivities": "false",
			// 		"religiousActivities": "",
			// 		"relatives":
			// 		[
			// 			{
			// 				"name": "Marini",
			// 				"kinship": "Santista",
			// 				"birthDate": "11/08/1995",
			// 				"profession": "Front end",
			// 				"liveTogether": "false"
			// 			}
			// 		]
			// 	}
			// }
			form: {
				adress: {},
				person: {
					telephones: [],
					responsible: {}
				},
				welcomed: {},
				others: {},
			}
		}
	},
	methods: {
		adicionar () {
			this.form.adress.number = 12;
			this.form.adress.neighborhood = "Limoeiro";
			this.form.welcomed.areSmoker = true;
			this.form.welcomed.onMedicine = true;
			this.form.welcomed.inReligiousActivities = true;
			this.form.welcomed.inParish = true;
			axios.post('/welcomed', this.form)
				.then(response => {
					console.log(response);

					if (response.status == 200) {
						this.$destroy();
						this.$router.push('/acolhido')
					}
				})
				.catch(console.log)
		},
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
