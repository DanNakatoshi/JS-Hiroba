import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';


import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/luna-blue/theme.css'
import Button from 'primevue/button';
import Terminal from 'primevue/terminal';
import TerminalService from 'primevue/terminalservice';


const app = createApp(App);

app.use(PrimeVue);
app.component('Button', Button );
app.component('Terminal', Terminal );
app.component('TerminalService', TerminalService );
app.mount("#app");