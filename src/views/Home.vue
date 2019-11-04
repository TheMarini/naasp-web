<template>
  <div class="home vh-100 vw-100">
    <div class="d-flex h-100 w-100">
      <!-- <SideNav></SideNav> -->
      <main class="h-100 w-100 bg-dark">
        <Logo class="logo m-2"></Logo>
				<div class="right d-flex justify-content-center align-items-center m-2">
					<div v-if="user" class="btn-group _rounded shadow-sm" role="group">
					  <button v-if="user.type == 'driver'" title="Lista de Veículos" @click="showVehicleList = true" type="button" class="cars btn _rounded-tl _rounded-bl ">
							<img src="@/assets/icon/car.svg" alt="">
						</button>
					  <button v-else title="Lista de Vagas" @click="showSpotList = true" type="button" class="btn btn-light _rounded-tl _rounded-bl ">
							<img src="@/assets/icon/rectangles.svg" alt="">
						</button>
						<button title="Perfil" class="user btn px-4 shadow-sm _rounded-tr _rounded-br">
							{{user.name}}
						</button>
						<button title="logout" @click="user = null" type="button" class="logout btn btn-dark _rounded ml-2">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path fill="none" d="M0 0h24v24H0V0z"/>
								<path fill="white" d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
							</svg>
						</button>
					</div>
					<button @click="showLogin = true" v-if="!user" class="login btn btn-dark px-4 ml-2 _rounded">Login</button>
				</div>
      </main>
    </div>
    <Login @close="showLogin = false" @logged="logged" v-if="showLogin" class="login-container h-100 w-100"></Login>
    <VehicleList @close="showVehicleList = false" v-if="showVehicleList" :userId="this.user.id" class="vehicle-list-container h-100 w-100"></VehicleList>
    <SpotList @close="showSpotList = false" v-if="showSpotList" :userId="this.user.id" class="vehicle-list-container h-100 w-100"></SpotList>
  </div>
</template>

<script>
// @ is an alias to /src
import Logo from '@/components/Logo.vue';
import SideNav from '@/components/SideNav.vue';
import Login from '@/views/Login.vue';
import VehicleList from '@/components/VehicleList.vue';
import SpotList from '@/components/SpotList.vue';

export default {
  name: 'home',
  components: {
    Logo,
    SideNav,
    Login,
		VehicleList,
		SpotList
  },
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
  background-image: url('~@/assets/img/map.png');
	background-position: center;
	/* background-size: cover; */
	background-repeat: none;
  position: relative;
}
</style>
