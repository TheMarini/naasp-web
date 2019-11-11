<template lang="html">
	<div class="step d-flex justify-content-center align-items-center" :style="[active ? activeStyle : defaultStyle]">
		<span class="number"><b>{{number}}</b></span>
	</div>
</template>

<script>
export default {
	name: 'step',
	props: {
		number: {
			type: Number,
			required: true
		},
		active: {
			type: Boolean,
			default: false
		},
		defaultStyle: {
			type: Object,
			default: () => ({
				color: "#707070",
				backgroundColor: "#fff"
			})
		},
		addMethod: {
			type: Boolean,
			default: true
		},
		activeStyle: {
			type: Object,
			default: function () {
				if (this.addMethod)
					return { color: "#fff", backgroundColor: "#175D2B" }

				return { color: "#000", backgroundColor: "#E3DB4A" }
			}
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
