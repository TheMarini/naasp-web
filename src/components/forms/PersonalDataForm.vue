<template lang="html">
	<div class="form-step">
		<section>
			<h4 class="section-title">DADOS PESSOAIS</h4>
			<form>
			  <div class="form-row">
			    <div class="form-group col-md-6">
			      <label for="name">Nome completo</label>
			      <input @input="$emit('update:name', $event.target.value)" type="text" class="form-control _rounded" id="name" placeholder="Douglas Adams">
			    </div>
					<div class="form-group col-md-3">
						<label for="rg">RG</label>
						<input @input="$emit('update:rg', parseInt($event.target.value))" type="number" class="form-control _rounded" id="rg" placeholder="123456789">
					</div>
					<div class="form-group col-md-3">
						<label for="cpf">CPF</label>
						<input @input="$emit('update:cpf', parseInt($event.target.value))" type="number" class="form-control _rounded" id="cpf" placeholder="">
					</div>
			  </div>
				<div class="form-row">
					<div class="form-group col-md-3">
						<label for="sex">Sexo</label>
						<select @input="$emit('update:sex', $event.target.value)" class="custom-select _rounded" id="sex">
							<option selected disabled>Escolha uma opção</option>
							<option value="M">Masculino</option>
							<option value="F">Feminino</option>
						</select>
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
						<label for="school">Escolaridade</label>
						<input @input="$emit('update:school', $event.target.value)" type="text" class="form-control _rounded" id="school" placeholder="Ensino médio, graduação...">
					</div>
					<div class="form-group col-md-3">
						<label for="work">Cargo de trabalho</label>
						<input @input="$emit('update:work', $event.target.value)" type="text" class="form-control _rounded" id="work" placeholder="Professor, engenheiro, médico...">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-3 mb-0">
						<label for="birth-date">Data de nascimento</label>
						<input v-model="birthDate" type="date" class="form-control _rounded" id="birth-date">
					</div>
					<div class="form-group col-md-3 mb-0">
						<label for="religion">Religião</label>
						<input @input="$emit('update:religion', $event.target.value)" type="text" class="form-control _rounded" id="religion" placeholder="Cristianismo, Catolicismo, Ateu...">
					</div>
					<div class="form-group col-md-3 mb-0">
						<label for="place-of-birth">Naturalidade</label>
						<input @input="$emit('update:placeOfBirth', $event.target.value)" type="text" class="form-control _rounded" id="place-of-birth" placeholder="Belo Horizonte, MG">
					</div>
					<div class="form-group col-md-3 mb-0">
						<label for="nationality">Nacionalidade</label>
						<input @input="$emit('update:nationality', $event.target.value)" type="text" class="form-control _rounded" id="nationality" placeholder="Brasileira">
					</div>
				</div>
			</form>
		</section>
		<hr class="my-4">
		<section>
			<h4 class="section-title">ENDEREÇO</h4>
			<form>
				<div class="form-row">
					<div class="form-group col-md-8">
						<label for="end">Endereço</label>
						<input @input="$emit('update:end', $event.target.value)" type="text" class="form-control _rounded" id="end" placeholder="Rua do Limão">
					</div>
					<div class="form-group col-md-4">
						<label for="end">Bairro</label>
						<input @input="$emit('update:neighborhood', $event.target.value)" type="text" class="form-control _rounded" id="end" placeholder="Limoeiro">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-4 mb-0">
						<label for="end">Cidade</label>
						<input @input="$emit('update:city', $event.target.value)" type="text" class="form-control _rounded" id="end" placeholder="São Paulo">
					</div>
					<div class="form-group col-md-4 mb-0">
						<label for="end">Estado</label>
						<input @input="$emit('update:state', $event.target.value)" type="text" class="form-control _rounded" id="end" placeholder="São Paulo">
					</div>
					<div class="form-group col-md-4 mb-0">
						<label for="cep">CEP</label>
						<input @input="$emit('update:cep', $event.target.value)" type="number" class="form-control _rounded" id="cep" placeholder="">
					</div>
				</div>
			</form>
		</section>
		<hr class="my-4">
		<section>
			<h4 class="section-title">CONTATO</h4>
			<form>
				<div class="form-row">
					<div class="form-group col-md-4">
						<label for="cell-phone-number">Telefone celular</label>
						<input @input="$emit('update:cellPhoneNumber', $event.target.value)" type="number" class="form-control _rounded" id="cell-phone-number" placeholder="">
					</div>
					<div class="form-group col-md-4">
						<label for="home-phone-number">Telefone residencial</label>
						<input @input="$emit('update:homePhoneNumber', $event.target.value)" type="number" class="form-control _rounded" id="home-phone-number" placeholder="">
					</div>
					<div class="form-group col-md-4">
						<label for="business-phone-number">Telefone comercial</label>
						<input @input="$emit('update:businessPhoneNumber', $event.target.value)" type="number" class="form-control _rounded" id="business-phone-number" placeholder="">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-12" :class="underage ?  'mb-0' : ''">
						<label for="email">E-mail</label>
						<input @input="$emit('update:email', $event.target.value)" type="email" class="form-control _rounded" id="email" placeholder="douglas@exemplo.com">
					</div>
				</div>
			</form>
		</section>
		<section v-if="underage && responsibleForm">
			<hr class="my-4">
			<h4 class="section-title">RESPONSÁVEL</h4>
			<form>
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="name-resp">Nome completo</label>
						<input @input="$emit('update:nameResp', $event.target.value)" type="text" class="form-control _rounded" id="name-resp" placeholder="Spike Jonze">
					</div>
					<div class="form-group col-md-3">
						<label for="rg-resp">RG</label>
						<input @input="$emit('update:rgResp', parseInt($event.target.value))" type="number" class="form-control _rounded" id="rg-resp" placeholder="">
					</div>
					<div class="form-group col-md-3">
						<label for="cpf-resp">CPF</label>
						<input @input="$emit('update:cpfResp', parseInt($event.target.value))" type="number" class="form-control _rounded" id="cpf-resp" placeholder="">
					</div>
				</div>
			</form>
		</section>
	</div>
</template>

<script>
// Moment
import moment from 'moment';

export default {
	name: 'personal-data-form',
	props: {
		responsibleForm: {
			type: Boolean,
			default: false
		},
		underageLimit: {
			type: Number,
			default: 17
		},
	},
	data () {
		return {
			birthDate: null,
			age: null,
			underage: false,
		}
	},
	watch: {
		birthDate: function () {
			this.$emit('update:birthDate', this.birthDate);

			// Calc age
			this.age = moment().diff(this.birthDate, 'years');
			this.$emit('update:age', this.age);

			// Calc underage
			this.underage = this.age <= this.underageLimit;
			this.$emit('update:minor', this.underage);
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
