<template>
    <div class="p-6 max-w-3xl">
        <div>
            <h1 class="text-xl font-bold">{{$t('setting.title.account')}}</h1>
            <p class="py-2">{{$t('setting.description.account')}}</p>
            <Separator class="my-4" />           
        </div>
        <div class="flex flex-col w-full gap-9">
            <div class="flex flex-col gap-1.5">
                <Label for="name">{{$t('auth.label.name')}}</Label>
                <Input id="name" type="text" v-model="form.name" :placeholder="$t('auth.placeholder.name')" />
            </div>
            <div class="flex flex-col gap-1.5">
                <Label for="email">{{$t('auth.label.email')}}</Label>
                <Input id="email" type="email" v-model="form.email" :placeholder="$t('auth.placeholder.email')" />
            </div>
            <Accordion type="single" collapsible>
                <AccordionItem value="">
                    <AccordionTrigger class=" pt-0 pb-4">{{$t('setting.title.changePassword')}}</AccordionTrigger>
                    <AccordionContent>
                        <div class="flex flex-col w-full gap-9">
                            <div class="flex flex-col gap-1.5">
                                <Label for="password">{{$t('auth.label.newPassword')}}</Label>
                                <Input id="password" type="password" v-model="form.password" :placeholder="$t('auth.placeholder.newPassword')" />
                            </div>
                            <div class="flex flex-col gap-1.5">  
                                <Label for="password_confirmation">{{$t('auth.label.confirmNewPassword')}}</Label>
                                <Input id="password_confirmation" type="password" v-model="form.password_confirmation" :placeholder="$t('auth.placeholder.confirmNewPassword')" />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
        <Button class="mt-4" @click="submit">{{$t('auth.button.update')}}</Button>
        <p v-if="errorMessage" class="text-red-500 text-sm py-2">{{ errorMessage }}</p>
    </div>
</template>
<script lang="ts" setup>
import { Separator } from '@/components/ui/separator'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast/use-toast'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { userAuth, userForm } from '~/utils/types';

const { t } = useI18n();
const { update } = useAuth();
const { toast } = useToast()

const user = useCookie<userAuth>('user-auth');

const errorMessage = ref('');
const successMessage = ref('');

const form = ref<userForm>({
    name:  user.value.name,
    email: user.value.email,
    password: '',
    password_confirmation: ''
});

async function submit() {
    errorMessage.value = '';
    successMessage.value = '';

    if (form.value.password !== form.value.password_confirmation) {
        errorMessage.value = t('auth.error.passwordMismatch');
        return;
    };

    try {
        successMessage.value = await update(form.value) ?? "";
        toast({
            description: successMessage.value,
        });
    } catch (err : any) {
        errorMessage.value = err;
    };
};
</script>