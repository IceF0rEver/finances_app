<template>
    <div>
        <UtilsCustomLoading v-if="isLoading" />
        <Toaster />
        <NuxtPage/>
    </div>
</template>
<script lang="ts" setup>
import Toaster from '@/components/ui/toast/Toaster.vue'
const { isLoading } = useLoadingIndicator(); 
</script>
