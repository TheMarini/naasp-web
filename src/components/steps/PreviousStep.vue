<template>
  <div v-if="value > 1" class="d-inline-flex prev-btn mb-2" @click="input">
    <arrow-left-icon size="1.5x" class="custom-class"></arrow-left-icon>
    <p class="mb-0 ml-1">Voltar a etapa anterior</p>
  </div>
</template>

<script>
// Icons
import { ArrowLeftIcon } from 'vue-feather-icons';

export default {
  name: 'PreviousStep',
  components: {
    ArrowLeftIcon,
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentStep: this.value,
    };
  },
  watch: {
    value(value) {
      this.currentStep = value;
    },
  },
  methods: {
    input() {
      this.currentStep -= 1;
      this.$emit('input', this.currentStep);
    },
  },
};
</script>
