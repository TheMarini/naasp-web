<template lang="html">
  <div
    class="step d-flex justify-content-center align-items-center"
    :style="[active ? activeStyle : defaultStyle]"
    >
    <span class="number"><b>{{number}}</b></span>
  </div>
</template>

<script>
export default {
  name: 'step',
  props: {
    number: {
      type: Number,
      required: true,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    activeStyle: {
      type: Object,
      default() {
        if (this.editMode) return { color: '#000', backgroundColor: '#E3DB4A' };

        return { color: '#fff', backgroundColor: '#175D2B' };
      },
    },
    defaultStyle: {
      type: Object,
      default: () => ({
        color: '#707070',
        backgroundColor: '#fff',
      }),
    },
  },
};
</script>

<style lang="css" scoped>
.step {
  border-radius: 100px
}

.name {
  font-weight: 600
}
</style>
