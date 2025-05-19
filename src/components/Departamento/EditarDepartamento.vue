<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold mb-4">Editar</h1>

    <div class="card mb-3">
      <div class="card-header fw-bold">
        Departamento
      </div>

      <div class="card-body">
        <form @submit.prevent="updateDepartamento">

          <!-- Código (disabled) -->
          <div class="mb-3">
            <label for="depa_codi" class="form-label">Código</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="tag" />
              </span>
              <input
                type="text"
                class="form-control"
                id="depa_codi"
                placeholder="codigo departamento"
                disabled
                v-model="departamento.depa_codi"
              />
            </div>
          </div>

          <!-- Nombre -->
          <div class="mb-3">
            <label for="depa_nomb" class="form-label">Nombre</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="building" />
              </span>
              <input
                type="text"
                class="form-control"
                id="depa_nomb"
                placeholder="nombre departamento"
                v-model="departamento.depa_nomb"
                required
              />
            </div>
          </div>

          <!-- Provincia (select) -->
          <div class="mb-3">
            <label for="prov_codi" class="form-label">Provincia</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="bank" />
              </span>
              <select
                id="prov_codi"
                class="form-select"
                v-model.number="departamento.prov_codi"
                required
              >
                <option value="" disabled>Seleccione una provincia</option>
                <option
                  v-for="provincia in provincias"
                  :key="provincia.prov_codi"
                  :value="provincia.prov_codi"
                >
                  {{ provincia.prov_nomb }}
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
  name: "EditarDepartamento",
  data() {
    return {
      departamento: {
        depa_codi: 0,
        depa_nomb: "",
        prov_codi: 0,
      },
      provincias: [],
    };
  },
  methods: {
    cancelar() {
      this.$router.push({ name: "Departamento" });
    },
    updateDepartamento() {
      console.log("Datos enviados:", this.departamento);

      axios
        .put(`http://127.0.0.1:8000/api/departamentos/${this.departamento.depa_codi}`, {
          depa_nomb: this.departamento.depa_nomb,
          prov_codi: this.departamento.prov_codi,
        })
        .then((res) => {
          if (res.status === 200) {
            this.$router.push({ name: "Departamento" });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Departamento actualizado correctamente",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
        .catch((error) => {
          console.error("Error response data:", error.response?.data);
          Swal.fire({
            icon: "error",
            title: "Error al actualizar departamento",
            text:
              error.response?.data?.message ||
              JSON.stringify(error.response?.data?.errors) ||
              "Ocurrió un error inesperado, intente de nuevo.",
          });
        });
    },
  },
  mounted() {
    this.departamento.depa_codi = this.$route.params.id;
    console.log("ID recibido desde la ruta:", this.departamento.depa_codi);
    axios
      .get(`http://127.0.0.1:8000/api/departamentos/${this.departamento.depa_codi}`)
      .then((response) => {
        console.log("Respuesta API:", response.data);

        this.departamento.depa_codi = response.data.departamento.depa_codi;
        this.departamento.depa_nomb = response.data.departamento.depa_nomb;
        this.departamento.prov_codi = response.data.departamento.prov_codi;

        this.provincias = response.data.provincias;
      })
      .catch((error) => {
        console.error(error.response?.data?.message || error.message);
        Swal.fire({
          icon: "error",
          title: "Error al cargar departamento",
          text: "No se pudo cargar la información del departamento.",
        });
        this.$router.push({ name: "Departamento" });
      });
  },
};
</script>
