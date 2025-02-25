
<template>
  <div v-if="userAuth" class="flex flex-col items-center justify-center min-h-screen">
    <p class="p-4">Bienvenue, {{ userAuth?.email }}</p>
    <form @submit.prevent="submit" class="space-y-4">
        <Button type="submit" class="" >{{ $t('auth.logout') }}</Button>
    </form>
  </div>
</template>
<script setup>
    definePageMeta({
        middleware: ['auth']
    })
    import { Button } from "@/components/ui/button";


    const { logout } = useAuth();
    const userAuth = useCookie('user-auth');

    async function submit() {
        try {
            await logout(); 
        } catch (err) {
            console.error(err.value);
        };
    };
</script>
