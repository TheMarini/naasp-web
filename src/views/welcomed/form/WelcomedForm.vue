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

				<VueCodeHighlight>
				 {{JSON.stringify(welcomed, null, 2)}}
				</VueCodeHighlight>

				<PersonalDataForm
					v-show="currentStep === 1"
					:responsibleForm="true"
					:name.sync="welcomed.name"
					:rg.sync="welcomed.rg"
					:cpf.sync="welcomed.cpf"
					:sex.sync="welcomed.sex"
					:matrialStatus.sync="welcomed.matrialStatus"
					:educationLevel.sync="welcomed.educationLevel"
					:jobRole.sync="welcomed.jobRole"
					:birthDate.sync="welcomed.birthDate"
					:religion.sync="welcomed.religion"
					:placeOfBirth.sync="welcomed.placeOfBirth"
					:nationality.sync="welcomed.nationality"
					:publicPlace.sync="welcomed.address.publicPlace"
					:addressNumber.sync="welcomed.address.number"
					:addressComplement.sync="welcomed.address.complement"
					:neighborhood.sync="welcomed.address.neighborhood"
					:city.sync="welcomed.address.city"
					:state.sync="welcomed.address.state"
					:cep.sync="welcomed.address.cep"
					:cellPhoneNumber.sync="welcomed.contact.phoneNumber.cell"
					:homePhoneNumber.sync="welcomed.contact.phoneNumber.home"
					:businessPhoneNumber.sync="welcomed.contact.phoneNumber.business"
					:email.sync="welcomed.contact.email"
					:responsibleName.sync="welcomed.responsible.name"
					:responsibleRg.sync="welcomed.responsible.rg"
					:responsibleCpf.sync="welcomed.responsible.cpf"
				></PersonalDataForm>

				<form-step-2
					v-show="currentStep === 2"
					:governmentBenefitName.sync="welcomed.money.governmentBenefit.name"
					:governmentBenefitValue.sync="welcomed.money.governmentBenefit.value"
					:familyIncomeComments.sync="welcomed.money.familyIncomeComments"
					:housingCondition.sync="welcomed.home.housingCondition"
				></form-step-2>

				<form-step-3
					v-show="currentStep === 3"
					:physicalActivity.sync="welcomed.health.physicalActivity"
					:medicines.sync="welcomed.health.medicines"
					:qtdCigarettes.sync="welcomed.health.qtdCigarettes"
					:qtdDrinks.sync="welcomed.health.qtdDrinks"
					:familyAlcoholAbuse.sync="welcomed.health.family.alcoholAbuse"
					:familyDiseases.sync="welcomed.health.family.diseases"
					:familyMedicines.sync="welcomed.health.family.medicines"
				></form-step-3>

				<form-step-4
					v-show="currentStep === 4"
					:parish.sync="welcomed.affiliation.parish"
					:religiousActivities.sync="welcomed.affiliation.religiousActivities"
				></form-step-4>

				<form-step-5
					v-show="currentStep === 5"
					:demands.sync="welcomed.others.demands"
					:comments.sync="welcomed.others.comments"
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
			welcomed: {
				address: {},
				contact: {
					phoneNumber: {},
				},
				responsible: {},
				family: {},
				money: {
					governmentBenefit: {},
				},
				home: {},
				health: {
					family: {},
				},
				affiliation: {},
				others: {},
			},
		}
	},
	methods: {
		adicionar () {
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
