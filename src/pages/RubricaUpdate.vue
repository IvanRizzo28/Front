<script>
import axios from 'axios';
import Back from '../components/Back.vue';

export default {
    name: 'RubricaUpdate',
    components: {
        Back
    },
    data() {
        return {
            data: {
                id: '',
                name: '',
                telephone: '',
                code: '',
                rubric_id: null
            }
        }
    },
    methods: {
        async getContatto() {
            await axios.get('http://127.0.0.1:8000/api/contatti/' + this.$route.params.id).then(response => {
                this.data = response.data;
            }).catch(error => {

            });
        },
        async add(){
            await axios.put('http://127.0.0.1:8000/api/contatti/' +  this.$route.params.id, this.data).then(response =>{
                this.$router.back();
            }).catch(error => {
                console.log(error);
            });
        }
    },
    created() {
        this.getContatto();
    }
}
</script>

<template>
    <main>
        <div class="container p-5">
            <Back></Back>
            <div class="content">
                <label class="mb-1">Nome</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Name" aria-label="Name"
                        aria-describedby="basic-addon1" v-model="data.name">
                </div>
                <label class="mb-1">Telefono</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Telefono" aria-label="Telefono"
                        aria-describedby="basic-addon1" v-model="data.telephone">
                </div>
                <label class="mb-1">Codice</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Codice" aria-label="Codice"
                        aria-describedby="basic-addon1" v-model="data.code">
                </div>
                <button type="button" class="btn btn-success mt-2" @click="add">Salva le modifiche</button>
            </div>
        </div>
    </main>
</template>

<style scoped></style>