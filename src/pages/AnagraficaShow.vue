<script>
import Rubrica from '../components/Rubrica.vue';
import Back from '../components/Back.vue';

//axios
import axios from 'axios';

export default {
    name: 'AnagraficaShow',
    components: {
        Rubrica,
        Back
    },
    data() {
        return {
            record: {},
            rubrica: [],
            name: ''
        }
    },
    methods: {
        async getAnagrafica() {
            //console.log(this.$route.params);
            await axios.get('http://127.0.0.1:8000/api/anagrafica/' + this.$route.params.id).then(response => {
                this.record = response.data.data;
                this.rubrica = response.data.rubriche;
            }).catch(error => {
                console.log(error);
            });
        },
        async aggiungiRubrica(){
            await axios.post('http://127.0.0.1:8000/api/rubrica/', {name: this.name, register_id: this.$route.params.id}).then(response => {
                this.rubrica.push(response.data);
                this.name='';
            }).catch(error => {
                console.log(error);
            });
        }
    },
    created() {
        this.getAnagrafica();
    }
}
</script>

<template>
    <main>
        <div class="container p-5">
            <Back></Back>
            <div class="content">
                <div class="d-flex align-items-center">
                    <img src="https://placehold.co/600x400">

                    <div class="ms-4">
                        <h4>{{ record.name }}</h4>
                        <p><span class="fw-bold">P.iva:</span> {{ record.pIva }}</p>
                        <p><span class="fw-bold">Indirizzo:</span> {{ record.address }}</p>
                        <p><span class="fw-bold">CodiceFiscale:</span> {{ record.codiceFiscale }}</p>
                        <p><span class="fw-bold">Note</span> {{ record.note }}</p>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-between mt-3">
                    <input type="text" class="form-control" placeholder="Name" aria-label="Name"
                        aria-describedby="basic-addon1" v-model="name">
                    <button type="button" class="btn btn-success ms-3" @click="aggiungiRubrica">Aggiungi Rubrica</button>
                </div>

                <hr>

                <h2 class="text-center my-4">Rubriche</h2>
                <Rubrica v-for="item in rubrica" :name="item.name" :id="item.id"></Rubrica>
            </div>
        </div>
    </main>
</template>

<style scoped>
img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
}
</style>