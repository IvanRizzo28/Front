import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import Anagrafica from './pages/Anagrafica.vue';
import AnagraficaShow from './pages/AnagraficaShow.vue';
import anagraficaUpdate from './pages/anagraficaUpdate.vue';
import RubricaShow from './pages/RubricaShow.vue';
import RubricaUpdate from './pages/RubricaUpdate.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                showMenu: true
            },
            component: AppHome
        },
        {
            path: '/anagrafica',
            name: 'anagrafica',
            meta: {
                showMenu: true
            },
            component: Anagrafica
        },
        {
            path: '/anagrafica/:id',
            name: 'anagraficaShow',
            meta: {
                showMenu: false
            },
            component: AnagraficaShow
        },
        {
            path: '/anagrafica/update/:id',
            name: 'anagraficaUpdate',
            meta: {
                showMenu: false
            },
            component: anagraficaUpdate
        },
        {
            path: '/rubrica/:id',
            name: 'rubricaShow',
            meta: {
                showMenu: false
            },
            component: RubricaShow
        },
        {
            path: '/rubrica/update/:id',
            name: 'rubricaUpdate',
            meta: {
                showMenu: false
            },
            component: RubricaUpdate
        }
    ]
});
export { router };