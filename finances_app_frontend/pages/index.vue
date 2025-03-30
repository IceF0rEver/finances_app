<template>
    <Auth/>
</template>
<script setup lang="ts">
    definePageMeta({
        middleware: ['guest']
    })
</script>