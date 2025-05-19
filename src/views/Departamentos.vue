<template>
  <div class="container">
    <h1>
      Listado Departamentos |
      <button @click="newDepartamento()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Código</th>
          <th scope="col">Nombre</th>
          <th scope="col">País</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(departamento, index) in departamentos" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ departamento.depa_codi }}</td>
          <td>{{ departamento.depa_nomb }}</td>
          <td>{{ departamento.pais_nomb }}</td>
          <td>
            <button @click="deleteDepartamento(departamento.depa_codi)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editDepartamento(departamento.depa_codi)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'Departamento',
  data() {
    return {
      departamentos: []
    };
  },
  methods: {
    deleteDepartamento(codigo) {
      Swal.fire({
        title: `¿Quieres eliminar el departamento con id ${codigo}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/departamentos/${codigo}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success');
                this.departamentos = response.data.departamentos || this.departamentos;
              }
            });
        }
      });
    },
    newDepartamento() {
      this.$router.push({ name: 'NewDepartamento' });
    },
    editDepartamento(codigo) {
      this.$router.push({ name: 'EditarDepartamento', params: { id: `${codigo}` } });
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/departamentos')
      .then(response => {
        this.departamentos = response.data.departamentos || response.data;
      })
      .catch(error => {
        console.error('Error cargando departamentos:', error);
      });
  }
};
</script>
