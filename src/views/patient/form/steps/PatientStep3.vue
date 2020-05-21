<template lang="html">
  <div class="form-step">
    <section>
      <h4 class="section-title">SITUAÇÃO DE SAÚDE</h4>
      <form>
        <div class="form-row">
          <div class="form-group col-md-8">
            <label for="physicalActivity">Atividade física que pratica</label>
            <input
              id="physicalActivity"
              type="text"
              class="form-control _rounded"
              placeholder="Ciclismo, corrida, futebol, academia..."
              @input="$emit('update:physicalActivity', $event.target.value)"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="medicines">Medicamentos contínuos</label>
            <input
              id="medicines"
              type="text"
              class="form-control _rounded"
              placeholder="Omeprazol, metronidazol..."
              @input="$emit('update:medicines', $event.target.value)"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="qtdCigarettes">Qtd. cigarros (semanais)</label>
            <input
              id="qtdCigarettes"
              type="number"
              min="0"
              value="0"
              class="form-control _rounded"
              placeholder=""
              @input="
                $emit('update:qtdCigarettes', parseInt($event.target.value))
              "
            />
          </div>
          <div class="form-group col-md-3">
            <label for="qtdDrinks">Qtd. bebidas (semanais)</label>
            <input
              id="qtdDrinks"
              type="number"
              min="0"
              value="0"
              class="form-control _rounded"
              placeholder=""
              @input="$emit('update:qtdDrinks', parseInt($event.target.value))"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="familyAlcoholAbuse"
              >Casos de abuso de álcool na família (quem)</label
            >
            <input
              id="familyAlcoholAbuse"
              type="text"
              class="form-control _rounded"
              placeholder="Pai, mãe, tio, primo..."
              @input="$emit('update:familyAlcoholAbuse', $event.target.value)"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="familyDiseases"
            >Casos de doença na família (quem e quais)</label
          >
          <input
            id="familyDiseases"
            type="text"
            class="form-control _rounded"
            placeholder="Mãe - Alzheimer, Pai - Diabetes..."
            @input="$emit('update:familyDiseases', $event.target.value)"
          />
        </div>
        <div class="form-group">
          <label for="familyMedicines">
            Uso de medicamentos continuos na família (quem e quais)
          </label>
          <input
            id="familyMedicines"
            type="text"
            class="form-control _rounded"
            placeholder="Irmão - Clortalidona, Tio - Atenolol..."
            @input="$emit('update:familyMedicines', $event.target.value)"
          />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'FormStep3',
  mounted() {
    this.$emit('update:qtdCigarettes', 0);
    this.$emit('update:qtdDrinks', 0);
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
