import { createApp } from 'vue'
import * as bootstrap from 'bootstrap'
import './assets/scss/main.scss';
import { router } from './router';

import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTrash, faPen, faArrowUpRightFromSquare, faMagnifyingGlass, faFilter, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faTrash, faPen, faArrowUpRightFromSquare, faMagnifyingGlass, faFilter, faArrowLeft)

//json to csv
import JsonCSV from 'vue-json-csv'

//papaparse
import VuePapaParse from 'vue-papa-parse'

createApp(App).use(router).use(VuePapaParse).component('font-awesome-icon', FontAwesomeIcon).component('downloadCsv', JsonCSV).mount('#app')
