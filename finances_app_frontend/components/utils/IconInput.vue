<template>
    <div class="space-y-4">
        <div>
            <Label for="icon-search">{{ $t('subscription.form.label.icon') }}</Label>
            <div v-if="selectedIcon === null" class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Icon name="lucide:search" class="size-4 text-muted-foreground" />
                </div>
                <Input 
                    id="icon-search" 
                    v-model="searchInput" 
                    class="pl-10"
                    @input="debouncedSearch"
                />
            </div>
            <div v-if="selectedIcon" class="flex items-center gap-2 p-1 h-[40px] border rounded-md">
                <Icon :name="`${selectedIcon.key}:${selectedIcon.name}`" class="size-5" />
                <Button variant="ghost" size="icon" class="ml-auto size-8" @click="selectedIcon = null">
                    <Icon name="lucide:x" class="size-4" />
                </Button>
            </div>
        </div>

        <div v-if="searchQuery || simpleIcons.length > 0" class="border rounded-md h-32 overflow-y-auto p-2">
        <div v-if="filteredIcons.length === 0" class="flex items-center justify-center h-full text-muted-foreground">
            {{ $t('subscription.form.label.noResults') }}
        </div>
        
        <div v-else class="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
            <button
            v-for="icon in filteredIcons"
            :key="icon.name"
            class="flex flex-col items-center justify-center p-2 rounded-md hover:bg-muted transition-colors"
            @click="selectIcon({ key: icon.key, name: icon.name })"
            >
            <Icon :name="`${icon.key}:${icon.name}`" class="size-6" />
            </button>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { icons as iconsSimple } from "@iconify-json/simple-icons";
import { icons as iconsLucide } from "@iconify-json/lucide";

const emit = defineEmits(['icon']);
const props = defineProps<{
    selectedIcon?: string;
}>();

const searchInput = ref('');
const searchQuery = ref('');
const selectedIcon = ref<{ key: string; name: string } | null>(null);

const simpleIcons = Object.entries(iconsSimple.icons).map(([name, icon]) => ({
    key: "simple-icons",
    name,
    path: icon.body,
}));

const LucideIcons = Object.entries(iconsLucide.icons).map(([name, icon]) => ({
    key: "lucide",
    name,
    path: icon.body,
}));
const allIcons = [...simpleIcons, ...LucideIcons];

if (props.selectedIcon) {
    selectedIcon.value = {
        key: props.selectedIcon.split(':')[0],
        name: props.selectedIcon.split(':')[1],
    };
};

const debouncedSearch = useDebounceFn(() => {searchQuery.value = searchInput.value;}, 300);

const filteredIcons = computed(() => {
    if (!searchQuery.value.trim()) {
        return allIcons.slice(0, 24);
    }
    const query = searchQuery.value.toLowerCase();
    return allIcons.filter(icon => icon.name.toLowerCase().includes(query));
});

const selectIcon = (icon: { key: string, name: string }) => {
    selectedIcon.value = icon;
    emit('icon', `${icon.key}:${icon.name}`);
};
</script>