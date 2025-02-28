
<template>
  <Sidebar>
    <!-- sideBar contenu -->
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                    <a :href="item.url">
                      <component :is="item.icon" />
                      <span>{{item.title}}</span>
                    </a>
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

import { Calendar, HandCoins } from "lucide-vue-next"
import {Sidebar,SidebarContent,SidebarGroup,SidebarGroupContent,SidebarMenu,SidebarMenuButton,SidebarMenuItem,SidebarFooter} from "@/components/ui/sidebar"
import type { userAuth } from "~/utils/types";

const { t } = useI18n();
const userAuth = useCookie<userAuth>('user-auth');

const items = [
      {
        title: t('sidebar.menu.budget'),
        url: "#",
        icon: HandCoins,
    },
    {
        title: t('sidebar.menu.subscription'),
        url: "#",
        icon: Calendar,
    },
];
</script>