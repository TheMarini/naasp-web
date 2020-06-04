<template>
  <header class="d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <slot name="icon"></slot>
      <h2 class="ml-3 mb-0">
        <b>{{ title }}</b>
      </h2>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <slot name="CTA"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
