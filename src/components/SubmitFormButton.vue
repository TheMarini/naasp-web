<template>
  <button
    type="button"
    :class="themeClass"
    class="btn py-2 px-3 d-flex align-items-center _rounded-100"
    @click="$emit('click', method)"
  >
    <h5 class="mb-0 px-2">
      <b>{{ text }}</b>
    </h5>
    <clipboard-icon
      v-if="createText === 'Pré-Cadastrar'"
      size="1.5x"
      class="clipboard-icon"
    ></clipboard-icon>
    <plus-icon
      v-else-if="method === 'create'"
      size="1.5x"
      class="create-icon"
    ></plus-icon>
    <edit-icon v-else size="1.5x" class="update-icon"></edit-icon>
  </button>
</template>

<script>
// Icons
import { PlusIcon, EditIcon, ClipboardIcon } from 'vue-feather-icons';

export default {
  name: 'SubmitFormButton',
  components: {
    PlusIcon,
    EditIcon,
    ClipboardIcon,
  },
  props: {
    method: {
      type: String,
      default: 'create',
      validator: (value) => value === 'create' || value === 'update',
    },
    createText: {
      type: String,
      default: 'Adicionar',
    },
    updateText: {
      type: String,
      default: 'Editar',
    },
  },
  computed: {
    themeClass() {
      return this.method === 'create' ? 'create-theme' : 'update-theme';
    },
    text() {
      return this.method === 'create' ? this.createText : this.updateText;
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
