<template lang="html">
  <div class="voluntario p-4">
    <Header :title="`${updateMode ? 'Editar' : 'Adicionar'} voluntário`">
      <template #icon>
        <users-icon size="2.3x" class="title-icon"></users-icon>
      </template>
      <template #CTA>
        <Steps
          v-model="currentStep"
          :total="steps"
          :update-mode="updateMode"
        ></Steps>
      </template>
    </Header>
    <div class="wrapper pt-4">
      <div class="infos">
        <p class="current-step">ETAPA {{ currentStep }}</p>
      </div>
      <article>
        <div
          v-if="currentStep > 1"
          class="d-inline-flex prev-btn mb-2"
          @click="currentStep--"
        >
          <arrow-left-icon size="1.5x" class="custom-class"></arrow-left-icon>
          <p class="mb-0 ml-1">Voltar a etapa anterior</p>
        </div>

        <form-step-1
          v-show="currentStep === 1"
          :volunteer-type.sync="volunteer.type"
          :volunteer-specialties.sync="volunteer.specialties"
          :volunteer-age-ranges-of-care.sync="volunteer.ageRangesOfCare"
        ></form-step-1>

        <PersonalDataForm
          v-show="currentStep === 2"
          :name.sync="volunteer.name"
          :birth-date.sync="volunteer.birthDate"
          :age.sync="volunteer.age"
          :is-under-age.sync="volunteer.isUnderAge"
          :cpf.sync="volunteer.cpf"
          :rg.sync="volunteer.rg"
          :gender.sync="volunteer.gender"
          :matrial-status.sync="volunteer.matrialStatus"
          :education-level.sync="volunteer.education.level"
          :education-status.sync="volunteer.education.status"
          :job-role.sync="volunteer.jobRole"
          :place-of-birth.sync="volunteer.placeOfBirth"
          :nationality.sync="volunteer.nationality"
          :religion.sync="volunteer.religion"
          :public-place.sync="volunteer.address.publicPlace"
          :address-number.sync="volunteer.address.number"
          :address-complement.sync="volunteer.address.complement"
          :neighborhood.sync="volunteer.address.neighborhood"
          :city.sync="volunteer.address.city"
          :state.sync="volunteer.address.state"
          :cep.sync="volunteer.address.cep"
          :cell-phone-number.sync="volunteer.contact.cellPhoneNumber"
          :home-phone-number.sync="volunteer.contact.homePhoneNumber"
          :business-phone-number.sync="volunteer.contact.businessPhoneNumber"
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
        <button
          type="button"
          name="button"
          class="cancel-btn btn py-2 px-3 d-flex align-items-center _rounded-100"
        >
          <h5 class="mb-0 px-2"><b>Cancelar</b></h5>
        </button>
      </router-link>
      <button
        v-if="currentStep < steps"
        :style="[
          updateMode ? { color: '#000', backgroundColor: '#E3DB4A' } : {},
        ]"
        type="button"
        name="button"
        class="next-btn btn py-2 px-3 d-flex align-items-center _rounded-100"
        @click="currentStep++"
      >
        <h5 class="mb-0 px-2"><b>Próxima</b></h5>
        <chevron-right-icon
          size="1.5x"
          class="custom-class"
        ></chevron-right-icon>
      </button>
      <button
        v-else-if="updateMode"
        type="button"
        name="button"
        class="edit-btn btn py-2 px-3 pl-4 d-flex align-items-center _rounded-100"
        @click="update"
      >
        <edit-icon size="1.5x" class="edit-icon"></edit-icon>
        <h5 class="mb-0 px-2"><b>Editar</b></h5>
      </button>
      <button
        v-else
        type="button"
        name="button"
        class="add-btn btn py-2 px-3 d-flex align-items-center _rounded-100"
        @click="create"
      >
        <plus-icon size="1.5x" class="add-icon"></plus-icon>
        <h5 class="mb-0 px-2"><b>Adicionar</b></h5>
      </button>
    </footer>

    <VueCodeHighlight v-show="false">
      {{ JSON.stringify(volunteer, null, 2) }}
    </VueCodeHighlight>
  </div>
</template>

<script>
// Code highlight
import { component as VueCodeHighlight } from 'vue-code-highlight';

// Header
import Header from '@/components/Header.vue';

// Steps
import Steps from '@/components/steps/Steps.vue';

// Form Steps
import FormStep1 from '@/views/volunteer/form/steps/VolunteerStep1.vue';
import PersonalDataForm from '@/components/forms/PersonalDataForm.vue';
// import FormStep3 from '@/views/volunteer/form/steps/VolunteerStep3.vue';

import {
  UsersIcon,
  PlusIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  EditIcon,
} from 'vue-feather-icons';

export default {
  name: 'Voluntario',
  components: {
    Header,
    Steps,
    VueCodeHighlight,
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
      steps: 2,
      currentStep: 1,
      volunteer: {
        education: {},
        address: {},
        contact: {},
      },
    };
  },
  computed: {
    volunteerTranslated() {
      return {
        endereco: {
          rua: this.volunteer.address.publicPlace,
          numero: this.volunteer.address.number,
          complemento: this.volunteer.address.complement,
          // cep: this.volunteer.address.cep,
        },
        cidade: this.volunteer.address.city,
        bairro: this.volunteer.address.neighborhood,
        pessoa: {
          estado_civil: this.volunteer.matrialStatus,
          // cpf: this.volunteer.cpf,
          sexo: this.volunteer.gender,
          naturalidade: this.volunteer.placeOfBirth,
          nacionalidade: this.volunteer.nationality,
          situacao_profissional: this.volunteer.jobRole,
          escolaridade: `${this.volunteer.education.level} - ${this.volunteer.education.status}`,
          nome: this.volunteer.name,
          data_nascimento: this.volunteer.birthDate,
        },
        especialidade: this.volunteer.specialties[0].name,
      };
    },
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
      this.$axios
        .get(`/volunteer/${id}`)
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
      this.$axios
        .post('/voluntario', this.volunteerTranslated)
        .then(() => {
          this.$toast({
            icon: 'success',
            title: 'Voluntário adicionado com sucesso',
          });
          // this.$destroy();
          this.$router.push('/voluntario');
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
    update() {},
  },
};
</script>

<style lang="css" scoped>
header {
  color: #707070;
}

.title-icon {
  stroke-width: 3px;
}

.prev-btn {
  color: #707070;
  font-weight: 500;
  cursor: pointer;
}

.add-btn,
.next-btn {
  color: white;
  background-color: #175d2b;
}

.edit-btn {
  color: black;
  background-color: #e3db4a;
}

.cancel-btn {
  color: #707070;
  border: 4px solid #707070;
}

.infos .current-step {
  color: #707070;
  font-weight: 600;
}
</style>
