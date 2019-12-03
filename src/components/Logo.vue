<template lang="html">
	<div>
		<div class="d-flex align-items-center">
			<img :src="imgSrc" alt="">
			<h2 v-if="name" class="name" :style="{color: textColor}">Guardian</h2>
		</div>
	</div>
</template>

<script>
export default {
	name: 'logo',
	props: {
		variant: {
			type: String,
			default: 'dark'
		},
		name: {
			type: Boolean,
			default: true
		},
		nameColor: {
			type: String,
			default: 'dark'
		}
	},
	computed: {
		imgSrc() {
			// TODO: verify if it's gambs
			return require(`../assets/logo/logo-${this.variant}.svg`);
		},

		textColor() {
			switch (this.nameColor) {
				case 'blue':
					return '#00adb5';
					break;

				case 'dark':
					return '#393e46';
					break;

				case 'light':
				default:
					return '#eeeeee';
			}
		}
	}
};
</script>

<style lang="css" scoped>
.name {
	font-weight: 600
}
</style>
