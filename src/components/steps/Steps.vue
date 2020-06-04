<template>
  <div class="steps d-flex">
    <step
      v-for="index of total"
      :key="index"
      :active="index <= currentStep"
      :theme="theme"
      class="step ml-2"
      @click.native="input(index)"
    >
      {{ index }}
    </step>
  </div>
</template>

<script>
// Step
import Step from '@/components/steps/Step.vue';

export default {
  name: 'Steps',
  components: {
    Step,
  },
  props: {
    value: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      required: true,
    },
    theme: {
      type: String,
      default: 'create',
      validator: (value) => value === 'create' || value === 'update',
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
    input(value) {
      this.currentStep = value;
      this.$emit('input', this.currentStep);
    },
  },
};
</script>
