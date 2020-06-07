<template lang="html">
  <div
    :class="active ? themeClass : ''"
    class="step d-flex justify-content-center align-items-center"
  >
    <span class="number">
      <b><slot></slot></b>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Step',
  props: {
    method: {
      type: String,
      default: 'create',
      validator: (value) => value === 'create' || value === 'update',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    themeClass() {
      return this.method === 'create' ? 'create-theme' : 'update-theme';
    },
  },
};
</script>

<style lang="css" scoped>
.step {
  height: 45px;
  width: 45px;
  cursor: pointer;
  border-radius: 100px;
  color: #707070;
  background-color: #fff;
}

.name {
  font-weight: 600;
}

.create-theme {
  color: #fff;
  background-color: #175d2b;
}

.update-theme {
  color: #000;
  background-color: #e3db4a;
}
</style>
