<template lang="html">
	<div class="form-step">
		<section>
			<h4 class="section-title">DADOS PESSOAIS</h4>
			<form>
			  <div class="form-row">
			    <div class="form-group col-md-6">
			      <label for="name">Nome completo</label>
			      <input type="text" class="form-control _rounded" id="name" placeholder="">
			    </div>
					<div class="form-group col-md-3">
			      <label for="birth-date">Data de nascimento</label>
			      <input type="date" class="form-control _rounded" id="birth-date">
			    </div>
					<div class="form-group col-md-3">
						<label for="sex">Sexo</label>
						<select class="custom-select _rounded" id="sex">
						  <option selected disabled>Escolha uma opção</option>
						  <option value="0">Masculino</option>
						  <option value="1">Feminino</option>
						</select>
					</div>
			  </div>
				<div class="form-row">
					<div class="form-group col-md-3">
						<label for="rg">RG</label>
						<input type="number" class="form-control _rounded" id="rg" placeholder="">
					</div>
					<div class="form-group col-md-3">
						<label for="cpf">CPF</label>
						<input type="number" class="form-control _rounded" id="cpf" placeholder="">
					</div>
					<div class="form-group col-md-3">
						<label for="nac">Nacionalidade</label>
						<input type="text" class="form-control _rounded" id="nac" placeholder="">
					</div>
					<div class="form-group col-md-3">
						<label for="nat">Naturalidade</label>
						<input type="text" class="form-control _rounded" id="nat" placeholder="">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-3">
						<label for="end">Endereço residencial</label>
						<input type="text" class="form-control _rounded" id="end" placeholder="">
					</div>
					<div class="form-group col-md-3">
						<label for="neighborhood">Bairro</label>
						<input type="text" class="form-control _rounded" id="neighborhood" placeholder="">
					</div>
					<div class="form-group col-md-3">
						<label for="city">Cidade</label>
						<input type="text" class="form-control _rounded" id="city" placeholder="">
					</div>
					<div class="form-group col-md-3">
						<label for="cep">CEP</label>
						<input type="number" class="form-control _rounded" id="cep" placeholder="">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-4">
						<label for="tel-cel">Telefone celular</label>
						<input type="number" class="form-control _rounded" id="tel-cel" placeholder="">
					</div>
					<div class="form-group col-md-4">
						<label for="tel-res">Telefone residencial</label>
						<input type="number" class="form-control _rounded" id="tel-res" placeholder="">
					</div>
					<div class="form-group col-md-4">
						<label for="tel-com">Telefone comercial</label>
						<input type="number" class="form-control _rounded" id="tel-com" placeholder="">
					</div>
				</div>
				<div class="form-group">
					<label for="email">Email</label>
					<input type="email" class="form-control _rounded" id="email" placeholder="">
				</div>
			</form>
		</section>
	</div>
</template>

<script>
import { ActivityIcon, BookOpenIcon, ClipboardIcon } from 'vue-feather-icons'

export default {
	name: 'form-step-2',
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
