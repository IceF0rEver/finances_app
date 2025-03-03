<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
          size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarFallback class="rounded-lg">
                <Icon name="lucide:user" size="25"/>
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ user?.name }}</span>
              <span class="truncate text-xs">{{ user?.email }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
        class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        :side="isMobile ? 'bottom' : 'right'"
        :align="'end'"
        :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarFallback class="rounded-lg">
                  <Icon name="lucide:user" size="25"/>
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user?.name }}</span>
                <span class="truncate text-xs">{{ user?.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Icon name="lucide:settings-2"/>
              <NuxtLink :to="$localePath('/dashboard/setting')">  {{ $t('sidebar.user.setting') }} </NuxtLink>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <!-- <LogOut /> -->
            <Icon name="lucide:log-out"/>
            <form @submit.prevent="submit" class="space-y-4">
              <button type="submit" class="" >{{ $t('auth.button.logout') }}</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
<script setup lang="ts">
    import { ChevronsUpDown } from "lucide-vue-next"
    import {Avatar,AvatarFallback,AvatarImage,} from '@/components/ui/avatar'
    import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from '@/components/ui/dropdown-menu'
    import {SidebarMenu,SidebarMenuButton,SidebarMenuItem,useSidebar,} from '@/components/ui/sidebar'
    import type { userAuth } from '~/utils/types';

    const { logout } = useAuth();
    const { isMobile } = useSidebar()
    
    defineProps<{ user: userAuth | null }>();

    async function submit() {
      try {
          await logout(); 
      } catch (err : any) {
          console.error(err.value);
      };
    };
</script>