<script>
import axios from 'axios';
import Actions from '../components/Actions.vue';

export default {
    name: 'Rubrica',
    components: {
        Actions
    },
    props: {
        id: Number,
        name: String
    },
    data() {
        return {
            cerca: '',
            rubrica: [],
            data: {
                name: '',
                telephone: '',
                code: '',
                rubric_id: null
            }
        }
    },
    methods: {
        async getRubrica() {
            await axios.get('http://127.0.0.1:8000/api/contatti/get/' + this.id).then(response => {
                this.rubrica = response.data;
            }).catch(error => {

            });
        },
        async add() {
            await axios.post('http://127.0.0.1:8000/api/contatti', this.data).then(response => {
                this.rubrica.push(response.data);
                this.data = {
                    name: '',
                    telephone: '',
                    code: '',
                    rubric_id: this.id
                }
            }).catch(error => {

            });
        },
        async eliminaRubrica(){
            await axios.delete('http://127.0.0.1:8000/api/rubrica/' + this.id).then(response => {
                location.reload();
            });
        }
    },
    computed: {
        search() {
            if (this.cerca.trim() === '') return this.rubrica;
            return this.rubrica.filter((element) => {
                if (element.name.includes(this.cerca)) return element;
            });
        }
    },
    created() {
        this.data.rubric_id=this.id;
        this.getRubrica();
    }
}
</script>

<template>
    <div class="p-3">
        <div class="d-flex justify-content-between mb-2">
            <h4>Rubrica: {{ name }}</h4>
            <div>
                <button type="button" class="btn btn-danger me-2" @click="eliminaRubrica">Elimina Rubrica</button>
                <button type="button" class="btn btn-success" data-bs-toggle="offcanvas" :data-bs-target="'#offcanvasExample' + this.id"
                    :aria-controls="'offcanvasExample' + this.id">Aggiungi Contatto</button>
            </div>

        </div>

        <div class="input position-relative flex-grow-1">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="position-absolute icona" />
            <input type="text" class="form-control ps-5" placeholder="cerca" aria-label="Username"
                aria-describedby="basic-addon1" v-model="cerca" @keypress="search">
        </div>
        <hr class="mt-4">
        <div class="card">
            <div class="card-body">
                <table class="table table-hover table-striped border" v-if="rubrica.length">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Codice</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in search">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ item.name }}</td>
                            <td>{{ item.telephone }}</td>
                            <td>{{ item.code }}</td>
                            <td>
                                <Actions path="/rubrica" :id="item.id"></Actions>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p v-else>Non ci sono risulati</p>
            </div>
        </div>
    </div>


    <!--offcanvas-->
    <div class="offcanvas offcanvas-start" tabindex="-1" :id="'offcanvasExample' + this.id" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Aggiungi contatto</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form @submit.prevent="add">
                <label class="mb-1">Nome</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Name" aria-label="Name"
                        aria-describedby="basic-addon1" required maxlength="50" v-model="data.name">
                </div>
                <label class="mb-1">Telefono</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Telefono" aria-label="Telefono"
                        aria-describedby="basic-addon1" required maxlength="10" v-model="data.telephone">
                </div>
                <label class="mb-1">Codice</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Codice" aria-label="Codice"
                        aria-describedby="basic-addon1" required v-model="data.code">
                </div>
                <button type="submit" class="btn btn-success">Aggiungi</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.icona {
    bottom: 50%;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
    font-size: 20px;
}
</style>
