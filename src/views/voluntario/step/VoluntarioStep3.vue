<template lang="html">
	<div class="form-step">
		<section class="mt-2">
			<h4 class="section-title">SITUAÇÃO ATUAL</h4>
			<form>
			  <div class="form-row">
					<div class="form-group col-md-4">
						<label for="sex">Profissão</label>
						<select v-model="form.employee.profession" class="custom-select _rounded" id="sex">
						  <option selected disabled>Escolha uma opção</option>
						  <option value="0">Aposentado</option>
						  <option value="1">Autônomo</option>
						  <option value="2">Desempregado</option>
						  <option value="3">Empregado</option>
						  <option value="4">Do lar</option>
						  <option value="5">Estudante</option>
						</select>
					</div>
			  </div>
			</form>
		</section>
		<section class="mt-2">
			<h4 class="section-title">ESCOLARIDADE</h4>
			<form>
			  <div class="form-row">
					<div class="form-group col-md-4">
						<label for="fund">Fundamental</label>
						<select class="custom-select _rounded" id="fund">
						  <option selected disabled>Escolha uma opção</option>
						  <option value="0">Fundamental</option>
						  <option value="1">Médio</option>
						  <option value="2">Curso Técnico</option>
						</select>
					</div>
					<div class="form-group col-md-4">
						<label for="sup">Superior</label>
						<select class="custom-select _rounded" id="sup">
						  <option selected disabled>Escolha uma opção</option>
						  <option value="0">Completo</option>
						  <option value="1">Incompleto</option>
						  <option value="2">Cursando</option>
						</select>
					</div>
			  </div>
			</form>
		</section>
		<section class="mt-2">
			<h4 class="section-title">DISPONIBILIDADE</h4>
			<form>
			  <div class="form-row">
					<div class="form-group col-md-4">
						<label for="days">Dias da semana</label>
						<select v-model="form.employee.availability" class="custom-select _rounded" id="days">
						  <option selected disabled>Escolha uma opção</option>
						</select>
					</div>
					<div class="form-group col-md-4">
						<label for="per">Período</label>
						<select v-model="form.employee.dayTime" class="custom-select _rounded" id="per">
						  <option selected disabled>Escolha uma opção</option>
						  <option value="0">Manhã</option>
						  <option value="1">Tarde</option>
						  <option value="2">Noite</option>
						</select>
					</div>
			  </div>
			</form>
		</section>
		<section class="mt-2">
			<h4 class="section-title">PESSOA DE CONTATO</h4>
			<form>
			  <div class="form-row">
					<div class="form-group col-md-4">
						<label for="name">Nome completo</label>
						<input type="text" class="form-control _rounded" id="name" placeholder="">
					</div>
					<div class="form-group col-md-4">
						<label for="tel">Telefone</label>
						<input type="number" class="form-control _rounded" id="tel" placeholder="">
					</div>
			  </div>
			</form>
		</section>
	</div>
</template>

<script>
import { ActivityIcon, BookOpenIcon, ClipboardIcon } from 'vue-feather-icons'

export default {
	name: 'form-step-3',
	components: {
		ActivityIcon,
		BookOpenIcon,
		ClipboardIcon
	},
	data() {
		return {
			form: {
				'employee': {
					'profession': null,
					'availability': null,
					'dayTime': null,
				},
			},
		}
	},
	watch: {
		form: {
			handler: function () {
				this.$emit('input', this.form);
			},
			deep: true,
		},
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
