<template lang="html">
  <div class="form-step">
    <section>
      <h4 class="section-title">PAPEL</h4>
      <p>Qual será o papel do voluntário na NAASP?</p>
      <div class="row">
        <div class="col-auto">
          <button
            :class="volunteer.type === 0 ? 'active' : ''"
            class="_card btn btn-light text-center d-flex flex-column justify-content-center align-items-center"
            @click="volunteer.type = 0"
          >
            <activity-icon size="1.5x" class="custom-class"></activity-icon>
            <p class="mb-0 mt-2">Especialista</p>
          </button>
        </div>
        <div class="col-auto">
          <button
            :class="volunteer.type === 1 ? 'active' : ''"
            class="_card btn btn-light text-center d-flex flex-column justify-content-center align-items-center"
            @click="volunteer.type = 1"
          >
            <book-open-icon size="1.5x" class="custom-class"></book-open-icon>
            <p class="mb-0 mt-2">Secretária</p>
          </button>
        </div>
        <div class="col-auto">
          <button
            :class="volunteer.type === 2 ? 'active' : ''"
            class="_card btn btn-light text-center d-flex flex-column justify-content-center align-items-center"
            @click="volunteer.type = 2"
          >
            <clipboard-icon size="1.5x" class="custom-class"></clipboard-icon>
            <p class="mb-0 mt-2">
              Assitente <br />
              Social
            </p>
          </button>
        </div>
      </div>
    </section>
    <section v-if="volunteer.type === 0" class="mt-4">
      <h4 class="section-title">ATENDIMENTO</h4>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="specialty">Especialidade</label>
          <multiselect
            id="specialty"
            v-model="volunteer.specialties"
            :options="specialtiesOptions"
            track-by="id"
            label="name"
            :multiple="true"
            :taggable="true"
            tag-laceholder="Adicionar nova especialidade"
            open-direction="bottom"
            placeholder="Escolha uma opção"
            select-label="Pressione enter para selecionar"
            selected-label="Selecionado"
            deselect-label="Pressione enter para remover seleção"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            @tag="createTag"
            @remove="deleteUnnusedCreatedTags"
          >
          </multiselect>
        </div>
        <div class="form-group col-md-6">
          <label for="specialty">Faixa etária de atendimento</label>
          <multiselect
            id="age-range"
            v-model="volunteer.ageRangesOfCare"
            :options="ageRangesOfCareOptions"
            track-by="id"
            label="name"
            :multiple="true"
            open-direction="bottom"
            :searchable="false"
            placeholder="Escolha uma opção"
            select-label="Pressione enter para selecionar"
            selected-label="Selecionado"
            deselect-label="Pressione enter para remover seleção"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
          >
          </multiselect>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Icons
import { ActivityIcon, BookOpenIcon, ClipboardIcon } from 'vue-feather-icons';

// Multiselect
import Multiselect from 'vue-multiselect';

export default {
  name: 'FormStep1',
  components: {
    ActivityIcon,
    BookOpenIcon,
    ClipboardIcon,
    Multiselect,
  },
  data() {
    return {
      volunteer: {
        type: null,
        specialties: [],
        ageRangesOfCare: [],
      },
      newTagsId: [],
      specialtiesOptions: [
        { id: 0, name: 'Psicólogo' },
        { id: 1, name: 'Dentista' },
        { id: 2, name: 'Ginecologista' },
      ],
      ageRangesOfCareOptions: [
        { id: 0, name: 'Até 16 anos' },
        { id: 1, name: 'De 17 a 65 anos' },
        { id: 2, name: 'Acima de 66 anos' },
      ],
    };
  },
  watch: {
    'volunteer.type': {
      handler(type) {
        this.$emit('update:volunteerType', type);
      },
    },
    'volunteer.specialties': {
      handler(specialties) {
        this.$emit('update:volunteerSpecialties', specialties);
      },
    },
    'volunteer.ageRangesOfCare': {
      handler(ageRangesOfCare) {
        this.$emit('update:volunteerAgeRangesOfCare', ageRangesOfCare);
      },
    },
    // 'user.type': {
    //   handler() {
    //     let type;
    //
    //     switch (this.user.type) {
    //       case 0:
    //         type = 'medic';
    //         break;
    //
    //       case 1:
    //         type = 'secretary';
    //         break;
    //
    //       case 2:
    //         type = 'social worker';
    //         break;
    //
    //       default:
    //         type = null;
    //         break;
    //     }
    //     this.$emit('update:type', type);
    //   },
    // },
  },
  mounted() {
    this.volunteer.ageRangesOfCare = [...this.ageRangesOfCareOptions];
  },
  methods: {
    createTag(name) {
      const tag = {
        id: this.specialtiesOptions[this.specialtiesOptions.length - 1].id + 1,
        name,
      };
      this.newTagsId.push(tag.id);
      this.specialtiesOptions.push(tag);
      this.volunteer.specialties.push(tag);
    },
    deleteUnnusedCreatedTags(option) {
      if (this.newTagsId.find((t) => t === option.id)) {
        const index = this.specialtiesOptions.findIndex(
          (s) => s.id === option.id
        );
        this.specialtiesOptions.splice(index, 1);
      }
    },
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
