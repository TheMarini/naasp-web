<template lang="html">
	<nav class="side-nav">
		<div class="side-nav-header">
			<img class="w-100 py-2 px-3" src="@/assets/logo/logo-name.svg" alt="">
		</div>
		<ul class="nav flex-column">
		  <li class="nav-item">
		    <a class="nav-link disabled" href="#">Principal</a>
		  </li>
		  <li class="nav-item">
				<router-link class="nav-link active" :to="'/voluntario'">Voluntários</router-link>
		  </li>
			<li class="nav-item">
				<router-link class="nav-link" :to="'/acolhido'">Acolhidos</router-link>
		  </li>
		  <li class="nav-item">
		    <a class="nav-link disabled" href="#">Agenda</a>
		  </li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'side-nav'
}
</script>

<style lang="css" scoped>
.side-nav {
	height: 100vh;
	width: 230px;
	background-color: #fff;
	z-index: 99999
}
</style>
