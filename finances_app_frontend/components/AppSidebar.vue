
<template>
  <Sidebar>
    <!-- sideBar contenu -->
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                  <NuxtLink :to="$localePath('/dashboard/' + item.url)">
                    <Icon :name="item.icon"/>
                    {{item.title}} 
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <!-- sideBar footer -->
    <SidebarFooter>
      <NavUser :user="userAuth" />
    </SidebarFooter>
  </Sidebar>
</template>
<script setup lang="ts">

import {Sidebar,SidebarContent,SidebarGroup,SidebarGroupContent,SidebarMenu,SidebarMenuButton,SidebarMenuItem,SidebarFooter} from "@/components/ui/sidebar"
import type { userAuth } from "~/utils/types";

const { t } = useI18n();
const userAuth = useCookie<userAuth>('user-auth');

const items = [
      {
        title: t('sidebar.menu.name.budget'),
        url: "budget",
        icon: 'lucide:hand-coins',
    },
    {
        title: t('sidebar.menu.name.subscription'),
        url: "#",
        icon: 'lucide:calendar',
    },
];
</script>