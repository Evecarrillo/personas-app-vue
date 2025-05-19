import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Comuna
import Comuna from '../views/Comuna.vue';
import EditarComuna from '../components/Comuna/EditarComuna.vue';
import NewComuna from '../components/Comuna/NewComuna.vue';

// Departamento
import Departamentos from '../views/Departamentos.vue';
import EditarDepartamento from '../components/Departamento/EditarDepartamento.vue';
import NewDepartamento from '../components/Departamento/NewDepartamento.vue';

//Municipios
import Municipio from '../views/Municipio.vue';
import EditarMunicipio from '../components/Municipio/EditarMunicipio.vue';
import NewMunicipio from '../components/Municipio/NewMunicipio.vue';

//Paieses
import Paises from '../views/Paises.vue';
import EditarPaises from '../components/Paises/EditarPaises.vue';
import NewPaises from '../components/Paises/NewPaises.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // Comuna
  {
    path: '/comuna',
    name: 'Comuna',
    component: Comuna
  },
  {
    path: '/editar-comuna/:id',
    name: 'EditarComuna',
    component: EditarComuna
  },
  {
    path: '/add-comuna',
    name: 'NewComuna',
    component: NewComuna
  },
  // Departamento
  {
    path: '/departamento',
    name: 'Departamento',
    component: Departamentos
  },
  {
    path: '/editar-departamento/:id',
    name: 'EditarDepartamento',
    component: EditarDepartamento
  },
  {
    path: '/add-departamento',
    name: 'NewDepartamento',
    component: NewDepartamento
  },
  // Municipio
  {
    path: '/municipio',
    name: 'Municipio',
    component: Municipio
  },
  {
    path: '/editar-municipio/:id',
    name: 'EditarMunicipio',
    component: EditarMunicipio
  },
  {
    path: '/add-municipio',
    name: 'NewMunicipio',
    component: NewMunicipio
  },
  // Paises
  {
    path: '/paises',
    name: 'Paises',
    component: Paises
  },
  {
    path: '/editar-paises/:id',
    name: 'EditarPaises',
    component: EditarPaises
  },
  {
    path: '/add-paises',
    name: 'NewPaises',
    component: NewPaises
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
