
<template>
    <ClientOnly>
        <Card class="w-[350px]">
            <CardHeader>
                <CardTitle>{{ $t('auth.title.login') }}</CardTitle>
            </CardHeader>
            <CardContent class="flex flex-col gap-3">
                <form @submit.prevent="submit" class="space-y-4">
                    <div>
                        <Label for="email">{{ $t('auth.label.email')}}</Label>
                        <Input v-model="form.email" type="email" required />
                        <p v-if="userAuthError?.email" class="text-red-500 text-xs">{{ userAuthError.email[0] }}</p>
                    </div>
                    <div>
                        <Label for="password">{{ $t('auth.label.password')}}</Label>
                        <Input class="" v-model="form.password" type="password" required />
                        <p v-if="userAuthError?.password" class="text-red-500 text-xs">{{ userAuthError.password[0] }}</p>
                    </div>
    
                    <!-- <p class="text-xs text-right ">
                        <span  class="text-blue-500 cursor-pointer">
                            {{ $t('auth.forgotPassword') }}
                        </span>
                    </p> -->
                
                    <Button type="submit" class="w-full" >{{ $t('auth.button.submit') }}</Button>
                </form>
                <p class="text-sm text-center mt-4">
                    <span @click=" emit('handleIsLogin'), userAuthError = {};" class="text-blue-500 cursor-pointer">
                       {{ $t('auth.link.noAccount') }}
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

    const { login } = useAuth();
    const userAuthError = useState<userAuthError>('user-auth');
    const emit = defineEmits(["handleIsLogin"]);
      
    const form = reactive<userForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    async function submit() {
        userAuthError.value = {};
        await login(form); 
    };
</script>