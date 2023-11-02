<script>
import Back from '../components/Back.vue';

//axios
import axios from 'axios';

export default {
    name: 'AnagraficaUpdate',
    components: {
        Back
    },
    data() {
        return {
            data: {
                name: '',
                address: '',
                pIva: '',
                codiceFiscale: '',
                note: ''
            }
        }
    },
    methods: {
        async getAnagrafica() {
            //console.log(this.$route.params);
            await axios.get('http://127.0.0.1:8000/api/anagrafica/' + this.$route.params.id + '/edit').then(response => {
                this.data = response.data;
            }).catch(error => {

            });
        },
        async update() {
            await axios.put('http://127.0.0.1:8000/api/anagrafica/' + this.$route.params.id, this.data).then(response => {
                this.$router.push('/anagrafica');
            }).catch(error => {

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
                <form @submit.prevent="update">
                    <label class="mb-1">Nome</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Name" aria-label="Name"
                            aria-describedby="basic-addon1" v-model="data.name" maxlength="50" required>
                    </div>
                    <label class="mb-1">Indirizzo</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Indirizzo" aria-label="Indirizzo"
                            aria-describedby="basic-addon1" v-model="data.address" maxlength="100" required>
                    </div>
                    <label class="mb-1">P.Iva</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="P.Iva" aria-label="P.Iva"
                            aria-describedby="basic-addon1" v-model="data.pIva" maxlength="11" required>
                    </div>
                    <label class="mb-1">Codice Fiscale</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Codice Fiscale" aria-label="CodiceFiscale"
                            aria-describedby="basic-addon1" v-model="data.codiceFiscale" maxlength="16" required>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Note</span>
                        <textarea class="form-control" aria-label="Note" v-model="data.note" maxlength="255"
                            required></textarea>
                    </div>
                    <button type="submit" class="btn btn-success mt-3">Salva le modifiche</button>
                </form>
            </div>
        </div>
    </main>
</template>

<style scoped></style>