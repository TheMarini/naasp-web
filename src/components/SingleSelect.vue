<template>
  <multiselect
    :value="value"
    :options="options"
    :track-by="trackBy"
    :label="label"
    :searchable="searchable"
    :open-direction="openDirection"
    placeholder="Escolha uma opção"
    select-label="Pressione enter para selecionar"
    selected-label="Selecionado"
    deselect-label="Pressione enter para remover seleção"
    @input="(value) => $emit('input', value)"
  >
  </multiselect>
</template>

<script>
// Multiselect
import Multiselect from 'vue-multiselect';

export default {
  name: 'SingleSelect',
  components: {
    Multiselect,
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Array,
      default: () => [],
    },
    trackBy: {
      type: String,
      default: 'id',
    },
    label: {
      type: String,
      default: 'name',
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    openDirection: {
      type: String,
      default: '',
    },
  },
};
</script>
