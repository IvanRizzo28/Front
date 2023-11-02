<script>
import axios from 'axios';

export default {
    name: 'Actions',
    props:{
        path: String,
        id: Number
    },
    methods:{
        async cancella(){
            var tmp=(this.path === '/rubrica') ? '/contatti' : this.path;
            await axios.delete('http://127.0.0.1:8000/api' + tmp + '/' + this.id).then(response => {
                location.reload();
            });
        }
    }
}
</script>

<template lang="">
    <div class="d-flex">
        <router-link class="btn btn-success me-2" :to="path + '/' + id">
            <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
        </router-link>
        <router-link class="btn btn-warning me-2" :to="path + '/update/' + id">
            <font-awesome-icon icon="fa-solid fa-pen" />
        </router-link>
        <button type="button" class="btn btn-danger" @click="cancella">
            <font-awesome-icon icon="fa-solid fa-trash" />
        </button>
    </div>
</template>

<style scoped></style>