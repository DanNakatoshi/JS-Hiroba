import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia'

import '@/assets/global.css'
import '/node_modules/primeflex/primeflex.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
// import 'primevue/resources/themes/luna-blue/theme.css'
import 'primevue/resources/themes/bootstrap4-dark-purple/theme.css'

// Highlight
import "@/assets/github-dark.css";

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from "primevue/paginator";
 
import Textarea from 'primevue/textarea';
import RadioButton from 'primevue/radiobutton';
// 


const pinia = createPinia()
const app = createApp(App);

app.use(PrimeVue);

app.component('Button', Button );
app.component('InputText', InputText );
app.component('Dialog', Dialog );
app.component('DataTable', DataTable );
app.component('Column', Column );
app.component('Textarea', Textarea );
app.component('RadioButton', RadioButton );
app.component('Paginator', Paginator );


app.use(pinia)
app.mount("#app");