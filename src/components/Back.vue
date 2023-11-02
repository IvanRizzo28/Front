<script>
export default {
    name: 'Back',
    methods: {
        back(){
            this.$router.back();
        }
    }
}
</script>

<template>
    <div class="mb-4 fs-2">
        <font-awesome-icon class="pointer" icon="fa-solid fa-arrow-left" @click="back" />
    </div>
</template>

<style scoped></style>