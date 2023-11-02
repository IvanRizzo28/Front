<script>
import Back from '../components/Back.vue';
import axios from 'axios';

export default {
    name: 'RubricaShow',
    components: {
        Back
    },
    data(){
        return {
            contatto: {}
        }
    },
    methods:{
        async getContatto(){
            await axios.get('http://127.0.0.1:8000/api/contatti/' + this.$route.params.id).then(response => {
                this.contatto=response.data;
            }).catch(error => {

            });
        }
    },
    created(){
        this.getContatto();
    }
}
</script>

<template>
    <main>
        <div class="container p-5">
            <Back></Back>
            <div class="content">
                <div class="d-flex align-items-center">
                    <div class="ms-4">
                        <h4>{{ contatto.name }}</h4>
                        <p><span class="fw-bold">Telefono:</span> {{ contatto.telephone }}</p>
                        <p><span class="fw-bold">Codice:</span> {{ contatto.code }}</p>
                    </div>
                </div>
                
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