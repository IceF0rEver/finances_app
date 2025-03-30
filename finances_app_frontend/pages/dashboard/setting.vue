<template>
    <div class="p-6">
        <div>
            <h1 class="text-3xl font-bold">{{$t('setting.title.setting')}}</h1>
            <p class="py-2">{{$t('setting.description.setting')}}</p>
            <Separator class="my-4" />           
        </div>
        <div class="md:grid md:grid-cols-5">
            <div class="md:col-span-1">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu  class="flex-row md:flex-col">
                                <SidebarMenuItem v-for="item in items" :key="item.key">
                                    <SidebarMenuButton asChild 
                                    :is-active="settingItemSelected === item.key"
                                    @click="setActiveTab(item.key)"
                                    >
                                        <span>{{ item.title }}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </div>
            <div class="md:col-span-4">
                <Setting v-if="settingItemSelected === 'account'" />
                <SettingAppearance v-if="settingItemSelected === 'appearance'" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Separator } from "@/components/ui/separator";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const settingItemSelected = useState('setting-item-selected', () => "account");
const { t } = useI18n();

const items = [
    { title: t('sidebar.user.account'), key: "account" },
    { title: t('sidebar.user.appearance'), key: "appearance" },
];

const setActiveTab = (key: string) => {
    settingItemSelected.value = key;
};
</script>
