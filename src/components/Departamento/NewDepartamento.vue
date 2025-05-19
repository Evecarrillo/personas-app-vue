<template>
  <div class="container text-start">
    <div class="card">
      <div class="card-header fw-bold">Departamento</div>
      <div class="card-body">
        <form @submit.prevent="saveDepartamento">
          <div class="row mb-3">
            <label for="depa_codi" class="form-label">Código</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="tag" />
              </div>
              <input
                type="text"
                class="form-control"
                id="depa_codi"
                placeholder="Código departamento"
                disabled
                v-model="departamento.depa_codi"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="depa_nomb" class="form-label">Nombre:</label>
            <div class="input-group">
              <font-awesome-icon icon="building" />
              <input
                type="text"
                class="form-control"
                id="depa_nomb"
                placeholder="Nombre Departamento"
                v-model="departamento.depa_nomb"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="pais_codi" class="form-label">País:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="globe" />
              </div>
              <select class="form-select" v-model.number="departamento.pais_codi">
                <option disabled value="0">Seleccione un país</option>
                <option
                  v-for="pais in paises"
                  :key="pais.pais_codi"
                  :value="pais.pais_codi"
                >
                  {{ pais.pais_nomb }}
                </option>
              </select>
            </div>
          </div>

          <button class="btn btn-primary" type="submit">Guardar</button>
          <button class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'NewDepartamento',
  data() {
    return {
      departamento: {
        depa_codi: 0,
        depa_nomb: '',
        pais_codi: 0,
      },
      paises: [],
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Departamentos' });
    },
    async saveDepartamento() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/departamentos', this.departamento);
        if (res.status === 200 || res.status === 201) {
          this.$router.push({ name: 'Departamentos' });
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Departamento guardado correctamente',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        console.error(error.response?.data || error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar departamento',
          text: error.response?.data?.message || 'Ocurrió un error inesperado, intente de nuevo.',
        });
      }
    },
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/paises')
      .then(response => {
        this.paises = response.data.paises || response.data;
      })
      .catch(error => {
        console.error('Error cargando países:', error);
      });
  },
};
</script>
