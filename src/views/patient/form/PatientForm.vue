<template lang="html">
  <div class="acolhido p-4">
    <header class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <heart-icon size="2.3x" class="title-icon"></heart-icon>
        <h2 class="ml-3 mb-0">
          <b>{{quickMode ? 'Pré-cadastrar' : editMode ? 'Editar' :  'Adicionar' }} acolhido</b>
        </h2>
      </div>
      <div class="steps d-flex">
        <step
          class="step ml-2"
          v-for="index of steps"
          :key="index"
          :number="index"
          :active="index <= currentStep"
          :editMode="editMode"
          @click.native="currentStep = index"
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

        <!-- <VueCodeHighlight>
         {{JSON.stringify(welcomed, null, 2)}}
        </VueCodeHighlight> -->

        <!-- TODO: consider switch to a nested vue-router -->
        <QuickForm
          v-show="quickMode"
          :responsibleForm="true"
          :name.sync="patient.name"
          :rg.sync="patient.rg"
          :cpf.sync="patient.cpf"
          :sex.sync="patient.sex"
          :matrialStatus.sync="patient.matrialStatus"
          :educationLevel.sync="patient.educationLevel"
          :jobRole.sync="patient.jobRole"
          :birthDate.sync="patient.birthDate"
          :age.sync="patient.age"
          :isUnderAge.sync="patient.isUnderAge"
          :religion.sync="patient.religion"
          :placeOfBirth.sync="patient.placeOfBirth"
          :nationality.sync="patient.nationality"
          :publicPlace.sync="patient.address.publicPlace"
          :addressNumber.sync="patient.address.number"
          :addressComplement.sync="patient.address.complement"
          :neighborhood.sync="patient.address.neighborhood"
          :city.sync="patient.address.city"
          :state.sync="patient.address.state"
          :cep.sync="patient.address.cep"
          :cellPhoneNumber.sync="patient.cellPhoneNumber"
          :homePhoneNumber.sync="patient.homePhoneNumber"
          :businessPhoneNumber.sync="patient.businessPhoneNumber"
          :email.sync="patient.email"
          :responsibleName.sync="patient.responsible.name"
          :responsibleRg.sync="patient.responsible.rg"
          :responsibleCpf.sync="patient.responsible.cpf"
        ></QuickForm>

        <PersonalDataForm
          v-show="currentStep === 1 && !quickMode"
          :responsibleForm="true"
          :name.sync="patient.name"
          :rg.sync="patient.rg"
          :cpf.sync="patient.cpf"
          :sex.sync="patient.sex"
          :matrialStatus.sync="patient.matrialStatus"
          :educationLevel.sync="patient.educationLevel"
          :jobRole.sync="patient.jobRole"
          :birthDate.sync="patient.birthDate"
          :age.sync="patient.age"
          :isUnderAge.sync="patient.isUnderAge"
          :religion.sync="patient.religion"
          :placeOfBirth.sync="patient.placeOfBirth"
          :nationality.sync="patient.nationality"
          :publicPlace.sync="patient.address.publicPlace"
          :addressNumber.sync="patient.address.number"
          :addressComplement.sync="patient.address.complement"
          :neighborhood.sync="patient.address.neighborhood"
          :city.sync="patient.address.city"
          :state.sync="patient.address.state"
          :cep.sync="patient.address.cep"
          :cellPhoneNumber.sync="patient.cellPhoneNumber"
          :homePhoneNumber.sync="patient.homePhoneNumber"
          :businessPhoneNumber.sync="patient.businessPhoneNumber"
          :email.sync="patient.email"
          :responsibleName.sync="patient.responsible.name"
          :responsibleRg.sync="patient.responsible.rg"
          :responsibleCpf.sync="patient.responsible.cpf"
        ></PersonalDataForm>

        <form-step-2
          v-show="currentStep === 2"
          :governmentBenefitName.sync="patient.money.governmentBenefit.name"
          :governmentBenefitValue.sync="patient.money.governmentBenefit.value"
          :familyIncomeComments.sync="patient.money.familyIncomeComments"
          :housingCondition.sync="patient.home.housingCondition"
        ></form-step-2>

        <form-step-3
          v-show="currentStep === 3"
          :physicalActivity.sync="patient.health.physicalActivity"
          :medicines.sync="patient.health.medicines"
          :qtdCigarettes.sync="patient.health.qtdCigarettes"
          :qtdDrinks.sync="patient.health.qtdDrinks"
          :familyAlcoholAbuse.sync="patient.health.family.alcoholAbuse"
          :familyDiseases.sync="patient.health.family.diseases"
          :familyMedicines.sync="patient.health.family.medicines"
        ></form-step-3>

        <form-step-4
          v-show="currentStep === 4"
          :parish.sync="patient.affiliation.parish"
          :religiousActivities.sync="patient.affiliation.religiousActivities"
        ></form-step-4>

        <form-step-5
          v-show="currentStep === 5"
          :priority.sync="patient.priority"
          :demands.sync="patient.others.demands"
          :comments.sync="patient.others.comments"
        ></form-step-5>
      </article>
    </div>
    <footer class="pt-4 pb-2 d-flex justify-content-between align-items-center">
      <router-link :to="'/acolhido'" @click.native="$destroy()">
        <button type="button" name="button" class="cancel-btn btn py-2
          px-3 d-flex align-items-center _rounded-100"
        >
          <h5 class="mb-0 px-2"><b>Cancelar</b></h5>
        </button>
      </router-link>
      <button v-if="currentStep < steps" @click="currentStep++"
        :style="[editMode ? { color: '#000', backgroundColor: '#E3DB4A' } : {}]"
        type="button" name="button" class="next-btn btn py-2 px-3 d-flex
        align-items-center _rounded-100"
      >
        <h5 class="mb-0 px-2"><b>Próxima</b></h5>
        <chevron-right-icon size="1.5x" class="custom-class"></chevron-right-icon>
      </button>
      <button  v-else-if="quickMode" @click="create" type="button" name="button"
        class="add-btn btn py-2 px-3 d-flex align-items-center _rounded-100"
      >
        <clipboard-icon size="1.5x" class="custom-class"></clipboard-icon>
        <h5 class="mb-0 px-2"><b>Pré-cadastrar</b></h5>
      </button>
      <button v-else-if="editMode" @click="update" type="button" name="button"
        class="edit-btn btn py-2 px-3 pl-4 d-flex align-items-center _rounded-100">
        <edit-icon size="1.5x" class="edit-icon"></edit-icon>
        <h5 class="mb-0 px-2"><b>Editar</b></h5>
      </button>
      <button v-else @click="create" type="button" name="button"
        class="add-btn btn py-2 px-3 d-flex align-items-center _rounded-100"
      >
        <plus-icon size="1.5x" class="add-icon"></plus-icon>
        <h5 class="mb-0 px-2"><b>Adicionar</b></h5>
      </button>
    </footer>
  </div>
</template>

<script>
// Icons
import {
  PlusIcon, ChevronRightIcon, ArrowLeftIcon, HeartIcon, EditIcon, ClipboardIcon,
} from 'vue-feather-icons';

// Step dot
import Step from '@/components/Step.vue';

// Quick form
import QuickForm from '@/components/forms/QuickForm.vue';

// Form Steps
import PersonalDataForm from '@/components/forms/PersonalDataForm.vue';
import FormStep2 from '@/views/patient/form/steps/PatientStep2.vue';
import FormStep3 from '@/views/patient/form/steps/PatientStep3.vue';
import FormStep4 from '@/views/patient/form/steps/PatientStep4.vue';
import FormStep5 from '@/views/patient/form/steps/PatientStep5.vue';

// Axios
import axios from 'axios';

// Code highlight
// import { component as VueCodeHighlight } from 'vue-code-highlight';

// BUGFIX: same URL as Vue CLI Service for CORS using proxy (look at "vue.config.js" file)
axios.defaults.baseURL = 'http://localhost:4242';

export default {
  name: 'PatientForm',
  components: {
    Step,
    PlusIcon,
    ChevronRightIcon,
    ArrowLeftIcon,
    HeartIcon,
    EditIcon,
    ClipboardIcon,
    QuickForm,
    PersonalDataForm,
    FormStep2,
    FormStep3,
    FormStep4,
    FormStep5,
    // VueCodeHighlight,
  },
  props: {
    // Add or edit method
    editMode: {
      type: Boolean,
      default: false,
    },
    quickMode: {
      type: Boolean,
      default: false,
    },
    steps: {
      type: Number,
      default: 5,
    },
    currentStep: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    if (this.editMode || this.$route.params.id != null) {
      this.retrieve(parseInt(this.$route.params.id, 10)).then((patient) => {
        this.patient = patient;
        console.log('Patient:', this.patient);
      });
    }

    if (this.quickMode) this.steps = 1;
  },
  data() {
    return {
      patient: {
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
    };
  },
  methods: {
    retrieve(id) {
      axios.get(`/welcomed/${id}`)
        .then((response) => response.data)
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.$toast({
              icon: 'error',
              title: 'Erro ao obter o acolhido',
              text: `${error.response.status} - ${error.response.statusText}`,
            });
          } else if (error.request) {
            // The request was made but no response was received
            this.$toast({
              icon: 'error',
              title: 'Erro ao obter o acolhido',
              text: 'Não houve resposta da requisição',
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            this.$toast({
              icon: 'error',
              title: 'Erro ao obter o acolhido',
              text: 'Problema na configuração da requisição',
            });
          }
        });
    },
    create() {
      axios.post('/patient', this.form)
        .then((response) => {
          console.log(response);

          if (response.status === 200) {
            this.$destroy();
            this.$router.push('/acolhido');
          }
        })
        .catch(console.log);
    },
    update() { },
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
