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
						<the-mask @input.native="$emit('update:rg', $event.target.value)" id="rg" type="text" class="form-control _rounded" mask="##.###.###-#" placeholder="12.345.678-9" />
					</div>
					<div class="form-group col-md-3">
						<label for="cpf">CPF</label>
						<the-mask @input.native="$emit('update:cpf', $event.target.value)" id="cpf" type="text" class="form-control _rounded" mask="###.###.###-##" placeholder="123.456.789-10" />
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
						<label for="matrial-status">Estado civil</label>
						<select @input="$emit('update:matrialStatus', $event.target.value)" class="custom-select _rounded" id="matrial-status">
							<option selected disabled>Escolha uma opção</option>
							<option value="Solteiro">Solteiro</option>
							<option value="Casado">Casado</option>
							<option value="Separado">Separado</option>
							<option value="Viúvo">Viúvo</option>
						</select>
					</div>
					<div class="form-group col-md-3">
						<label for="education-level">Escolaridade</label>
						<input @input="$emit('update:educationLevel', $event.target.value)" type="text" class="form-control _rounded" id="education-level" placeholder="Ensino médio, graduação...">
					</div>
					<div class="form-group col-md-3">
						<label for="job-role">Cargo de trabalho</label>
						<input @input="$emit('update:jobRole', $event.target.value)" type="text" class="form-control _rounded" id="job-role" placeholder="Professor, engenheiro, médico...">
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
					<div class="form-group col-md-4">
						<label for="public-place">Logradouro</label>
						<input @input="$emit('update:publicPlace', $event.target.value)" type="text" class="form-control _rounded" id="public-place" placeholder="Rua do Limão">
					</div>
					<div class="form-group col-md-2">
						<label for="address-number">Número</label>
						<input @input="$emit('update:addressNumber', parseInt($event.target.value))" type="number" class="form-control _rounded" id="address-number" placeholder="42">
					</div>
					<div class="form-group col-md-2">
						<label for="address-complement">Complemento</label>
						<input @input="$emit('update:addressComplement', $event.target.value)" type="text" class="form-control _rounded" id="address-complement" placeholder="Apto. 101">
					</div>
					<div class="form-group col-md-4">
						<label for="neighborhood">Bairro</label>
						<input @input="$emit('update:neighborhood', $event.target.value)" type="text" class="form-control _rounded" id="neighborhood" placeholder="Limoeiro">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-4 mb-0">
						<label for="city">Cidade</label>
						<input @input="$emit('update:city', $event.target.value)" type="text" class="form-control _rounded" id="city" placeholder="São Paulo">
					</div>
					<div class="form-group col-md-4 mb-0">
						<label for="state">Estado</label>
						<input @input="$emit('update:state', $event.target.value)" type="text" class="form-control _rounded" id="state" placeholder="São Paulo">
					</div>
					<div class="form-group col-md-4 mb-0">
						<label for="cep">CEP</label>
						<the-mask @input.native="$emit('update:cep', $event.target.value)" id="cep" type="text" class="form-control _rounded" mask="#####-###" placeholder="12345-678" />
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
						<the-mask @input.native="$emit('update:cellPhoneNumber', $event.target.value)" id="cell-phone-number" type="tel" class="form-control _rounded" :mask="['(##) ####-####', '(##) # ####-####']" placeholder="(31) 9 1234-5678" />
					</div>
					<div class="form-group col-md-4">
						<label for="home-phone-number">Telefone residencial</label>
						<the-mask @input.native="$emit('update:homePhoneNumber', $event.target.value)" id="home-phone-number" type="tel" class="form-control _rounded" :mask="['(##) ####-####', '(##) # ####-####']" placeholder="(31) 1234-5678" />
					</div>
					<div class="form-group col-md-4">
						<label for="business-phone-number">Telefone comercial</label>
						<the-mask @input.native="$emit('update:businessPhoneNumber', $event.target.value)" id="business-phone-number" type="tel" class="form-control _rounded" :mask="['(##) ####-####', '(##) # ####-####']" placeholder="(31) 1234-5678" />
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
						<label for="resp-name">Nome completo</label>
						<input @input="$emit('update:responsibleName', $event.target.value)" type="text" class="form-control _rounded" id="resp-name" placeholder="Spike Jonze">
					</div>
					<div class="form-group col-md-3">
						<label for="resp-rg">RG</label>
						<the-mask @input.native="$emit('update:responsibleRg', $event.target.value)" id="resp-rg" type="text" class="form-control _rounded" mask="##.###.###-#" placeholder="12.345.678-9" />
					</div>
					<div class="form-group col-md-3">
						<label for="resp-cpf">CPF</label>
						<the-mask @input.native="$emit('update:responsibleCpf', $event.target.value)" id="resp-cpf" type="text" class="form-control _rounded" mask="###.###.###-##" placeholder="123.456.789-10" />
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
