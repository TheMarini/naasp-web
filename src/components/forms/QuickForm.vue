<template lang="html">
  <div class="form-step">
    <section>
      <h4 class="section-title">DADOS PESSOAIS</h4>
      <form>
        <div class="form-row">
          <div class="form-group mb-0 col-md-8">
            <label for="name">Nome completo</label>
            <input v-model="name" @input="$emit('update:name', $event.target.value)"
              type="text" class="form-control _rounded" id="name" placeholder="Douglas Adams">
          </div>
          <div class="form-group mb-0 col-md-4">
            <label for="birth-date">Data de nascimento</label>
            <input v-model="birthDate" type="date" class="form-control _rounded" id="birth-date">
          </div>
        </div>
      </form>
    </section>
    <section v-show="isUnderAge && responsibleForm">
      <hr class="my-4">
      <h4 class="section-title">RESPONSÁVEL</h4>
      <form>
        <div class="form-row">
          <div class="form-group mb-0 col-md-12" >
            <label for="resp-name">Nome completo
            </label>
            <input @input="$emit('update:responsibleName', $event.target.value)"
              type="text" class="form-control _rounded" id="resp-name" placeholder="Spike Jonze">
          </div>
        </div>
      </form>
    </section>
    <hr class="my-4">
    <section>
      <h4 class="section-title">CONTATO</h4>
      <form>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="cell-phone-number">Telefone celular</label>
            <the-mask @input.native="$emit('update:cellPhoneNumber', $event.target.value)"
            id="cell-phone-number" type="tel" class="form-control _rounded"
            :mask="['(##) ####-####', '(##) # ####-####']" placeholder="(31) 9 1234-5678" />
          </div>
          <div class="form-group col-md-4">
            <label for="home-phone-number">Telefone residencial</label>
            <the-mask @input.native="$emit('update:homePhoneNumber', $event.target.value)"
            id="home-phone-number" type="tel" class="form-control _rounded"
            :mask="['(##) ####-####', '(##) # ####-####']" placeholder="(31) 1234-5678" />
          </div>
          <div class="form-group col-md-4">
            <label for="business-phone-number">Telefone comercial</label>
            <the-mask @input.native="$emit('update:businessPhoneNumber', $event.target.value)"
            id="business-phone-number" type="tel" class="form-control _rounded"
            :mask="['(##) ####-####', '(##) # ####-####']" placeholder="(31) 1234-5678" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group mb-0 col-md-8" :class="isUnderAge ?  'mb-0' : ''">
            <label for="email">E-mail</label>
            <input @input="$emit('update:email', $event.target.value)" type="email"
              class="form-control _rounded" id="email" placeholder="douglas@exemplo.com">
          </div>
          <div class="form-group mb-0 col-md-4">
            <label for="contactTimePreference">Preferência de Atendimento</label>
            <select @input="$emit('update:contactTimePreference', $event.target.value)"
              class="custom-select _rounded" id="contactTimePreference">
              <option selected disabled>Escolha uma opção</option>
              <option value="0">Dia Útil - Manhã</option>
              <option value="1">Dia Útil - Tarde</option>
              <option value="2">Sábado - Manhã</option>
              <option value="3">Sábado - Tarde</option>
            </select>
          </div>
        </div>
      </form>
    </section>
    <hr class="my-4">
    <section>
      <h4 class="section-title">OUTRAS INFORMAÇÃES</h4>
      <form>
        <div class="form-group">
          <label for="comments">Observações</label>
          <textarea @input="$emit('update:comments', $event.target.value)"
            class="form-control _rounded" id="comments"></textarea>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
// Moment
import moment from 'moment';

export default {
  name: 'personal-data-form',
  props: {
    responsibleForm: {
      type: Boolean,
      default: false,
    },
    underAgeLimit: {
      type: Number,
      default: 17,
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      birthDate: null,
      age: null,
      isUnderAge: false,
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
