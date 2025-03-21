
<template>
    <div class="flex gap-2 flex-col items-center justify-center min-h-screen">
        <!-- form -->
        <AuthLogin v-if="isLogin" @handleIsLogin="handleIsLogin()"/>
        <AuthRegister v-if="!isLogin" @handleIsLogin="handleIsLogin()"/>
        <!-- langs choise -->
        <div class="w-[350px] flex justify-end gap-2">
            <DarkMode class="my-auto"/>
            <Separator orientation="vertical" class="h-8 my-auto" />
            <div class="w-[180px]">
              <SelectLang/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { Separator } from '@/components/ui/separator';
    const isLogin = ref(true);

    const handleIsLogin = () => {
        isLogin.value =!isLogin.value;
    }
</script>