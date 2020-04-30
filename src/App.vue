<template>
  <div id="app" class="app">
    <div class="d-flex h-100 w-100">
      <SideNav></SideNav>
      <main class="h-100 w-100">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </main>
    </div>
  </div>
</template>

<script>
import SideNav from '@/components/SideNav.vue';

export default {
  name: 'app',
  components: {
    SideNav,
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
/* Change this import to the local font files */
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,500i,700,900&display=swap');

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #000;
  background-color: #F5F5F5
}

main {
  margin-left: 200px;
  min-height: 100vh
}

a, a:hover {
  color: inherit;
  text-decoration: inherit !important;
}
/* --- OVERRIDES --- */
.swal2-popup {
  border-radius: 10px
}
.swal2-actions button {
  border-radius: 10px !important
}

.multiselect__tags {
  border-radius: 10px
}
.multiselect__content-wrapper {
  border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.delete-icon {
  transition: .3s
}
.delete-icon:hover {
  color: indianred
}

/* --- TRANSITIONS --- */
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* --- GLOBALS --- */
/* ~ Rounded ~ */
._rounded-100 {
  border-radius: 100px !important
}
._rounded {
  border-radius: 10px !important
}
._rounded-tl {
  border-top-left-radius: 10px !important
}
._rounded-tr {
  border-top-right-radius: 10px !important
}
._rounded-bl {
  border-bottom-left-radius: 10px !important
}
._rounded-br {
  border-bottom-right-radius: 10px !important
}

/* ~ Squared ~ */
._squared {
  border-radius: 0 !important
}
._squared-tl {
  border-top-left-radius: 0 !important
}
._squared-tr {
  border-top-right-radius: 0 !important
}
._squared-bl {
  border-bottom-left-radius: 0 !important
}
._squared-br {
  border-bottom-right-radius: 0 !important
}

/* ~ Card ~ */
._card {
  background-color: #fff;
  border-radius: 10px !important
}
</style>
