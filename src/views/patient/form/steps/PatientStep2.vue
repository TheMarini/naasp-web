<template lang="html">
  <div class="form-step">
    <section>
      <h4 class="section-title">DADOS E CONDIÇÕES DOS FAMILIARES</h4>
      <p>
        Pessoas relevantes na vida do acolhido, que suportam direta/indiretamente,
        coabitando na mesma casa ou não:
      </p>
      <form class="family-form">
        <!-- TODO: consider a transformation of the elements below into a component -->
        <div class="family-member shadow-sm _card p-3" :class="family.length > 1 ? 'mb-2' : ''"
          v-for="(member, index) in family" :key="index">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label :for="`member-name-${index}`">Nome</label>
              <input :id="`member-name-${index}`" v-model="member.name" type="text"
                name="family-name" placeholder="Spike Jonze" class="form-control _rounded">
            </div>
            <div class="form-group col-md-5">
              <label :for="`member-kinship-${index}`">Parentesco</label>
              <b-form-select :id="`member-kinship-${index}`" v-model="member.kinship"
                :options="kinshipOptions">
              </b-form-select>
            </div>
            <div class="form-group col-md-1">
              <label :for="`member-age-${index}`">Idade</label>
              <input :id="`member-age-${index}`" v-model.number="member.age" type="number"
                name="family-age" placeholder="42" class="form-control _rounded">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-3">
              <label :for="`member-education-level-${index}`">Grau de escolaridade</label>
              <select v-model="member.education.level"
                class="custom-select _rounded" :id="`member-education-level-${index}`"
              >
                <option value="null" selected disabled>Escolha uma opção</option>
                <option value="Analfabeto">Analfabeto</option>
                <option value="Educação Infantil">Educação Infantil</option>
                <option value="Ensino Fundamental">Ensino Fundamental</option>
                <option value="Ensino Médio">Ensino Médio</option>
                <option value="Técnico">Técnico</option>
                <option value="Graduação">Graduação</option>
                <option value="Pós-Graduação">Pós-Graduação</option>
                <option value="Mestrado">Mestrado</option>
                <option value="Doutorado">Doutorado</option>
                <option value="Pós-Doutorado">Pós-Doutorado</option>
              </select>
            </div>
            <div class="form-group col-md-3">
              <label :for="`member-education-status-${index}`">Estado de escolaridade</label>
              <select v-model="member.education.status"
                class="custom-select _rounded" :id="`member-education-status-${index}`"
              >
                <option value="null" selected disabled>Escolha uma opção</option>
                <option value="Incompleto">Incompleto</option>
                <option value="Em curso">Em curso</option>
                <option value="Completo">Completo</option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label :for="`member-job-role-${index}`">Cargo de trabalho</label>
              <input :id="`member-education-status-${index}`" v-model="member.jobRole"
                type="text" class="form-control _rounded"
                placeholder="Professor, engenheiro, médico...">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group mb-0 col-md-3">
              <label :for="`member-phone-number-${index}`">Telefone</label>
              <the-mask v-model="member.phoneNumber" masked
                :id="`member-phone-number-${index}`" type="tel" class="form-control _rounded"
                :mask="['(##) ####-####', '(##) # ####-####']" placeholder="(31) 9 1234-5678" />
            </div>
            <div class="form-group mb-0 col-md-3">
              <label :for="`member-income-${index}`">Renda</label>
              <input v-model.number="member.income"
                :id="`member-income-${index}`" type="number" class="form-control _rounded"
                placeholder="1.045,00"/>
            </div>
            <div class="form-group mb-0 col-md-3 d-flex flex-column justify-content-center">
              <label :for="`member-is-cohabiting-$${index}`">&#8203;</label>
              <b-form-checkbox
                :id="`member-is-cohabiting-${index}`"
                v-model="member.isCohabiting"
                name="member-is-cohabiting"
                value="true"
                unchecked-value="false"
              >
                Coabita com o acolhido
              </b-form-checkbox>
            </div>
            <div class="form-group mb-0 col-md-3 d-flex flex-column justify-content-center
              align-items-end">
              <label :for="`member-delete-$${index}`">&#8203;</label>
              <button :id="`member-delete-$${index}`" @click="deleteMember(index)"
                type="button" name="button" class="edit-btn btn" title="Deletar"
              >
                <trash-2-icon size="1.5x" class="delete-icon"></trash-2-icon>
              </button>
            </div>
          </div>
        </div>
      </form>
      <div class="d-flex justify-content-center">
        <button type="button" @click="family.push({ ...defaultFamilyMemberObject })" name="button"
        class="btn btn-dark shadow-sm mt-2 _rounded d-flex align-items-center"
        >
          <user-plus-icon size="1.5x" class="user-plus-icon"></user-plus-icon>
          <p class="mb-0 pl-2">Adicionar mais um familiar</p>
        </button>
      </div>
      <form class="mt-4">
        <div class="form-row">
          <div class="form-group col-md-8">
            <label for="government-benefit-name">Benefício financeiro governamental</label>
            <input @input="$emit('update:governmentBenefitName', $event.target.value)" type="text"
              class="form-control _rounded" id="government-benefit-name" placeholder="-">
          </div>
          <div class="form-group col-md-4">
            <label for="government-benefit-value">Valor (R$)</label>
            <input @input="$emit('update:governmentBenefitValue', parseFloat($event.target.value))"
              type="number" class="form-control _rounded"
              id="government-benefit-value" placeholder="-">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group mb-0 col-md-12">
            <label for="family-income-comments">Observações sobre renda familiar</label>
            <textarea @input="$emit('update:familyIncomeComments', $event.target.value)"
              class="form-control _rounded" id="family-income-comments"></textarea>
          </div>
        </div>
      </form>
    </section>
    <hr class="my-4">
    <section class="mt-2">
      <h4 class="section-title">CONDIÇÕES DE MORADIA</h4>
      <form>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="housing-condition">Moradia</label>
            <select @input="$emit('update:housingCondition', $event.target.value)"
              class="custom-select _rounded" id="housing-condition"
            >
              <option selected disabled>Escolha uma opção</option>
              <option value="Própria">Própria</option>
              <option value="Alugada">Alugada</option>
              <option value="Cedida">Cedida</option>
              <option value="Financiada">Financiada</option>
            </select>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
// Icons
import {
  Trash2Icon,
  UserPlusIcon,
} from 'vue-feather-icons';

export default {
  name: 'form-step-2',
  components: {
    Trash2Icon,
    UserPlusIcon,
  },
  mounted() {
    this.family.push({ ...this.defaultFamilyMemberObject });
  },
  watch: {
    family: {
      handler(family) {
        this.$emit('update:family', family);
      },
      deep: true,
    },
  },
  data() {
    return {
      kinshipOptions: [
        {
          value: null,
          text: 'Escolha uma opção',
          disabled: true,
          selected: true,
        },
        { value: 0, text: 'Outros' },
        {
          label: '1º grau',
          options: [
            { value: 1, text: 'Mãe' },
            { value: 2, text: 'Madrasta' },
            { value: 3, text: 'Pai' },
            { value: 4, text: 'Padrasto' },
            { value: 5, text: 'Filho(a)' },
            { value: 6, text: 'Enteado(a)' },
            { value: 7, text: 'Sogro(a)' },
            { value: 8, text: 'Genro/Nora' },
          ],
        },
        {
          label: '2º grau',
          options: [
            { value: 9, text: 'Irmão(ã)' },
            { value: 10, text: 'Avô(ó)' },
            { value: 11, text: 'Neto(a)' },
            { value: 12, text: 'Cunhado(a)' },
          ],
        },
        {
          label: '3º grau',
          options: [
            { value: 13, text: 'Tio(a)' },
            { value: 14, text: 'Sobrinho(a)' },
          ],
        },
        {
          label: '4º grau',
          options: [
            { value: 15, text: 'Primo(a)' },
          ],
        },
      ],
      family: [],
      defaultFamilyMemberObject: {
        name: null,
        kinship: null,
        age: null,
        education: {
          level: null,
          status: null,
        },
        jobRole: null,
        isCohabiting: true,
        phoneNumber: null,
        income: null,
      },
    };
  },
  methods: {
    deleteMember(index) {
      this.$swal({
        title: "<span>Realmente deseja <span style='color: indianred'>deletar</span><span>?",
        text: 'Esta ação não poderá ser revertida!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'indianred',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.family.splice(index, 1);

          this.$toast({
            icon: 'success',
            title: 'Familiar deletado com sucesso',
          });
        }
      });
    },
  },
};
</script>

<style lang="css" scoped>
.family-member {
  border: 2px solid #343a40
}

.family-member:last-child {
  margin-bottom: 0 !important
}

.custom-select {
  border-radius: 10px
}
</style>
