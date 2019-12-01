<template lang="html">
	<div class="form-step">
		<section class="mt-2">
			<h4 class="section-title">SITUAÇÃO ATUAL</h4>
			<form>
			  <div class="form-row">
					<div class="form-group col-md-4">
						<label for="sex">Profissão</label>
						<select @input="$emit('update:profession', $event.target.value)" class="custom-select _rounded" id="sex">
						  <option selected disabled>Escolha uma opção</option>
						  <option value="Aposentado">Aposentado</option>
						  <option value="Autônomo">Autônomo</option>
						  <option value="Desempregado">Desempregado</option>
						  <option value="Empregado">Empregado</option>
						  <option value="Do lar">Do lar</option>
						  <option value="Estudante">Estudante</option>
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
						<label for="fund">Nível</label>
						<select @input="$emit('update:schooling', $event.target.value)" class="custom-select _rounded" id="fund">
						  <option selected disabled>Escolha uma opção</option>
						  <option value="0">Fundamental</option>
						  <option value="1">Médio</option>
						  <option value="2">Curso Técnico</option>
						</select>
					</div>
					<div class="form-group col-md-4">
						<label for="sup">Estado</label>
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
						<select @input="$emit('update:availability', $event.target.value)" class="custom-select _rounded" id="days">
						  <option selected disabled>Escolha uma opção</option>
							<option value="Segunda">Segunda</option>
							<option value="Terça">Terça</option>
							<option value="Quarta">Quarta</option>
							<option value="Quinta">Quinta</option>
							<option value="Sexta">Sexta</option>
							<option value="Sábado">Sábado</option>
							<option value="Domingo">Domingo</option>
						</select>
					</div>
					<div class="form-group col-md-4">
						<label for="per">Período</label>
						<select @input="$emit('update:dayTime', $event.target.value)" class="custom-select _rounded" id="per">
						  <option selected disabled>Escolha uma opção</option>
						  <option value="Manhã">Manhã</option>
						  <option value="Tarde">Tarde</option>
						  <option value="Noite">Noite</option>
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
