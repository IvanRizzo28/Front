<script>
import Actions from '../components/Actions.vue';

//axios
import axios from 'axios';

export default {
    name: 'Anagrafica',
    components: {
        Actions
    },
    data() {
        return {
            csvFile: [],
            anagrafiche: [],
            page: 'http://127.0.0.1:8000/api/anagrafica',
            currentPage: 1,
            lastPage: null,
            lastPageUrl: '',
            prevPageUrl: null,
            data: {
                name: '',
                address: '',
                pIva: '',
                codiceFiscale: '',
                note: ''
            },
            ordina: 0,
            filtra: 0
        }
    },
    methods: {
        async getAnagrafica() {
            await axios.get(this.page).then(response => {
                this.anagrafiche = response.data.data;
                this.page = response.data.next_page_url;
                this.currentPage = response.data.current_page;
                this.lastPage = response.data.last_page;
                this.prevPageUrl = response.data.prev_page_url;
                this.lastPageUrl = response.data.last_page_url;
            }).catch(error => {

            });
        },
        prev() {
            this.page = this.prevPageUrl;
            this.getAnagrafica();
        },
        last() {
            this.page = this.lastPageUrl;
            this.getAnagrafica();
        },
        async create() {
            axios.post('http://127.0.0.1:8000/api/anagrafica', this.data).then(response => {
                this.data = {
                    name: '',
                    address: '',
                    pIva: '',
                    codiceFiscale: '',
                    note: ''
                };
                this.getAnagrafica();
            }).catch(error => {

            });
        },
        ordinamento() {
            if (this.ordina != 0) {
                axios.get('http://127.0.0.1:8000/api/anagrafica/ordinamento/' + this.ordina).then(response => {
                    this.anagrafiche = response.data.data;
                    this.page = response.data.next_page_url;
                    this.currentPage = response.data.current_page;
                    this.lastPage = response.data.last_page;
                    this.prevPageUrl = response.data.prev_page_url;
                    this.lastPageUrl = response.data.last_page_url;
                }).catch(error => {

                });
            } else if (this.filtra != 0) {
                axios.get('http://127.0.0.1:8000/api/anagrafica/filtra/' + this.filtra).then(response => {
                    this.anagrafiche = response.data.data;
                    this.page = response.data.next_page_url;
                    this.currentPage = response.data.current_page;
                    this.lastPage = response.data.last_page;
                    this.prevPageUrl = response.data.prev_page_url;
                    this.lastPageUrl = response.data.last_page_url;
                }).catch(error => {

                });
            }
        },
        importCsv() {
            this.$papa.parse(document.getElementById('csv').files[0], {
                skipEmptyLines: true,
                header: true,
                delimiter: ';',
                complete: (results) => {
                    this.csvFile=results.data;
                }
            });
        }
    },
    created() {
        this.getAnagrafica();
    }
}
</script>

<template>
    <main class="container p-4">
        <h2 class="text-center my-4">Anagrafica</h2>
        <div class="d-flex justify-content-between">
            <div class="flex-grow-1 d-flex align-items-center">
                <button type="button" class="btn btn-success" data-bs-toggle="offcanvas" href="#aggiungi" role="button"
                    aria-controls="offcanvasExample">Aggiungi Record</button>

                <download-csv :data="anagrafiche" name="anagrafiche.csv" delimiter=";">
                    <button type="button" class="btn btn-success mx-2">Esporta CSV</button>
                </download-csv>

                <button type="button" class="btn btn-success" @click="importCsv">Importa CSV</button>
                <input type="file" class="ms-2" id="csv">
            </div>
            <div class="ms-2 d-flex">
                <span class="me-3 fs-4">Filtri:</span>
                <a class="btn btn-outline-info me-2" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
                    aria-controls="offcanvasExample">
                    <font-awesome-icon icon="fa-solid fa-filter" />
                </a>
            </div>
        </div>
        <hr class="mt-4">
        <div class="card">
            <div class="card-body">
                <table class="table table-hover table-striped border">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Indirizzo</th>
                            <th scope="col">P.Iva</th>
                            <th scope="col d-none">Codice fiscale</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in anagrafiche">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ item.name }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.pIva }}</td>
                            <td>{{ item.codiceFiscale }}</td>
                            <td>
                                <Actions path="/anagrafica" :id="item.id"></Actions>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-center mt-4">
                    <nav aria-label="...">
                        <ul class="pagination">
                            <li class="page-item" v-if="prevPageUrl" @click="prev">
                                <a class="page-link" href="#">Prev</a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">{{ currentPage }}</a></li>
                            <li class="page-item"><a class="page-link" href="#" v-if="lastPage > currentPage">...</a></li>
                            <li class="page-item" v-if="lastPage > currentPage" @click="last"><a class="page-link"
                                    href="#">{{ lastPage }}</a></li>
                            <li class="page-item" @click="getAnagrafica">
                                <a class="page-link" :class="page ? '' : 'disabled'" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>


        <div class="card mt-4" v-if="csvFile.length">
            <div class="card-body">
                <table class="table table-hover table-striped border">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Indirizzo</th>
                            <th scope="col">P.Iva</th>
                            <th scope="col d-none">Codice fiscale</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in csvFile">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ item.name }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.pIva }}</td>
                            <td>{{ item.codiceFiscale }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>

    <!--Canvas filtri-->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filtri</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <label for="ordina" class="mb-1">Ordina per:</label>
            <select class="form-select" aria-label="Default select example" id="ordina" v-model="ordina"
                @change="filtra = 0">
                <option selected value="0">...</option>
                <option value="1">Nome: A-Z</option>
                <option value="2">Nome: Z-A</option>
            </select>
            <label for="filtra" class="mt-3 mb-1">Filtra per:</label>
            <select class="form-select" aria-label="Default select example" id="filtra" v-model="filtra"
                @change="ordina = 0">
                <option selected value="0">...</option>
                <option value="1">Aggiungiti questo mese</option>
                <option value="2">Aggiunti quest'anno</option>
            </select>
            <button type="button" class="btn btn-success mt-3" @click="ordinamento">Applica filtri</button>
        </div>
    </div>
    <!--Canvas Aggiungi record-->
    <div class="offcanvas offcanvas-start w-50" tabindex="-1" id="aggiungi" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Aggiungi</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form @submit.prevent="create" enctype="multipart/form-data">
                <label class="mb-1">Nome</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Name" aria-label="Name"
                        aria-describedby="basic-addon1" required maxlength="50" v-model="data.name">
                </div>
                <label class="mb-1">Indirizzo</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Indirizzo" aria-label="Indirizzo"
                        aria-describedby="basic-addon1" required maxlength="100" v-model="data.address">
                </div>
                <label class="mb-1">P.Iva</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="P.Iva" aria-label="P.Iva"
                        aria-describedby="basic-addon1" required maxlength="11" v-model="data.pIva">
                </div>
                <label class="mb-1">Codice Fiscale</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Codice Fiscale" aria-label="CodiceFiscale"
                        aria-describedby="basic-addon1" required maxlength="16" v-model="data.codiceFiscale">
                </div>
                <div class="input-group">
                    <span class="input-group-text">Note</span>
                    <textarea class="form-control" aria-label="Note" v-model="data.note" maxlength="255"></textarea>
                </div>
                <button type="submit" class="btn btn-success mt-3">Aggiungi</button>
            </form>
        </div>
    </div>
</template>

<style scoped></style>
