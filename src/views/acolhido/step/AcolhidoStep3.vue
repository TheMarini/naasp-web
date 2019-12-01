<template lang="html">
	<div class="form-step">
		<section>
			<h4 class="section-title">SITUAÇÃO DE SAÚDE</h4>
			<form>
				<div class="form-row">
					<div class="form-group col-md-8">
						<label for="physicalActivity">Atividade física que pratica</label>
						<input @input="$emit('update:physicalActivity', $event.target.value)" type="text" class="form-control _rounded" id="physicalActivity" placeholder="">
					</div>
					<div class="form-group col-md-4">
						<label for="medicines">Medicamentos contínuos</label>
						<input @input="$emit('update:medicines', $event.target.value)" type="text" class="form-control _rounded" id="medicines" placeholder="">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-3">
						<label for="qtdCigarettes">Qtd. cigarros (semanais)</label>
						<input @input="$emit('update:qtdCigarettes', $event.target.value)" type="number" min="0" value="0" class="form-control _rounded" id="qtdCigarettes" placeholder="">
					</div>
					<div class="form-group col-md-3">
						<label for="qtdDrinks">Qtd. bebidas (semanais)</label>
						<input @input="$emit('update:qtdDrinks', $event.target.value)" type="number" min="0" value="0" class="form-control _rounded" id="qtdDrinks" placeholder="">
					</div>
					<div class="form-group col-md-6">
						<label for="familyAbuse">Casos de abuso de álcool na família (quem)</label>
						<input @input="$emit('update:familyAbuse', $event.target.value)" type="text" class="form-control _rounded" id="familyAbuse" placeholder="">
					</div>
				</div>
				<div class="form-group">
					<label for="familyDiseases">Casos de doença na família (quem e quais)</label>
					<input @input="$emit('update:familyDiseases', $event.target.value)" type="text" class="form-control _rounded" id="familyDiseases" placeholder="">
				</div>
				<div class="form-group">
					<label for="familyMedicines">Uso de medicamentos continuos na família (quem e quais)</label>
					<input @input="$emit('update:familyMedicines', $event.target.value)" type="text" class="form-control _rounded" id="familyMedicines" placeholder="">
				</div>
			</form>
		</section>
	</div>
</template>

<script>

export default {
	name: 'form-step-3',
	mounted () {
		this.$emit('update:qtdCigarettes', 0)
		this.$emit('update:qtdDrinks', 0)
	}
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
