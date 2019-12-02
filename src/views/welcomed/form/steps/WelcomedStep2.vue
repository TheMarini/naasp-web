<template lang="html">
	<div class="form-step">
		<!-- <section>
			<h4 class="section-title">DADOS E CONDIÇÕES DOS FAMILIARES</h4>
			<p>Pessoas relevantes na vida do acolhido, que suportam direta/indiretamente, coabitando na mesma casa ou não:</p>
		</section> -->
		<section>
			<h4 class="section-title">DADOS E CONDIÇÕES DOS FAMILIARES</h4>
			<form>
				<div class="form-row">
					<div class="form-group col-md-8">
						<label for="government-benefit-name">Benefício financeiro governamental</label>
						<input @input="$emit('update:governmentBenefitName', $event.target.value)" type="text" class="form-control _rounded" id="government-benefit-name" placeholder="-">
					</div>
					<div class="form-group col-md-4">
						<label for="government-benefit-value">Valor</label>
						<input @input="$emit('update:governmentBenefitValue', $event.target.value)" type="text" class="form-control _rounded" id="government-benefit-value" placeholder="-">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-12">
						<label for="family-income-comments">Observações sobre renda familiar</label>
						<textarea @input="$emit('update:familyIncomeComments', $event.target.value)"  class="form-control _rounded" id="family-income-comments"></textarea>
					</div>
				</div>
			</form>
		</section>
		<section class="mt-2">
			<h4 class="section-title">CONDIÇÕES DE MORADIA</h4>
			<form>
				<div class="form-row">
					<div class="form-group col-md-4">
						<label for="housing-condition">Moradia</label>
						<select @input="$emit('update:housingCondition', $event.target.value)" class="custom-select _rounded" id="housing-condition">
							<option selected disabled>Escolha uma opção</option>
							<option value="Própria">Própria</option>
							<option value="Alugada">Alugada</option>
							<option value="Cedida">Cedida</option>
							<option value="Financiada">Financiada</option>
						</select>
					</div>
				</div>
			</form>
		</section>
	</div>
</template>

<script>

export default {
	name: 'form-step-2',
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
