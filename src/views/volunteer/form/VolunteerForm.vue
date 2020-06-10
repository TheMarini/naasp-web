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
          :method="method"
        ></Steps>
      </template>
    </Header>
    <div class="wrapper pt-4">
      <div class="infos">
        <p class="current-step">ETAPA {{ currentStep }}</p>
      </div>
      <article>
        <PreviousStep v-model="currentStep"></PreviousStep>

        <form-step-1
          v-show="currentStep === 1"
          :volunteer-type.sync="volunteer.type"
          :volunteer-specialties.sync="volunteer.specialties"
          :volunteer-age-ranges-of-care.sync="volunteer.ageRangesOfCare"
          :object="volunteer"
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
          :object="volunteer"
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
      <NextStep
        v-model="currentStep"
        :total="steps"
        :method="method"
      ></NextStep>
      <SubmitFormButton
        v-if="currentStep === steps"
        :method="method"
        @click="submit"
      ></SubmitFormButton>
    </footer>

    <VueCodeHighlight v-show="true">
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
import NextStep from '@/components/steps/NextStep.vue';
import PreviousStep from '@/components/steps/PreviousStep.vue';

// Submit Button
import SubmitFormButton from '@/components/SubmitFormButton.vue';

// Form Steps
import FormStep1 from '@/views/volunteer/form/steps/VolunteerStep1.vue';
import PersonalDataForm from '@/components/forms/PersonalDataForm.vue';
// import FormStep3 from '@/views/volunteer/form/steps/VolunteerStep3.vue';

import { UsersIcon } from 'vue-feather-icons';

export default {
  name: 'Voluntario',
  components: {
    Header,
    Steps,
    NextStep,
    PreviousStep,
    SubmitFormButton,
    VueCodeHighlight,
    UsersIcon,
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
      method: this.updateMode ? 'update' : 'create',
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
        Voluntario: {
          tipo: this.volunteer.type,
          Especialidade: {
            nome: this.volunteer.specialties[0].name,
          },
          faixaEtariaAtendimento: this.volunteer.ageRangesOfCare.map(
            (a) => a.name
          ),
          Usuario: {
            login: 'admin',
            senha: 'admin',
          },
        },
        Pessoa: {
          cpf: this.volunteer.cpf,
          data_nascimento: this.volunteer.birthDate,
          estado_civil: this.volunteer.matrialStatus,
          estadoEscolaridade: this.volunteer.education.level,
          grauEscolaridade: this.volunteer.education.status,
          nacionalidade: this.volunteer.nationality,
          naturalidade: this.volunteer.placeOfBirth,
          nome: this.volunteer.name,
          rg: this.volunteer.rg,
          sexo: this.volunteer.cpf,
          situacao_profissional: this.volunteer.jobRole,
          telefoneCelular: this.volunteer.contact.cellPhoneNumber,
          telefoneResidencia: this.volunteer.contact.homePhoneNumber,
          telefoneComercial: this.volunteer.contact.businessPhoneNumber,
          email: this.volunteer.email,
          Endereco: {
            Bairro: {
              nome: this.volunteer.address.state.name,
            },
            cep: this.volunteer.address.cep,
            complemento: this.volunteer.address.complement,
            Cidade: {
              nome: this.volunteer.address.city.name,
            },
            numero: this.volunteer.address.number,
            rua: this.volunteer.address.publicPlace,
          },
          Religiao: {
            nome: this.volunteer.religion.name,
          },
        },
      };
    },
  },
  mounted() {
    if (this.updateMode || this.$route.params.id != null) {
      this.retrieve(parseInt(this.$route.params.id, 10)).then((volunteer) => {
        this.volunteer = this.volunteerTranslatedBack(volunteer);
        this.volunteer.update = true;
        console.log('traduzido', this.volunteer);
      });
    }
  },
  methods: {
    volunteerTranslatedBack(voluntario) {
      return {
        id: voluntario.voluntario.id,
        education: {
          level: voluntario.Pessoa.grauEscolaridade,
          status: voluntario.Pessoa.estadoEscolaridade,
        },
        address: {
          publicPlace: voluntario.Pessoa.Endereco.rua,
          number: voluntario.Pessoa.Endereco.numero,
          complement: voluntario.Pessoa.Endereco.complemento,
          neighborhood: {
            id: voluntario.Pessoa.Endereco.BairroId,
            name: voluntario.Pessoa.Endereco.Bairro.nome,
          },
          state: {
            id: 1,
            // Debug: there is no attribute for state
            name: 'Minas Gerais',
          },
          city: {
            id: voluntario.Pessoa.Endereco.CidadeId,
            name: voluntario.Pessoa.Endereco.Cidade.nome,
          },
          cep: voluntario.Pessoa.Endereco.cep,
        },
        contact: {
          cellPhoneNumber: voluntario.Pessoa.telefoneCelular,
          homePhoneNumber: voluntario.Pessoa.telefoneResidencia,
          businessPhoneNumber: voluntario.Pessoa.telefoneComercial,
        },
        ageRangesOfCare: [
          {
            id: 0,
            name: 'Até 16 anos',
          },
          {
            id: 1,
            name: 'De 17 a 65 anos',
          },
          {
            id: 2,
            name: 'Acima de 66 anos',
          },
        ],
        type: voluntario.voluntario.tipo,
        specialties: [
          {
            id: voluntario.voluntario.EspecialidadeId,
            name: voluntario.voluntario.Especialidade.nome,
          },
        ],
        name: voluntario.Pessoa.nome,
        birthDate: voluntario.Pessoa.data_nascimento,
        cpf: voluntario.Pessoa.cpf,
        rg: voluntario.Pessoa.rg,
        gender: voluntario.Pessoa.sexo,
        matrialStatus: voluntario.Pessoa.estado_civil,
        jobRole: voluntario.Pessoa.situacao_profissional,
        placeOfBirth: voluntario.Pessoa.naturalidade,
        nationality: voluntario.Pessoa.nacionalidade,
        religion: {
          id: 1,
          name: 'Agnóstico',
        },
        email: voluntario.Pessoa.email,
      };
    },
    submit(method) {
      if (method === 'update') this.update();
      this.create();
    },
    retrieve(id) {
      return this.$axios
        .get(`/voluntario?id=${id}`)
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
      console.log(this.volunteerTranslated);
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
