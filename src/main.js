import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBank, faBuilding, faPencil, faPhone, faPlus, faTag, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

// Agregar iconos a la librería
library.add(faPhone, faUser, faTrash, faPencil, faTag, faBuilding, faBank, faPlus);

// Crear y configurar la app
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount('#app');