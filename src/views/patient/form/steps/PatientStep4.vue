<template lang="html">
  <div class="form-step">
    <section>
      <h4 class="section-title">DADOS PAROQUIAIS</h4>
      <form>
        <div class="form-group">
          <label for="parish">Paróquia/bairro que pertence</label>
          <input
            id="parish"
            type="text"
            class="form-control _rounded"
            placeholder="NAASP"
            @input="$emit('update:parish', $event.target.value)"
          />
        </div>
        <div class="form-group">
          <label for="religiousActivities">
            Atividades promovidas por outras instituições religiosas em que
            participa
          </label>
          <input
            id="religiousActivities"
            type="text"
            class="form-control _rounded"
            placeholder="-"
            @input="$emit('update:religiousActivities', $event.target.value)"
          />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'FormStep4',
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
