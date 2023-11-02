<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<template>
  <Header></Header>
  <RouterView></RouterView>
</template>


<style>
.pointer{
        cursor: pointer;
    }
</style>
