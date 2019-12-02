<template lang="html">
	<div class="acolhido p-4">
		<header class="d-flex justify-content-between align-items-center">
			<div class="d-flex align-items-center">
				<heart-icon size="2.3x" class="title-icon"></heart-icon>
				<h2 class="ml-3 mb-0"><b>{{addMethod ? 'Adicionar' : 'Editar' }} acolhido</b></h2>
			</div>
			<div class="steps d-flex">
				<step
					class="step ml-2"
					v-for="index of steps"
					@click.native="currentStep = index"
					:number="index"
					:active="index <= currentStep"
					:addMethod="addMethod"
				></step>
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
				<vue-code-highlight>
				 {{JSON.stringify(form, null, 2)}}
				</vue-code-highlight>
				<PersonalDataForm
					v-show="currentStep === 1"
					:responsibleForm="true"
					:name.sync="form.person.name"
					:rg.sync="form.person.RG"
					:cpf.sync="form.person.CPF"
					:sex.sync="form.person.sex"
					:civil.sync="form.person.matrialStatus"
					:school.sync="form.person.degree"
					:work.sync="form.person.profession"
					:birthDate.sync="form.person.birthDate"
					:religion.sync="form.person.religion"
					:placeOfBirth.sync="form.person.placeOfBirth"
					:nationality.sync="form.person.nationality"
					:end.sync="form.address.street"
					:neighborhood.sync="form.address.neighborhood"
					:city.sync="form.address.city"
					:state.sync="form.address.state"
					:cep.sync="form.address.CEP"
					:cellPhoneNumber.sync="form.person.telephones[0]"
					:homePhoneNumber.sync="form.person.telephones[1]"
					:businessPhoneNumber.sync="form.person.telephones[2]"
					:email.sync="form.person.email"
					:nameResp.sync="form.person.responsible.name"
					:rgResp.sync="form.person.responsible.RG"
					:cpfResp.sync="form.person.responsible.CPF"
				></PersonalDataForm>

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
// Code highlight
import { component as VueCodeHighlight } from 'vue-code-highlight';

// Step dot
import Step from '@/components/Step.vue';

// Form Steps
import PersonalDataForm from '@/components/forms/PersonalDataForm.vue';
import FormStep2 from '@/views/welcomed/form/steps/WelcomedStep2.vue';
import FormStep3 from '@/views/welcomed/form/steps/WelcomedStep3.vue';
import FormStep4 from '@/views/welcomed/form/steps/WelcomedStep4.vue';
import FormStep5 from '@/views/welcomed/form/steps/WelcomedStep5.vue';

// Icons
import { UsersIcon, PlusIcon, ChevronRightIcon, ArrowLeftIcon, HeartIcon, EditIcon } from 'vue-feather-icons'

import axios from 'axios';
// BUGFIX: same Vue CLI Service URL for CORS with Cue CLI proxy (look at "vue.config.js" file)
axios.defaults.baseURL = 'http://localhost:4242';

export default {
	name: 'acolhidoControl',
	components: {
		VueCodeHighlight,
		Step,
		UsersIcon,
		PlusIcon,
		ChevronRightIcon,
		ArrowLeftIcon,
		HeartIcon,
		EditIcon,
		PersonalDataForm,
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
			// 	"address": {
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
				address: {},
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
			this.form.address.number = 12;
			this.form.address.neighborhood = "Limoeiro";
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
/* VueCodeHighlight theme */
@import url('../../../../node_modules/vue-code-highlight/themes/prism-tomorrow.css');

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
