<template lang="html">
	<div class="form-step">
		<section>
			<h4 class="section-title">PAPEL</h4>
			<div class="d-flex">
				<button @click="userType = 0" :class="userType === 0 ? 'active' : ''" class="_card btn btn-light text-center d-flex flex-column justify-content-center align-items-center">
					<activity-icon size="1.5x" class="custom-class"></activity-icon>
					<p class="mb-0 mt-2">Médica</p>
				</button>
				<button @click="userType = 1" :class="userType === 1 ? 'active' : ''" class="_card btn btn-light ml-3 text-center d-flex flex-column justify-content-center align-items-center">
					<book-open-icon size="1.5x" class="custom-class"></book-open-icon>
					<p class="mb-0 mt-2">Secretária</p>
				</button>
				<button @click="userType = 2" :class="userType === 2 ? 'active' : ''" class="_card btn btn-light ml-3 text-center d-flex flex-column justify-content-center align-items-center">
					<clipboard-icon size="1.5x" class="custom-class"></clipboard-icon>
					<p class="mb-0 mt-2">Assitente <br> Social</p>
				</button>
			</div>
		</section>
	</div>
</template>

<script>
import { ActivityIcon, BookOpenIcon, ClipboardIcon } from 'vue-feather-icons'

export default {
	name: 'form-step-1',
	components: {
		ActivityIcon,
		BookOpenIcon,
		ClipboardIcon
	},
	data() {
		return {
			userType: null
		}
	},
	methods: {
	},
};
</script>

<style lang="css" scoped>
._card {
	height: 150px;
	width: 150px;
	cursor: pointer;
}

._card.active {
	color: #fff !important;
	background-color: #707070 !important;
}
</style>
