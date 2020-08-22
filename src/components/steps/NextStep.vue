<template>
  <button
    v-if="currentStep < total"
    type="button"
    :class="themeClass"
    class="btn py-2 px-3 d-flex align-items-center _rounded-100"
    @click="input"
  >
    <h5 class="mb-0 px-2"><b>Próxima</b></h5>
    <chevron-right-icon size="1.5x" class="custom-class"></chevron-right-icon>
  </button>
</template>

<script>
// Icons
import { ChevronRightIcon } from 'vue-feather-icons';

export default {
  name: 'NextStep',
  components: {
    ChevronRightIcon,
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    method: {
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
  computed: {
    themeClass() {
      return this.method === 'create' ? 'create-theme' : 'update-theme';
    },
  },
  watch: {
    value(value) {
      this.currentStep = value;
    },
  },
  methods: {
    input() {
      this.currentStep += 1;
      this.$emit('input', this.currentStep);
    },
  },
};
</script>

<style scoped>
.create-theme {
  color: #fff;
  background-color: #175d2b;
}

.update-theme {
  color: #000;
  background-color: #e3db4a;
}
</style>
