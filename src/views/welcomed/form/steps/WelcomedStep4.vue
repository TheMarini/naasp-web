<template lang="html">
	<div class="form-step">
		<section>
			<h4 class="section-title">DADOS PAROQUIAIS</h4>
			<form>
				<div class="form-group">
					<label for="parish">Paróquia/bairro que pertence</label>
					<input @input="$emit('update:parish', $event.target.value)" type="text" class="form-control _rounded" id="parish" placeholder="NAASP">
				</div>
				<div class="form-group">
					<label for="religiousActivities">Atividades promovidas por outras instituições religiosas em que participa</label>
					<input @input="$emit('update:religiousActivities', $event.target.value)" type="text" class="form-control _rounded" id="religiousActivities" placeholder="-">
				</div>
			</form>
		</section>
	</div>
</template>

<script>

export default {
	name: 'form-step-4',
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
