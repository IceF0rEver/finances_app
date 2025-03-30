
<template>
    <ClientOnly>
        <Card class="w-[350px]">
            <CardHeader>
                <CardTitle>{{ $t('auth.title.register') }}</CardTitle>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submit" class="space-y-4">
                    <div>
                        <Label for="name">{{ $t('auth.label.name')}}</Label>
                        <Input v-model="form.name" required />
                        <p v-if="userAuthError?.name" class="text-red-500 text-xs">{{ userAuthError.name[0] }}</p>
                    </div>
                    <div>
                        <Label for="email">{{ $t('auth.label.email')}}</Label>
                        <Input v-model="form.email" type="email" required />
                        <p v-if="userAuthError?.email" class="text-red-500 text-xs">{{ userAuthError.email[0] }}</p>
                    </div>
                    <div>
                        <Label for="password">{{ $t('auth.label.password')}}</Label>
                        <Input v-model="form.password" type="password" required />
                        <p v-if="userAuthError?.password" class="text-red-500 text-xs">{{ userAuthError.password[0] }}</p>
                    </div>
                    <div>
                        <Label for="password_confirmation">{{ $t('auth.label.confirmPassword')}}</Label>
                        <Input v-model="form.password_confirmation" type="password" required />
                        <p v-if="userAuthError?.password_confirmation" class="text-red-500 text-xs">{{ userAuthError.password_confirmation[0] }}</p>
                    </div>
                    <Button type="submit" class="w-full">{{ $t('auth.button.registerSubmit') }}</Button>
                </form>
                <p class="text-sm text-center mt-4">
                    <span @click="emit('handleIsLogin'), userAuthError = {};" class="text-blue-500 cursor-pointer">
                        {{ $t('auth.link.haveAccount') }}
                    </span>
                </p>
            </CardContent>
        </Card>
    </ClientOnly>
</template>
<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { userForm, userAuthError } from "@/utils/types";

const { register } = useAuth();
const userAuthError = useState<userAuthError>('user-auth-error');
const emit = defineEmits(["handleIsLogin"]);

const form = ref<userForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

async function submit() {
    userAuthError.value = {};
    await register(form.value);
};
</script>
