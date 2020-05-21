<template lang="html">
  <div class="form-step">
    <section>
      <h4 class="section-title">DETALHES DE ATENDIMENTO</h4>
      <form>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="priority">Prioridade</label>
            <select
              id="priority"
              class="custom-select _rounded"
              @input="$emit('update:priority', $event.target.value)"
            >
              <option selected disabled>Escolha uma opção</option>
              <option value="0">0 - Urgente</option>
              <option value="1">1 - Alta</option>
              <option value="2">2 - Média</option>
              <option value="3">3 - Baixa</option>
            </select>
          </div>
        </div>
      </form>
    </section>
    <section class="mt-2">
      <h4 class="section-title">OUTRAS INFORMAÇÃES</h4>
      <form>
        <div class="form-group">
          <label for="demands">Demandas apresentadas</label>
          <textarea
            id="demands"
            class="form-control _rounded"
            @input="$emit('update:demands', $event.target.value)"
          >
          </textarea>
        </div>
        <div class="form-group">
          <label for="comments">Observações</label>
          <textarea
            id="comments"
            class="form-control _rounded"
            @input="$emit('update:comments', $event.target.value)"
          >
          </textarea>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'FormStep5',
};
</script>

<style lang="css" scoped>
textarea {
  min-height: 100px;
}
</style>
