<template>
      <Switch :model-value="isDark" @update:model-value="toggleTheme">
        <template #thumb>
            <Icon v-if="isDark" name="lucide:moon" class="size-3.5" />
            <Icon v-else name="lucide:sun" class="size-3.5" />
        </template>
      </Switch>
</template>
<script lang="ts" setup>
    import { Switch } from '@/components/ui/switch'
    const colorMode = useColorMode();
    let isDark = ref();

    if (colorMode.preference === 'dark') {
        isDark.value = true;
    } else {
        isDark.value = false;
    };

    const toggleTheme = () => {
        isDark.value =!isDark.value;
        colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
    };
</script>