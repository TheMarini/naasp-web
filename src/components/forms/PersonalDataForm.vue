<template lang="html">
  <div class="form-step">
    <section>
      <h4 class="section-title">DADOS PESSOAIS</h4>
      <form>
        <div class="form-row">
          <div class="form-group col-md-9">
            <label for="name">Nome completo</label>
            <input
              id="name"
              type="text"
              class="form-control _rounded"
              placeholder="Douglas Adams"
              @input="$emit('update:name', $event.target.value)"
            />
          </div>
          <div class="form-group col-md-3">
            <label for="birth-date">Data de nascimento</label>
            <input
              id="birth-date"
              v-model="birthDate"
              type="date"
              class="form-control _rounded"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="cpf">CPF</label>
            <the-mask
              id="cpf"
              type="text"
              class="form-control _rounded"
              mask="###.###.###-##"
              placeholder="123.456.789-10"
              @input.native="$emit('update:cpf', $event.target.value)"
            />
          </div>
          <div class="form-group col-md-3">
            <label for="rg">RG</label>
            <the-mask
              id="rg"
              type="text"
              class="form-control _rounded"
              mask="##.###.###-#"
              placeholder="12.345.678-9"
              @input.native="$emit('update:rg', $event.target.value)"
            />
          </div>
          <div class="form-group col-md-3">
            <label for="gender">Gênero</label>
            <select
              id="gender"
              class="custom-select _rounded"
              @input="$emit('update:gender', $event.target.value)"
            >
              <option selected disabled>Escolha uma opção</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
          </div>
          <div class="form-group col-md-3">
            <label for="matrial-status">Estado civil</label>
            <select
              id="matrial-status"
              class="custom-select _rounded"
              @input="$emit('update:matrialStatus', $event.target.value)"
            >
              <option selected disabled>Escolha uma opção</option>
              <option value="Solteiro">Solteiro</option>
              <option value="Casado">Casado</option>
              <option value="Separado">Separado</option>
              <option value="Viúvo">Viúvo</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="education-level">Grau de escolaridade</label>
            <select
              id="education-level"
              class="custom-select _rounded"
              @input="$emit('update:educationLevel', $event.target.value)"
            >
              <option selected disabled>Escolha uma opção</option>
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
            <label for="education-status">Estado de escolaridade</label>
            <select
              id="education-status"
              class="custom-select _rounded"
              @input="$emit('update:educationStatus', $event.target.value)"
            >
              <option selected disabled>Escolha uma opção</option>
              <option value="Incompleto">Incompleto</option>
              <option value="Em curso">Em curso</option>
              <option value="Completo">Completo</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="job-role">Cargo de trabalho</label>
            <input
              id="job-role"
              type="text"
              class="form-control _rounded"
              placeholder="Professor, engenheiro, médico..."
              @input="$emit('update:jobRole', $event.target.value)"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-3 mb-0">
            <label for="place-of-birth">Naturalidade</label>
            <input
              id="place-of-birth"
              type="text"
              class="form-control _rounded"
              placeholder="Belo Horizonte, MG"
              @input="$emit('update:placeOfBirth', $event.target.value)"
            />
          </div>
          <div class="form-group col-md-3 mb-0">
            <label for="nationality">Nacionalidade</label>
            <input
              id="nationality"
              type="text"
              class="form-control _rounded"
              placeholder="Brasileira"
              @input="$emit('update:nationality', $event.target.value)"
            />
          </div>
          <div class="form-group col-md-6 mb-0">
            <label for="religion">Religião</label>
            <multiselect
              id="religion"
              v-model="religion"
              :options="options.religion"
              track-by="id"
              label="name"
              :taggable="true"
              tag-placeholder="Adicionar nova religião"
              open-direction="bottom"
              placeholder="Escolha uma opção"
              select-label="Pressione enter para selecionar"
              selected-label="Selecionado"
              deselect-label="Pressione enter para remover seleção"
              @tag="createOption('religion', $event)"
              @remove="destroyCreatedOption('religion', $event)"
              @select="destroyUnnusedCreatedOptions('religion')"
            >
            </multiselect>
          </div>
        </div>
      </form>
    </section>
    <section v-if="isUnderAge && responsibleForm">
      <hr class="my-4" />
      <h4 class="section-title">RESPONSÁVEL</h4>
      <form>
        <div class="form-row">
          <div class="form-group mb-0 col-md-6">
            <label for="resp-name">Nome completo</label>
            <input
              id="resp-name"
              type="text"
              class="form-control _rounded"
              placeholder="Spike Jonze"
              @input="$emit('update:responsibleName', $event.target.value)"
            />
          </div>
          <div class="form-group mb-0 col-md-3">
            <label for="resp-rg">RG</label>
            <the-mask
              id="resp-rg"
              type="text"
              class="form-control _rounded"
              mask="##.###.###-#"
              placeholder="12.345.678-9"
              @input.native="$emit('update:responsibleRg', $event.target.value)"
            />
          </div>
          <div class="form-group mb-0 col-md-3">
            <label for="resp-cpf">CPF</label>
            <the-mask
              id="resp-cpf"
              type="text"
              class="form-control _rounded"
              mask="###.###.###-##"
              placeholder="123.456.789-10"
              @input.native="
                $emit('update:responsibleCpf', $event.target.value)
              "
            />
          </div>
        </div>
      </form>
    </section>
    <hr class="my-4" />
    <section>
      <h4 class="section-title">ENDEREÇO</h4>
      <form>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="public-place">Logradouro</label>
            <input
              id="public-place"
              type="text"
              class="form-control _rounded"
              placeholder="Rua do Limão"
              @input="$emit('update:publicPlace', $event.target.value)"
            />
          </div>
          <div class="form-group col-md-2">
            <label for="address-number">Número</label>
            <input
              id="address-number"
              type="number"
              class="form-control _rounded"
              placeholder="42"
              @input="
                $emit('update:addressNumber', parseInt($event.target.value))
              "
            />
          </div>
          <div class="form-group col-md-2">
            <label for="address-complement">Complemento</label>
            <input
              id="address-complement"
              type="text"
              class="form-control _rounded"
              placeholder="Apto. 101"
              @input="$emit('update:addressComplement', $event.target.value)"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="neighborhood">Bairro</label>
            <multiselect
              id="neighborhood"
              v-model="neighborhood"
              :options="options.neighborhood"
              track-by="id"
              label="name"
              :taggable="true"
              tag-placeholder="Adicionar novo bairro"
              open-direction="bottom"
              placeholder="Escolha uma opção"
              select-label="Pressione enter para selecionar"
              selected-label="Selecionado"
              deselect-label="Pressione enter para remover seleção"
              @tag="createOption('neighborhood', $event)"
              @remove="destroyCreatedOption('neighborhood', $event)"
              @select="destroyUnnusedCreatedOptions('neighborhood')"
            >
            </multiselect>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4 mb-0">
            <label for="state">Estado</label>
            <multiselect
              id="state"
              v-model="state"
              :options="options.state"
              track-by="id"
              label="name"
              :taggable="true"
              tag-placeholder="Adicionar novo estado"
              open-direction="bottom"
              placeholder="Escolha uma opção"
              select-label="Pressione enter para selecionar"
              selected-label="Selecionado"
              deselect-label="Pressione enter para remover seleção"
              @tag="createOption('state', $event)"
              @remove="destroyCreatedOption('state', $event)"
              @select="destroyUnnusedCreatedOptions('state')"
            >
            </multiselect>
          </div>
          <div class="form-group col-md-4 mb-0">
            <label for="city">Estado</label>
            <multiselect
              id="city"
              v-model="city"
              :options="options.city"
              track-by="id"
              label="name"
              :taggable="true"
              tag-placeholder="Adicionar nova cidade"
              open-direction="bottom"
              placeholder="Escolha uma opção"
              select-label="Pressione enter para selecionar"
              selected-label="Selecionado"
              deselect-label="Pressione enter para remover seleção"
              @tag="createOption('city', $event)"
              @remove="destroyCreatedOption('city', $event)"
              @select="destroyUnnusedCreatedOptions('city')"
            >
            </multiselect>
          </div>
          <div class="form-group col-md-4 mb-0">
            <label for="cep">CEP</label>
            <the-mask
              id="cep"
              type="text"
              class="form-control _rounded"
              mask="#####-###"
              placeholder="12345-678"
              @input.native="$emit('update:cep', $event.target.value)"
            />
          </div>
        </div>
      </form>
    </section>
    <hr class="my-4" />
    <section>
      <h4 class="section-title">CONTATO</h4>
      <form>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="cell-phone-number">Telefone celular</label>
            <the-mask
              id="cell-phone-number"
              type="tel"
              class="form-control _rounded"
              masked
              :mask="['(##) ####-####', '(##) # ####-####']"
              placeholder="(31) 9 1234-5678"
              @input.native="
                $emit('update:cellPhoneNumber', $event.target.value)
              "
            />
          </div>
          <div class="form-group col-md-4">
            <label for="home-phone-number">Telefone residencial</label>
            <the-mask
              id="home-phone-number"
              type="tel"
              class="form-control _rounded"
              masked
              :mask="['(##) ####-####', '(##) # ####-####']"
              placeholder="(31) 1234-5678"
              @input.native="
                $emit('update:homePhoneNumber', $event.target.value)
              "
            />
          </div>
          <div class="form-group col-md-4">
            <label for="business-phone-number">Telefone comercial</label>
            <the-mask
              id="business-phone-number"
              type="tel"
              class="form-control _rounded"
              masked
              :mask="['(##) ####-####', '(##) # ####-####']"
              placeholder="(31) 1234-5678"
              @input.native="
                $emit('update:businessPhoneNumber', $event.target.value)
              "
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12" :class="isUnderAge ? 'mb-0' : ''">
            <label for="email">E-mail</label>
            <input
              id="email"
              type="email"
              class="form-control _rounded"
              placeholder="douglas@exemplo.com"
              @input="$emit('update:email', $event.target.value)"
            />
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
// Moment
import moment from 'moment';

// Multiselect
import Multiselect from 'vue-multiselect';

export default {
  name: 'PersonalDataForm',
  components: {
    Multiselect,
  },
  props: {
    responsibleForm: {
      type: Boolean,
      default: false,
    },
    underAgeLimit: {
      type: Number,
      default: 17,
    },
  },
  data() {
    return {
      birthDate: null,
      age: null,
      isUnderAge: false,
      religion: null,
      neighborhood: null,
      state: null,
      city: null,
      options: {
        religion: [
          {
            id: 0,
            name: 'Ateu',
          },
          {
            id: 1,
            name: 'Agnóstico',
          },
          {
            id: 2,
            name: 'Cristianismo',
          },
          {
            id: 3,
            name: 'Catolicismo',
          },
        ],
        neighborhood: [
          {
            id: 0,
            name: 'Limoeiro',
          },
        ],
        state: [
          {
            id: 0,
            name: 'Minas Gerais',
          },
          {
            id: 1,
            name: 'São Paulo',
          },
        ],
        city: [
          {
            id: 0,
            name: 'Belo Horizonte',
          },
          {
            id: 1,
            name: 'Santos',
          },
        ],
      },
    };
  },
  watch: {
    birthDate() {
      this.$emit('update:birthDate', this.birthDate);

      // Calc age
      this.age = moment().diff(this.birthDate, 'years');
      this.$emit('update:age', parseInt(this.age, 10));

      // Calc if under age
      this.isUnderAge = this.age <= this.underAgeLimit;
      this.$emit('update:isUnderAge', this.isUnderAge);
    },
    religion() {
      this.$emit('update:religion', this.religion);
    },
    neighborhood() {
      this.$emit('update:neighborhood', this.neighborhood);
    },
    state() {
      this.$emit('update:state', this.state);
    },
    city() {
      this.$emit('update:city', this.city);
    },
  },
  methods: {
    createOption(attr, name) {
      // Destroy option previously created
      this.destroyUnnusedCreatedOptions(attr);

      // New option
      const option = {
        id: this.options[attr][this.options[attr].length - 1].id + 1,
        name,
        new: true,
      };

      // Add to array of options
      this.options[attr].push(option);
      // Set to current option
      this[attr] = option;
    },
    destroyCreatedOption(attr, option) {
      // Check if its new
      if (option.new) {
        // Find it in the array of options
        const index = this.options[attr].findIndex((o) => o.id === option.id);
        // Destroy
        this.options[attr].splice(index, 1);
      }
    },
    destroyUnnusedCreatedOptions(attr) {
      // For each option in array of options
      this.options[attr].forEach((item) => {
        // Destroy it if its new
        this.destroyCreatedOption(attr, item);
      });
    },
  },
};
</script>

<style lang="css" scoped>
._card {
  height: 150px;
  width: 150px;
  cursor: pointer;
}

._card.active {
  color: #fff !important;
  background-color: #707070 !important;
}
</style>
