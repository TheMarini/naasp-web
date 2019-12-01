<template lang="html">
	<div class="form-step">
		<section>
			<h4 class="section-title">DADOS PESSOAIS</h4>
			<form>
			  <div class="form-row">
			    <div class="form-group col-md-4">
			      <label for="name">Nome completo</label>
			      <input @input="$emit('update:name', $event.target.value)" type="text" class="form-control _rounded" id="name" placeholder="">
			    </div>
					<div class="form-group col-md-3">
						<label for="rg">RG</label>
						<input @input="$emit('update:rg', parseInt($event.target.value))" type="number" class="form-control _rounded" id="rg" placeholder="">
					</div>
					<div class="form-group col-md-3">
						<label for="cpf">CPF</label>
						<input @input="$emit('update:cpf', parseInt($event.target.value))" type="number" class="form-control _rounded" id="cpf" placeholder="">
					</div>
					<div class="form-group col-md-2">
						<label for="sex">Sexo</label>
						<select @input="$emit('update:sex', $event.target.value)" class="custom-select _rounded" id="sex">
							<option selected disabled>Escolha uma opção</option>
							<option value="M">Masculino</option>
							<option value="F">Feminino</option>
						</select>
					</div>
			  </div>
				<div class="form-row">
					<div class="form-group col-md-3">
						<label for="work">Cargo de trabalho</label>
						<input @input="$emit('update:work', $event.target.value)" type="text" class="form-control _rounded" id="work" placeholder="">
					</div>
					<div class="form-group col-md-3">
						<label for="school">Escolaridade</label>
						<input @input="$emit('update:school', $event.target.value)" type="text" class="form-control _rounded" id="school" placeholder="">
					</div>
					<div class="form-group col-md-3">
						<label for="civil">Estado civil</label>
						<select @input="$emit('update:civil', $event.target.value)" class="custom-select _rounded" id="civil">
							<option selected disabled>Escolha uma opção</option>
							<option value="Solteiro">Solteiro</option>
							<option value="Casado">Casado</option>
							<option value="Separado">Separado</option>
							<option value="Viúvo">Viúvo</option>
						</select>
					</div>
					<div class="form-group col-md-3">
						<label for="religion">Religião</label>
						<input @input="$emit('update:religion', $event.target.value)" type="text" class="form-control _rounded" id="religion" placeholder="">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-9">
						<label for="end">Endereço completo</label>
						<input @input="$emit('update:end', $event.target.value)" type="text" class="form-control _rounded" id="end" placeholder="">
					</div>
					<div class="form-group col-md-3">
						<label for="cep">CEP</label>
						<input @input="$emit('update:cep', $event.target.value)" type="number" class="form-control _rounded" id="cep" placeholder="">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-3">
						<label for="email">Email</label>
						<input @input="$emit('update:email', $event.target.value)" type="email" class="form-control _rounded" id="email" placeholder="">
					</div>
					<div class="form-group col-md-3">
						<label for="tel-1">Telefone 1</label>
						<input @input="$emit('update:tel1', $event.target.value)" type="number" class="form-control _rounded" id="tel-1" placeholder="">
					</div>
					<div class="form-group col-md-3">
						<label for="tel-2">Telefone 2</label>
						<input @input="$emit('update:tel2', $event.target.value)" type="number" class="form-control _rounded" id="tel-2" placeholder="">
					</div>
					<div class="form-group col-md-3">
						<label for="birth-date">Data de nascimento</label>
						<input v-model="birthDate" type="date" class="form-control _rounded" id="birth-date">
					</div>
				</div>
				<div v-if="minor">
					<hr>
					<div class="form-row">
						<div class="form-group col-md-8">
							<label for="name-resp">Nome completo do responsável</label>
							<input @input="$emit('update:nameResp', $event.target.value)" type="text" class="form-control _rounded" id="name-resp" placeholder="">
						</div>
						<div class="form-group col-md-4">
							<label for="rg-resp">RG</label>
							<input @input="$emit('update:rgResp', parseInt($event.target.value))" type="number" class="form-control _rounded" id="rg-resp" placeholder="">
						</div>
					</div>
				</div>
			</form>
		</section>
	</div>
</template>

<script>
// Moment
import moment from 'moment';

import { ActivityIcon, BookOpenIcon, ClipboardIcon } from 'vue-feather-icons'

export default {
	name: 'form-step-1',
	components: {
		ActivityIcon,
		BookOpenIcon,
		ClipboardIcon
	},
	data () {
		return {
			birthDate: null,
			minor: false
		}
	},
	watch: {
		birthDate: function () {
			this.$emit('update:birthDate', this.birthDate);
			this.minor = moment().diff(this.birthDate, 'years') < 18;
		}
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
