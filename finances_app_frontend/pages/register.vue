
<template>
    <div class="flex gap-2 flex-col items-center justify-center min-h-screen">
        <!-- form -->
        <ClientOnly>
            <Card class="w-[350px]">
                <CardHeader>
                    <CardTitle>{{ $t('auth.register') }}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="submit" class="space-y-4">
                        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

                        <Input v-model="form.name" :placeholder="$t('auth.name')" required />
                        <Input v-model="form.email" type="email" :placeholder="$t('auth.email')" required />
                        <Input v-model="form.password" type="password" :placeholder="$t('auth.password')" required />
                        <Input v-model="form.password_confirmation" type="password" :placeholder="$t('auth.confirmPassword')" required />

                    
                        <Button type="submit" class="w-full">{{ $t('auth.register_submit') }}</Button>
                    </form>
                    <p class="text-sm text-center mt-4">
                        <span class="text-blue-500 cursor-pointer">
                            <NuxtLink :to="$localePath('index')"> {{ $t('auth.haveAccount') }} </NuxtLink>
                        </span>
                    </p>
                </CardContent>
            </Card>
        </ClientOnly>
        <!-- langs choise -->
        <div class="w-[350px] flex justify-end gap-2">
            <DarkMode class="my-auto"/>
            <Separator orientation="vertical" class="h-8 my-auto" />
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
    import { Separator } from '@/components/ui/separator'
    import type { userForm } from "@/utils/types";

    const { t } = useI18n();
      
    const form = reactive<userForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const errorMessage = ref('');

    const { register } = useAuth();

    async function submit() {
        errorMessage.value = '';

        if (form.password !== form.password_confirmation) {
            errorMessage.value = t('auth.passwordMismatch');
            return;
        };

        try {
            await register(form);
        } catch (err : any) {
            errorMessage.value = err;
        };
    };
</script>