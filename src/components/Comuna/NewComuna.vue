<template>
  <div class="container text-start">
    <div class="card">
      <div class="card-header fw-bold">Comuna</div>
      <div class="card-body">
        <form @submit.prevent="SaveComuna">
          <div class="row mb-3">
            <label for="comu_codi" class="form-label">Codigo</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="tag" />
              </div>
              <input
                type="text"
                class="form-control"
                id="comu_codi"
                placeholder="codigo comuna"
                disabled
                v-model="comuna.comu_codi"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="comu_nomb" class="form-label">Nombre: </label>
            <div class="input-group">
              <font-awesome-icon icon="building" />
              <input
                type="text"
                class="form-control"
                id="comu_nomb"
                placeholder="Nombre Comuna"
                v-model="comuna.comu_nomb"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="muni_codi" class="form-label">Municipio: </label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="bank" />
              </div>
              <select class="form-select" v-model.number="comuna.muni_codi">
                <option disabled value="0">Seleccione un municipio</option>
                <option
                  v-for="municipio in municipios"
                  :key="municipio.muni_codi"
                  :value="municipio.muni_codi"
                >
                  {{ municipio.muni_nomb }}
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
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewComuna',
  data() {
    return {
      comuna: {
        comu_codi: 0,
        comu_nomb: '',
        muni_codi: 0,
      },
      municipios: [],
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Comunas' })
    },
    async SaveComuna() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/comunas', this.comuna)
        if (res.status === 200 || res.status === 201) {
         this.$router.push({ name: 'Comuna' });
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Comuna guardada correctamente',
            showConfirmButton: false,
            timer: 2000,
          })
        }
      } catch (error) {
        console.error(error.response?.data || error.message)
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar comuna',
          text:
            error.response?.data?.message ||
            'Ocurrió un error inesperado, intente de nuevo.',
        })
      }
    },
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/municipio').then(response => {
      this.municipios = response.data.municipios
    })
  },
}
</script>
