<template>
  <div class="container text-start">
    <div class="card">
      <div class="card-header fw-bold">País</div>
      <div class="card-body">
        <form @submit.prevent="savePais">
          <div class="row mb-3">
            <label for="pais_codi" class="form-label">Código</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="tag" />
              </div>
              <input
                type="text"
                class="form-control"
                id="pais_codi"
                placeholder="Código país"
                disabled
                v-model="pais.pais_codi"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="pais_nomb" class="form-label">Nombre: </label>
            <div class="input-group">
              <font-awesome-icon icon="flag" />
              <input
                type="text"
                class="form-control"
                id="pais_nomb"
                placeholder="Nombre País"
                v-model="pais.pais_nomb"
              />
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
  name: 'NewPaises',
  data() {
    return {
      pais: {
        pais_codi: 0,
        pais_nomb: '',
      },
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'paises' })
    },
    async savePais() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/paises', this.pais)
        if (res.status === 200 || res.status === 201) {
         this.$router.push({ name: 'paises' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'País guardado correctamente',
            showConfirmButton: false,
            timer: 2000,
          })
        }
      } catch (error) {
        console.error(error.response?.data || error.message)
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar país',
          text:
            error.response?.data?.message ||
            'Ocurrió un error inesperado, intente de nuevo.',
        })
      }
    },
  },
}
</script>
