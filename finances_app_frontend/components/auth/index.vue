
<template>
    <div class="flex gap-2 flex-col items-center justify-center min-h-screen">
        <AuthLogin v-if="isLogin" @handleIsLogin="isLogin = !isLogin"/>
        <AuthRegister v-if="!isLogin" @handleIsLogin="isLogin = !isLogin"/>
        <div class="w-[350px] flex justify-end gap-2">
            <UtilsDarkMode class="my-auto"/>
            <Separator orientation="vertical" class="h-8 my-auto" />
            <div class="w-[180px]">
              <UtilsSelectLang/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Separator } from '@/components/ui/separator';
const isLogin = ref(true);
</script>