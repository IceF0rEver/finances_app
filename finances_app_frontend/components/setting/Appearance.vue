<template>
    <div class="p-6 max-w-3xl">
        <div>
            <h1 class="text-xl font-bold">{{$t('setting.title.appearance')}}</h1>
            <p class="py-2">{{$t('setting.description.appearance')}}</p>
            <Separator class="my-4" />           
        </div>
        <div class="flex flex-col w-full gap-9">
            <div class="flex flex-col gap-2">
                <Label>{{$t('setting.title.language')}}</Label>
                <UtilsSelectLang />
                <p class="text-sm opacity-60">{{$t('setting.description.language')}}</p>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex flex-row gap-2">
                    <Label class="my-auto">{{$t('setting.title.theme')}} :</Label>
                    <UtilsDarkMode />
                </div>
                <p class="text-sm opacity-60">{{$t('setting.description.theme')}}</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
</script>