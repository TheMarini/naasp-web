<template lang="html">
  <div class="form-step">
    <section>
      <h4 class="section-title">DISPONIBILIDADE</h4>
      <form>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="days">Dias da semana</label>
            <select @input="$emit('update:availability', $event.target.value)"
              class="custom-select _rounded" id="days"
            >
              <option selected disabled>Escolha uma opção</option>
              <option value="Segunda">Segunda</option>
              <option value="Terça">Terça</option>
              <option value="Quarta">Quarta</option>
              <option value="Quinta">Quinta</option>
              <option value="Sexta">Sexta</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <label for="per">Período</label>
            <select @input="$emit('update:dayTime', $event.target.value)"
              class="custom-select _rounded" id="per"
            >
              <option selected disabled>Escolha uma opção</option>
              <option value="Manhã">Manhã</option>
              <option value="Tarde">Tarde</option>
              <option value="Noite">Noite</option>
            </select>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'form-step-3',
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
