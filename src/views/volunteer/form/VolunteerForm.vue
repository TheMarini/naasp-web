<template lang="html">
  <div class="voluntarios p-4">
    <header class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <users-icon size="2.3x" class="title-icon"></users-icon>
        <h2 class="ml-3 mb-0"><b>{{updateMode ? 'Editar' : 'Adicionar' }} voluntário</b></h2>
      </div>
      <div class="steps d-flex">
        <step
          class="step ml-2"
          v-for="index of steps"
          :key="index"
          :number="index"
          :active="index <= currentStep"
          :updateMode="updateMode"
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

        <form-step-1
          v-show="currentStep === 1"
          :volunteerType.sync="volunteer.type"
          :volunteerSpecialties.sync="volunteer.specialties"
          :volunteerAgeRangesOfCare.sync="volunteer.ageRangesOfCare"
        ></form-step-1>

        <PersonalDataForm
          v-show="currentStep === 2"
          :name.sync="volunteer.name"
          :birthDate.sync="volunteer.birthDate"
          :age.sync="volunteer.age"
          :isUnderAge.sync="volunteer.isUnderAge"
          :cpf.sync="volunteer.cpf"
          :rg.sync="volunteer.rg"
          :gender.sync="volunteer.gender"
          :matrialStatus.sync="volunteer.matrialStatus"
          :educationLevel.sync="volunteer.education.level"
          :educationStatus.sync="volunteer.education.status"
          :jobRole.sync="volunteer.jobRole"
          :placeOfBirth.sync="volunteer.placeOfBirth"
          :nationality.sync="volunteer.nationality"
          :religion.sync="volunteer.religion"
          :publicPlace.sync="volunteer.address.publicPlace"
          :addressNumber.sync="volunteer.address.number"
          :addressComplement.sync="volunteer.address.complement"
          :neighborhood.sync="volunteer.address.neighborhood"
          :city.sync="volunteer.address.city"
          :state.sync="volunteer.address.state"
          :cep.sync="volunteer.address.cep"
          :cellPhoneNumber.sync="volunteer.contact.cellPhoneNumber"
          :homePhoneNumber.sync="volunteer.contact.homePhoneNumber"
          :businessPhoneNumber.sync="volunteer.contact.businessPhoneNumber"
          :email.sync="volunteer.email"
        ></PersonalDataForm>

        <!-- <form-step-3
          v-show="currentStep === 3"
          :availability.sync="volunteer.availability"
          :dayTime.sync="volunteer.dayTimeAvailability"
        ></form-step-3> -->
      </article>
    </div>
    <footer class="pt-4 pb-2 d-flex justify-content-between align-items-center">
      <router-link :to="'/voluntario'" @click.native="$destroy()">
        <button type="button" name="button" class="cancel-btn btn py-2 px-3 d-flex
          align-items-center _rounded-100"
        >
          <h5 class="mb-0 px-2"><b>Cancelar</b></h5>
        </button>
      </router-link>
      <button v-if="currentStep < steps" @click="currentStep++"
        :style="[updateMode ? { color: '#000', backgroundColor: '#E3DB4A' } : {}]"
        type="button" name="button" class="next-btn btn py-2 px-3 d-flex
        align-items-center _rounded-100"
      >
        <h5 class="mb-0 px-2"><b>Próxima</b></h5>
        <chevron-right-icon size="1.5x" class="custom-class"></chevron-right-icon>
      </button>
      <button v-else-if="updateMode" @click="update" type="button" name="button"
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

    <VueCodeHighlight v-show="false">
     {{JSON.stringify(volunteer, null, 2)}}
    </VueCodeHighlight>
  </div>
</template>

<script>
// Code highlight
import { component as VueCodeHighlight } from 'vue-code-highlight';

// Step dot
import Step from '@/components/Step.vue';

// Form Steps
import FormStep1 from '@/views/volunteer/form/steps/VolunteerStep1.vue';
import PersonalDataForm from '@/components/forms/PersonalDataForm.vue';
// import FormStep3 from '@/views/volunteer/form/steps/VolunteerStep3.vue';

import {
  UsersIcon, PlusIcon, ChevronRightIcon, ArrowLeftIcon, EditIcon,
} from 'vue-feather-icons';

import axios from 'axios';
// BUGFIX: same URL as Vue CLI Service for CORS using proxy (look at "vue.config.js" file)
axios.defaults.baseURL = 'http://localhost:32769/api';

export default {
  name: 'voluntario',
  components: {
    VueCodeHighlight,
    Step,
    UsersIcon,
    PlusIcon,
    ChevronRightIcon,
    ArrowLeftIcon,
    EditIcon,
    FormStep1,
    PersonalDataForm,
    // FormStep3,
  },
  props: {
    // Create or update mode
    updateMode: {
      type: Boolean,
      default: false,
    },
    steps: {
      type: Number,
      default: 2,
    },
    currentStep: {
      type: Number,
      default: 1,
    },
    // form: {
    //   type: Object,
    //   default: () => ({
    //     // TODO: warn about fixed typo bellow
    //     address: {},
    //     employee: {},
    //   })
    // }
  },
  data() {
    return {
      volunteer: {
        education: {},
        address: {},
        contact: {},
      },
    };
  },
  mounted() {
    if (this.updateMode || this.$route.params.id != null) {
      this.retrieve(parseInt(this.$route.params.id, 10)).then((volunteer) => {
        this.volunteer = volunteer;
      });
    }
  },
  methods: {
    retrieve(id) {
      axios.get(`/volunteer/${id}`)
        .then((response) => response.data)
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.$toast({
              icon: 'error',
              title: 'Erro ao obter o voluntário',
              text: `${error.response.status} - ${error.response.statusText}`,
            });
          } else if (error.request) {
            // The request was made but no response was received
            this.$toast({
              icon: 'error',
              title: 'Erro ao obter o voluntário',
              text: 'Não houve resposta da requisição',
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            this.$toast({
              icon: 'error',
              title: 'Erro ao obter o voluntário',
              text: 'Problema na configuração da requisição',
            });
          }
        });
    },
    create() {
      axios.post('/patient', this.form)
        .then(() => {
          this.$toast({
            icon: 'success',
            title: 'Voluntário adicionado com sucesso',
          });
          // this.$destroy();
          this.$router.push('/voluntário');
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.$toast({
              icon: 'error',
              title: 'Erro ao adicionar o voluntário',
              text: `${error.response.status} - ${error.response.statusText}`,
            });
          } else if (error.request) {
            // The request was made but no response was received
            this.$toast({
              icon: 'error',
              title: 'Erro ao adicionar o voluntário',
              text: 'Não houve resposta da requisição',
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            this.$toast({
              icon: 'error',
              title: 'Erro ao adicionar o voluntário',
              text: 'Problema na configuração da requisição',
            });
          }
        });
    },
    update() { },
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
