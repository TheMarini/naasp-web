<template>
  <div class="home vh-100 vw-100">
    <div class="d-flex h-100 w-100">
      <SideNav></SideNav>
      <main class="h-100 w-100">
				<transition>
				  <keep-alive>
				    <router-view></router-view>
				  </keep-alive>
				</transition>
      </main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Logo from '@/components/Logo.vue';
import SideNav from '@/components/SideNav.vue';
import Login from '@/views/Login.vue';
import VehicleList from '@/components/VehicleList.vue';
import SpotList from '@/components/SpotList.vue';

import Voluntario from '@/views/voluntario/Voluntario.vue';

export default {
	path: '/',
  name: 'home',
  components: {
    Logo,
    SideNav,
    Login,
		VehicleList,
		SpotList
  },
	children: [{
    path: 'voluntarios',
    component: Voluntario,
  }],
  data() {
    return {
      showLogin: false,
			showVehicleList: false,
			showSpotList: false,
			showCars: false,
			user: null,
    }
  },
	methods: {
		logged(user) {
			console.log("Usuário:", user);
			this.user = user;
		},

		create() {

		}
	}
};
</script>

<style scoped>
.right {
  position: absolute;
  right: 0;
  top: 0
}

.cars {
	background-color: #fff;
}

.user {
	background-color: #00adb5;
	color: #fff;
	font-weight: 500
}

.logo {
  position: absolute;
  top: 0;
  left: 0
}

.login-container, .vehicle-list-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999999
}

.logout {
	transition: .3s;
}

.logout:hover{
	background-color: indianred;
	border-color: indianred;
}


main {
  position: relative;
}
</style>
