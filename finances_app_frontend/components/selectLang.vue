<template>
    <Select v-model="selectedLocale" @update:modelValue="setLocale(selectedLocale)">
        <SelectTrigger class="w-[180px]">
            <SelectValue :placeholder="$t('langs.select')" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectItem value="fr">
                    {{ $t('langs.fr') }}
                </SelectItem>
                <SelectItem value="en">
                    {{ $t('langs.en') }}
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>

<script lang="ts" setup>
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
const { locale, setLocale } = useI18n();
const selectedLocale = ref(locale.value);

watch(selectedLocale, (newLocale) => {
    setLocale(newLocale);
});
</script>
