<script>
export default {
    name: 'NotFoundPage',
}
</script>

<template>
    <div class="container d-flex justify-content-center align-items-center">
        <div class="d-flex justify-content-center flex-column">
            <h1 class="mb-2">Page not found</h1>
            <router-link :to="{ name: 'home' }" class="btn btn-success">
                Ritorna all'HomePage
            </router-link>
        </div>
    </div>
</template>


<style scoped>
.container {
    height: 100vh;
}
</style>
