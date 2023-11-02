<script>
import Actions from './Actions.vue';

export default {
    name: 'Card',
    components:{
        Actions
    },
    props: {
        data: Object,
        path: String,
        actions: Boolean
    }
}
</script>

<template>
    <div class="card">
        <div class="card-header">
            <h4>{{ data.title }}</h4>
        </div>
        <div class="card-body">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col" v-if="actions">Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in data.list">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ item.name }}</td>
                        <td v-if="actions">
                           <Actions :path="path"></Actions> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
