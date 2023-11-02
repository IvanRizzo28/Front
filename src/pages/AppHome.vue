<script>
import Card from '../components/Card.vue'

export default {
  name: 'AppHome',
  components: {
    Card
  },
  data() {
    return {
      list: [
        {
          name: 'prova'
        },
        {
          name: 'prova2'
        }
      ]
    }
  }
}
</script>

<template>
  <main class="container p-4">
    <div class="row gy-4">
      <div class="col-12 col-lg-8">
        <Card :data="{ title: 'Anagrafica', list }" path="/anagrafica" :actions="true"></Card>
      </div>
      <div class="col-12 col-lg-4">
        <Card :data="{ title: 'Prime 20 rubriche', list }" :actions="false"></Card>
      </div>
    </div>
  </main>
</template>

<style scoped></style>