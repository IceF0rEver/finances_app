
<template>
    <div class="flex gap-2 flex-col items-center justify-center min-h-screen">
        <!-- form -->
        <ClientOnly>
            <Card class="w-[350px]">
                <CardHeader>
                    <CardTitle>{{ $t('auth.login') }}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="submit" class="space-y-4">
                        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

                        <Input v-model="form.email" type="email" :placeholder="$t('auth.email')" required />
                        <Input v-model="form.password" type="password" :placeholder="$t('auth.password')" required />

                        <!-- <p class="text-xs text-right ">
                            <span  class="text-blue-500 cursor-pointer">
                                {{ $t('auth.forgotPassword') }}
                            </span>
                        </p> -->
                    
                        <Button type="submit" class="w-full" >{{ $t('auth.submit') }}</Button>
                    </form>
                    <p class="text-sm text-center mt-4">
                        <span class="text-blue-500 cursor-pointer">
                            <NuxtLink :to="$localePath('register')"> {{ $t('auth.noAccount') }} </NuxtLink>

                        </span>
                    </p>
                </CardContent>
            </Card>
        </ClientOnly>
        <!-- langs choise -->
        <div class="w-[350px] flex justify-end">
            <SelectLang/>
        </div>
    </div>
</template>
<script setup lang="ts">
    definePageMeta({
        middleware: ['guest']
    })
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import type { userForm } from "@/utils/types";
      
    const form = reactive<userForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const errorMessage = ref('');

    const { login } = useAuth();

    async function submit() {
        errorMessage.value = '';
        try {
            await login(form); 
        } catch (err : any) {
            errorMessage.value = err;
        };
    };
</script>