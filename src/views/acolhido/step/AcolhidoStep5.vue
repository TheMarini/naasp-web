<template lang="html">
	<div class="form-step">
		<section>
			<h4 class="section-title">OUTRAS INFORMAÇÃES</h4>
			<form>
				<div class="form-group">
					<label for="demands">Demandas apresentadas</label>
					<textarea @input="$emit('update:demands', $event.target.value)"  class="form-control" id="demands"></textarea>
				</div>
				<div class="form-group">
					<label for="comments">Observações</label>
					<textarea @input="$emit('update:comments', $event.target.value)"  class="form-control" id="comments"></textarea>
				</div>
			</form>
		</section>
	</div>
</template>

<script>

export default {
	name: 'form-step-5',
};
</script>

<style lang="css" scoped>
textarea {
	min-height: 100px
}
</style>
