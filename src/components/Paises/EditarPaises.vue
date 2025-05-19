<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold mb-4">Editar</h1>

    <div class="card mb-3">
      <div class="card-header fw-bold">
        País
      </div>

      <div class="card-body">
        <form @submit.prevent="updatePais">

          <!-- Código (disabled) -->
          <div class="mb-3">
            <label for="pais_codi" class="form-label">Código</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="tag" />
              </span>
              <input
                type="text"
                class="form-control"
                id="pais_codi"
                placeholder="código país"
                disabled
                v-model="pais.pais_codi"
              />
            </div>
          </div>

          <!-- Nombre -->
          <div class="mb-3">
            <label for="pais_nomb" class="form-label">Nombre</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="flag" />
              </span>
              <input
                type="text"
                class="form-control"
                id="pais_nomb"
                placeholder="nombre país"
                v-model="pais.pais_nomb"
                required
              />
            </div>
          </div>

          <!-- Botones -->
          <button class="btn btn-primary" type="submit">Actualizar</button>
          <button class="btn btn-secondary ms-2" @click.prevent="cancelar">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditarPaises",
  data() {
    return {
      pais: {
        pais_codi: 0,
        pais_nomb: "",
      },
    };
  },
  methods: {
    cancelar() {
      this.$router.push({ name: 'paises' })
    },
    updatePais() {
      console.log("Datos enviados:", this.pais);

      axios
        .put(`http://127.0.0.1:8000/api/paises/${this.pais.pais_codi}`, {
          pais_nomb: this.pais.pais_nomb,
        })
        .then((res) => {
          if (res.status === 200) {
            this.$router.push({ name: 'paises' })
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "País actualizado correctamente",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
        .catch((error) => {
          console.error("Error response data:", error.response?.data);
          Swal.fire({
            icon: "error",
            title: "Error al actualizar país",
            text:
              error.response?.data?.message ||
              JSON.stringify(error.response?.data?.errors) ||
              "Ocurrió un error inesperado, intente de nuevo.",
          });
        });
    }
  },
  mounted() {
    this.pais.pais_codi = this.$route.params.id;
    console.log("ID recibido desde la ruta:", this.pais.pais_codi);
    axios
      .get(`http://127.0.0.1:8000/api/paises/${this.pais.pais_codi}`)
      .then((response) => {
        console.log("Respuesta API:", response.data);

        // Asignar propiedades individualmente para que Vue detecte cambios
        this.pais.pais_codi = response.data.pais.pais_codi;
        this.pais.pais_nomb = response.data.pais.pais_nomb;
      })
      .catch((error) => {
        console.error(error.response?.data?.message || error.message);
        Swal.fire({
          icon: "error",
          title: "Error al cargar país",
          text: "No se pudo cargar la información del país.",
        });
        this.$router.push({ name: "Paises" });
      });
  },
};
</script>
