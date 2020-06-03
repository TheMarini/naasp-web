<template lang="html">
  <nav class="side-nav">
    <div class="side-nav-header">
      <img class="w-100 py-2 px-3" src="@/assets/logo/logo-name.svg" alt="" />
    </div>
    <ul class="nav flex-column px-2 mt-3">
      <span class="side-nav-title pl-3">MENU</span>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">
          <home-icon size="1.5x" class="custom-class"></home-icon>
          <span class="ml-2">Principal</span>
        </a>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="'/voluntario'">
          <users-icon size="1.5x" class="custom-class"></users-icon>
          <span class="ml-2">Voluntários</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="'/acolhido'">
          <heart-icon size="1.5x" class="custom-class"></heart-icon>
          <span class="ml-2">Acolhidos</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="'/calendar'">
          <calendar-icon size="1.5x" class="custom-class"></calendar-icon>
          <span class="ml-2">Agenda</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {
  HomeIcon,
  UsersIcon,
  HeartIcon,
  CalendarIcon,
} from 'vue-feather-icons';

export default {
  name: 'SideNav',
  components: {
    HomeIcon,
    UsersIcon,
    HeartIcon,
    CalendarIcon,
  },
};
</script>

<style lang="css" scoped>
.side-nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;
  background-color: #fff;
  z-index: 999;
}

.side-nav-title {
  color: #707070;
  font-size: 0.9rem;
  font-weight: 600;
}

.nav-link.disabled {
  opacity: 0.6;
}

.nav-link {
  color: #707070;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  border-radius: 100px;
}

.nav-link.router-link-active {
  color: #fff;
  background-color: #175d2b;
  font-weight: 600;
}

.nav-link.router-link-active svg {
  stroke-width: 2.2;
}
</style>
