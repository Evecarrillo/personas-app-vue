<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold mb-4">Editar</h1>

    <div class="card mb-3">
      <div class="card-header fw-bold">
        Comuna
      </div>

      <div class="card-body">
        <form @submit.prevent="updateComuna">

          <!-- Código (disabled) -->
          <div class="mb-3">
            <label for="comu_codi" class="form-label">Código</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="tag" />
              </span>
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

          <!-- Nombre -->
          <div class="mb-3">
            <label for="comu_nomb" class="form-label">Nombre</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="building" />
              </span>
              <input
                type="text"
                class="form-control"
                id="comu_nomb"
                placeholder="nombre comuna"
                v-model="comuna.comu_nomb"
                required
              />
            </div>
          </div>

          <!-- Municipio (select) -->
          <div class="mb-3">
            <label for="muni_codi" class="form-label">Municipio</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="bank" />
              </span>
              <select
                id="muni_codi"
                class="form-select"
                v-model.number="comuna.muni_codi"
                required
              >
                <option value="" disabled>Seleccione un municipio</option>
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
  name: "EditarComuna",
  data() {
    return {
      comuna: {
        comu_codi: 0,
        comu_nomb: "",
        muni_codi: 0,
      },
      municipios: [],
    };
  },
  methods: {
    cancelar() {
      this.$router.push({ name: "Comuna" });
    },
    updateComuna() {
      console.log("Datos enviados:", this.comuna);

      axios
        .put(`http://127.0.0.1:8000/api/comunas/${this.comuna.comu_codi}`, {
          comu_nomb: this.comuna.comu_nomb,
          muni_codi: this.comuna.muni_codi,
        })
        .then((res) => {
          if (res.status === 200) {
            this.$router.push({ name: "Comuna" });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Comuna actualizada correctamente",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
        .catch((error) => {
          console.error("Error response data:", error.response?.data);
          Swal.fire({
            icon: "error",
            title: "Error al actualizar comuna",
            text:
              error.response?.data?.message ||
              JSON.stringify(error.response?.data?.errors) ||
              "Ocurrió un error inesperado, intente de nuevo.",
          });
        });
    }
  },
  mounted() {
    this.comuna.comu_codi = this.$route.params.id;
    console.log("ID recibido desde la ruta:", this.comuna.comu_codi);
    axios
      .get(`http://127.0.0.1:8000/api/comunas/${this.comuna.comu_codi}`)
      .then((response) => {
        console.log("Respuesta API:", response.data);

        // Asignar propiedades individualmente para que Vue detecte cambios
        this.comuna.comu_codi = response.data.comuna.comu_codi;
        this.comuna.comu_nomb = response.data.comuna.comu_nomb;
        this.comuna.muni_codi = response.data.comuna.muni_codi;

        this.municipios = response.data.municipios;
      })
      .catch((error) => {
        console.error(error.response?.data?.message || error.message);
        Swal.fire({
          icon: "error",
          title: "Error al cargar comuna",
          text: "No se pudo cargar la información de la comuna.",
        });
        this.$router.push({ name: "Comuna" });
      });
  },
};
</script>
