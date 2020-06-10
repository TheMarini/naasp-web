<template lang="html">
  <div class="acolhido p-4">
    <Header :title="title">
      <template #icon>
        <heart-icon size="2.3x" class="title-icon"></heart-icon>
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

        <!-- TODO: consider switch to a nested vue-router -->
        <QuickForm
          v-show="quickMode"
          :responsible-form="true"
          :name.sync="patient.name"
          :birth-date.sync="patient.birthDate"
          :age.sync="patient.age"
          :is-under-age.sync="patient.isUnderAge"
          :responsible-name.sync="patient.responsible.name"
          :cell-phone-number.sync="patient.contact.cellPhoneNumber"
          :home-phone-number.sync="patient.contact.homePhoneNumber"
          :business-phone-number.sync="patient.contact.businessPhoneNumber"
          :email.sync="patient.email"
          :contact-time-preference.sync="patient.contactTimePreference"
          :comments.sync="patient.others.comments"
        ></QuickForm>

        <PersonalDataForm
          v-show="currentStep === 1 && !quickMode"
          :responsible-form="true"
          :name.sync="patient.name"
          :birth-date.sync="patient.birthDate"
          :age.sync="patient.age"
          :is-under-age.sync="patient.isUnderAge"
          :cpf.sync="patient.cpf"
          :rg.sync="patient.rg"
          :gender.sync="patient.gender"
          :matrial-status.sync="patient.matrialStatus"
          :education-level.sync="patient.education.level"
          :education-status.sync="patient.education.status"
          :job-role.sync="patient.jobRole"
          :place-of-birth.sync="patient.placeOfBirth"
          :nationality.sync="patient.nationality"
          :religion.sync="patient.religion"
          :responsible-name.sync="patient.responsible.name"
          :responsible-rg.sync="patient.responsible.rg"
          :responsible-cpf.sync="patient.responsible.cpf"
          :public-place.sync="patient.address.publicPlace"
          :address-number.sync="patient.address.number"
          :address-complement.sync="patient.address.complement"
          :neighborhood.sync="patient.address.neighborhood"
          :city.sync="patient.address.city"
          :state.sync="patient.address.state"
          :cep.sync="patient.address.cep"
          :cell-phone-number.sync="patient.contact.cellPhoneNumber"
          :home-phone-number.sync="patient.contact.homePhoneNumber"
          :business-phone-number.sync="patient.contact.businessPhoneNumber"
          :email.sync="patient.email"
          :object="patient"
        ></PersonalDataForm>

        <form-step-2
          v-show="currentStep === 2"
          :family.sync="patient.family"
          :government-benefit-name.sync="patient.money.governmentBenefit.name"
          :government-benefit-value.sync="patient.money.governmentBenefit.value"
          :family-income-comments.sync="patient.money.familyIncomeComments"
          :housing-condition.sync="patient.home.housingCondition"
          :object="patient"
        ></form-step-2>

        <form-step-3
          v-show="currentStep === 3"
          :physical-activity.sync="patient.health.physicalActivity"
          :medicines.sync="patient.health.medicines"
          :qtd-cigarettes.sync="patient.health.qtdCigarettes"
          :qtd-drinks.sync="patient.health.qtdDrinks"
          :family-alcohol-abuse.sync="patient.health.family.alcoholAbuse"
          :family-diseases.sync="patient.health.family.diseases"
          :family-medicines.sync="patient.health.family.medicines"
          :object="patient"
        ></form-step-3>

        <form-step-4
          v-show="currentStep === 4"
          :parish.sync="patient.affiliation.parish"
          :religious-activities.sync="patient.affiliation.religiousActivities"
          :object="patient"
        ></form-step-4>

        <form-step-5
          v-show="currentStep === 5"
          :priority.sync="patient.priority"
          :demands.sync="patient.others.demands"
          :comments.sync="patient.others.comments"
          :object="patient"
        ></form-step-5>
      </article>
    </div>
    <footer class="pt-4 pb-2 d-flex justify-content-between align-items-center">
      <router-link :to="'/acolhido'" @click.native="$destroy()">
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
        :create-text="quickMode ? 'Pré-Cadastrar' : 'Adicionar'"
        @click="submit"
      ></SubmitFormButton>
    </footer>
    <VueCodeHighlight v-show="true">
      {{ JSON.stringify(patient, null, 2) }}
    </VueCodeHighlight>
  </div>
</template>

<script>
// Icons
import { HeartIcon } from 'vue-feather-icons';

// Moment
import moment from 'moment';

// Header
import Header from '@/components/Header.vue';

// Steps
import Steps from '@/components/steps/Steps.vue';
import NextStep from '@/components/steps/NextStep.vue';
import PreviousStep from '@/components/steps/PreviousStep.vue';

// Submit Button
import SubmitFormButton from '@/components/SubmitFormButton.vue';

// Quick form
import QuickForm from '@/components/forms/QuickForm.vue';

// Form Steps
import PersonalDataForm from '@/components/forms/PersonalDataForm.vue';
import FormStep2 from '@/views/patient/form/steps/PatientStep2.vue';
import FormStep3 from '@/views/patient/form/steps/PatientStep3.vue';
import FormStep4 from '@/views/patient/form/steps/PatientStep4.vue';
import FormStep5 from '@/views/patient/form/steps/PatientStep5.vue';

// Code highlight
import { component as VueCodeHighlight } from 'vue-code-highlight';

export default {
  name: 'PatientForm',
  components: {
    Header,
    Steps,
    NextStep,
    PreviousStep,
    SubmitFormButton,
    HeartIcon,
    QuickForm,
    PersonalDataForm,
    FormStep2,
    FormStep3,
    FormStep4,
    FormStep5,
    VueCodeHighlight,
  },
  props: {
    // Create or update mode
    updateMode: {
      type: Boolean,
      default: false,
    },
    quickMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      method: this.updateMode ? 'update' : 'create',
      steps: 5,
      currentStep: 1,
      patient: {
        education: {},
        address: {},
        contact: {},
        responsible: {},
        family: [],
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
  computed: {
    title() {
      let verb;

      if (this.quickMode) verb = 'Pré-cadastrar';
      else if (this.updateMode) verb = 'Editar';
      else verb = 'Adicionar';

      return `${verb} acolhido`;
    },
    patientTranslatedQuick() {
      return {
        Acolhido: {
          preferenciaAtendimento: this.patient.contactTimePreference,
        },
        Pessoa: {
          data_nascimento: moment(this.patient.birthDate).format('YYYY-MM-DD'),
          telefoneCelular: this.patient.contact.cellPhoneNumber,
          telefoneResidencia: this.patient.contact.homePhoneNumber,
          telefoneComercial: this.patient.contact.businessPhoneNumber,
          email: this.patient.email,
          nome: this.patient.name,
        },
      };
    },
    patientTranslated() {
      return {
        Acolhido: {
          alcoolismoFamilia: this.patient.health.family.alcoholAbuse,
          atividadeFisica: this.patient.health.physicalActivity,
          atividadesReligiosas: this.patient.affiliation.religiousActivities,
          bebidaQuantidade: this.patient.health.qtdDrinks,
          cigarroQuantidade: this.patient.health.qtdCigarettes,
          condicoesMoradia: this.patient.home.housingCondition,
          demanda: this.patient.others.demands,
          encaminhamento: '',
          medicamentosFamilia: this.patient.health.family.medicines,
          observacao: this.patient.others.comments,
          observacaoBeneficioGoverno: this.patient.money.familyIncomeComments,
          paroquia: this.patient.affiliation.parish,
          // TODO: add this field to last step
          preferenciaAtendimento: '',
          prioridade: this.patient.priority,
          tipoBeneficioGoverno: this.patient.money.governmentBenefit.name,
          valorBeneficioGoverno: this.patient.money.governmentBenefit.value,
          Familiares: this.patient.family.map((member) => ({
            nome: member.name,
            parentesco: member.kinship,
            data_nascimento: member.birthDate,
            escolaridade: `${member.education.level} - ${member.education.status}`,
            ocupacao: member.jobRole,
            cohabita: member.isCohabiting,
            telefone: member.phoneNumber,
            renda: member.income,
            responsavel: false,
            rg: '',
          })),
        },
        Pessoa: {
          cpf: this.patient.cpf,
          data_nascimento: this.patient.birthDate,
          estado_civil: this.patient.matrialStatus,
          estadoEscolaridade: this.patient.education.level,
          grauEscolaridade: this.patient.education.status,
          nacionalidade: this.patient.nationality,
          naturalidade: this.patient.placeOfBirth,
          nome: this.patient.name,
          rg: this.patient.rg,
          sexo: this.patient.gender,
          situacao_profissional: this.patient.jobRole,
          telefoneCelular: this.patient.contact.cellPhoneNumber,
          telefoneResidencia: this.patient.contact.homePhoneNumber,
          telefoneComercial: this.patient.contact.businessPhoneNumber,
          email: this.patient.email,
          Endereco: {
            Bairro: {
              nome: this.patient.address.neighborhood,
            },
            cep: this.patient.address.cep,
            complemento: this.patient.address.complement,
            Cidade: {
              nome: this.patient.address.city,
            },
            numero: this.patient.address.number,
            rua: this.patient.address.publicPlace,
          },
          Religiao: {
            nome: this.patient.religion,
          },
        },
      };
    },
    patientTranslatedOld() {
      return {
        religiao: this.patient.religion,
        bairro: this.patient.address.neighborhood,
        cidade: this.patient.address.city,
        estado: this.patient.address.state,
        endereco: {
          rua: this.patient.address.publicPlace,
          numero: this.patient.address.number,
          complemento: this.patient.address.complement,
          // cep: this.patient.address.cep,
        },
        pessoa: {
          nome: this.patient.name,
          estado_civil: this.patient.matrialStatus,
          // cpf: this.patient.cpf,
          data_nascimento: this.patient.birthDate,
          sex: this.patient.gender,
          naturalidade: this.patient.placeOfBirth,
          nacionalidade: this.patient.nationality,
          situacao_profissional: this.patient.jobRole,
          escolaridade: `${this.patient.education.level} - ${this.patient.education.status}`,
        },
        acolhido: {
          atividade_fisica: this.patient.health.physicalActivity,
          bebida_quantidade: this.patient.health.qtdDrinks,
          paroquia: this.patient.affiliation.parish,
          atividades_religiosas: this.patient.affiliation.religiousActivities,
          demanda: this.patient.others.demands,
          observacao: this.patient.others.comments,
        },
        familiares: this.patient.family.map((member) => ({
          nome: member.name,
          parentesco: member.kinship,
          escolaridade: `${member.education.level} - ${member.education.status}`,
          ocupacao: member.jobRole,
          cohabita: member.isCohabiting,
          telefone: member.phoneNumber,
          renda: member.income,
        })),
      };
    },
  },
  mounted() {
    if (this.updateMode || this.$route.params.id != null) {
      this.retrieve(parseInt(this.$route.params.id, 10)).then((patient) => {
        this.patient = this.patientTranslatedBack(patient);
        this.patient.update = true;
        console.log('Paciente traduzido', this.patient);
      });
    }

    if (this.quickMode) this.steps = 1;

    if (
      !(this.updateMode || this.$route.params.id != null) &&
      !this.quickMode
    ) {
      setTimeout(() => {
        this.patient = {
          education: {
            level: 'Graduação',
            status: 'Em curso',
          },
          address: {
            publicPlace: 'Rua do Limão',
            number: 42,
            complement: 'Apto. 101',
            neighborhood: 'Limoeiro',
            city: 'Belo Horizonte',
            state: 'Minas Gerais',
            cep: '12313-131',
          },
          contact: {
            cellPhoneNumber: '(12) 3 1231-3123',
            homePhoneNumber: '(13) 1 2312-3123',
            businessPhoneNumber: '(31) 2 3123-1231',
          },
          responsible: {
            name: 'Spike Jonze',
            rg: '12.312.312-3',
            cpf: '123.123.131-23',
          },
          family: [
            {
              name: 'Spike Jonze',
              kinship: 3,
              age: 42,
              education: {
                level: 'Mestrado',
                status: 'Em curso',
              },
              jobRole: 'Professor',
              isCohabiting: true,
              phoneNumber: '(12) 3 1231-3123',
              income: 1045.42,
            },
            {
              name: 'Sofia Copola',
              kinship: 1,
              age: 40,
              education: {
                level: 'Mestrado',
                status: 'Em curso',
              },
              jobRole: 'Jornalista',
              isCohabiting: 'false',
              phoneNumber: '(13) 1 2313-1312',
              income: 1300.45,
            },
          ],
          money: {
            governmentBenefit: {
              name: 'Bolsa Família',
              value: 41,
            },
            familyIncomeComments: 'Nenhuma observação.',
          },
          home: {
            housingCondition: 'Alugada',
          },
          health: {
            family: {
              alcoholAbuse: 'Tio',
              diseases: 'Avó - Alzhaimer',
              medicines: 'Tio - Atenolol',
            },
            qtdCigarettes: 3,
            qtdDrinks: 2,
            physicalActivity: 'Futebol, Ciclismo',
            medicines: 'Omeprazol',
          },
          affiliation: {
            parish: 'Igreja Nossa Sra. do Carmo',
            religiousActivities: 'Grupo de Estudos',
          },
          others: {
            comments: 'Nenhuma observação.',
            demands: 'Nenhuma demanda.',
          },
          name: 'Bruno Marini',
          birthDate: '2010-09-01',
          age: 9,
          isUnderAge: true,
          cpf: '131.231.231-23',
          rg: '13.123.123-1',
          gender: 'M',
          matrialStatus: 'Solteiro',
          jobRole: 'Desenvolvedor Full-Stack',
          placeOfBirth: 'São Paulo, SP',
          nationality: 'Brasileira',
          religion: 'Agnóstico',
          email: 'bruno@marini.com',
          priority: '2',
        };
      }, 200);
    }
  },
  methods: {
    patientTranslatedBack(paciente) {
      return {
        id: paciente.id,
        education: {
          level: paciente.Pessoa.grauEscolaridade,
          status: paciente.Pessoa.estadoEscolaridade,
        },
        address: {
          publicPlace: paciente.Pessoa.Endereco.rua,
          number: paciente.Pessoa.Endereco.numero,
          complement: paciente.Pessoa.Endereco.complemento,
          neighborhood: paciente.Pessoa.Endereco.Bairro.nome,
          city: paciente.Pessoa.Endereco.Cidade.nome,
          state: 'Minas Gerais',
          cep: paciente.Pessoa.Endereco.cep,
        },
        contact: {
          cellPhoneNumber: paciente.Pessoa.telefoneCelular,
          homePhoneNumber: paciente.Pessoa.telefoneResidencia,
          businessPhoneNumber: paciente.Pessoa.telefoneComercial,
        },
        responsible: {
          name: '',
          rg: '',
          cpf: '',
        },
        family: paciente.familiares.map((membro) => ({
          id: membro.id,
          name: membro.nome,
          kinship: membro.parentesco,
          education: {
            level: membro.escolaridade.split('-', 1)[0],
            status: membro.escolaridade.split('-', 1)[1],
          },
          jobRole: membro.ocupacao,
          isCohabiting: membro.cohabita,
          phoneNumber: membro.telefone,
          income: membro.renda,
        })),
        money: {
          governmentBenefit: {
            name: paciente.tipoBeneficioGoverno,
            value: paciente.valorBeneficioGoverno,
          },
          familyIncomeComments: paciente.observacaoBeneficioGoverno,
        },
        home: {
          housingCondition: paciente.condicoesMoradia,
        },
        health: {
          family: {
            alcoholAbuse: paciente.alcoolismoFamilia,
            diseases: '',
            medicines: paciente.medicamentosFamilia,
          },
          qtdCigarettes: paciente.cigarroQuantidade,
          qtdDrinks: paciente.bebidaQuantidade,
          physicalActivity: paciente.atividadeFisica,
          medicines: '',
        },
        affiliation: {
          parish: paciente.paroquia,
          religiousActivities: paciente.atividadesReligiosas,
        },
        others: {
          comments: paciente.observacao,
          demands: paciente.demanda,
        },
        name: paciente.Pessoa.nome,
        birthDate: moment(paciente.Pessoa.data_nascimento).format('YYYY-MM-DD'),
        // age: 9,
        // isUnderAge: true,
        cpf: paciente.Pessoa.cpf,
        rg: paciente.Pessoa.rg,
        gender: paciente.Pessoa.sexo,
        matrialStatus: paciente.Pessoa.estado_civil,
        jobRole: paciente.Pessoa.situacao_profissional,
        placeOfBirth: paciente.Pessoa.naturalidade,
        nationality: paciente.Pessoa.nacionalidade,
        religion: paciente.Pessoa.Religiao.nome,
        email: paciente.Pessoa.email,
        priority: paciente.prioridade,
      };
    },
    submit(method) {
      if (method === 'update') this.update();
      this.create();
    },
    retrieve(id) {
      this.$axios
        .get(`/welcomed/${id}`)
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
      this.$axios
        .post(
          '/acolhido',
          this.quickMode ? this.patientTranslatedQuick : this.patientTranslated
        )
        .then(() => {
          this.$toast({
            icon: 'success',
            title: 'Acolhido adicionado com sucesso',
          });
          // this.$destroy();
          this.$router.push('/acolhido');
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.$toast({
              icon: 'error',
              title: 'Erro ao adicionar o acolhido',
              text: `${error.response.status} - ${error.response.statusText}`,
            });
          } else if (error.request) {
            // The request was made but no response was received
            this.$toast({
              icon: 'error',
              title: 'Erro ao adicionar o acolhido',
              text: 'Não houve resposta da requisição',
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            this.$toast({
              icon: 'error',
              title: 'Erro ao adicionar o acolhido',
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
/* VueCodeHighlight theme */
@import url('../../../../node_modules/vue-code-highlight/themes/prism-tomorrow.css');

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
