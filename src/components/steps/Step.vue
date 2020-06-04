<template lang="html">
  <div
    class="step d-flex justify-content-center align-items-center"
    :style="[active ? activeStyle : defaultStyle]"
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
    theme: {
      type: String,
      default: 'create',
      validator: (value) => value === 'create' || value === 'update',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      defaultStyle: {
        color: '#707070',
        backgroundColor: '#fff',
      },
    };
  },
  computed: {
    activeStyle() {
      if (this.theme === 'update')
        return { color: '#000', backgroundColor: '#E3DB4A' };

      return { color: '#fff', backgroundColor: '#175D2B' };
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
}

.name {
  font-weight: 600;
}
</style>
