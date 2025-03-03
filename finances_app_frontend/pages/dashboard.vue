<template>
    <SidebarProvider :defaultOpen="defaultOpen"> 
      <AppSidebar />
      <SidebarInset>
        <header class="flex h-14 shrink-0 items-center gap-2">
          <div class="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" class="mr-2 h-4" />
            <!-- <RouterView /> -->
          </div>
          <!-- <div class="p-2.5">
            <div class="w-[180px]">
              <SelectLang/>
            </div>
          </div> -->
        </header>
        <div>
          <NuxtPage/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  </template>
  
  <script lang="ts" setup>
  definePageMeta({
      middleware: ['auth']
  })
  import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'
  import { Separator } from '@/components/ui/separator'
  
  const defaultOpen = useCookie<boolean>('sidebar_state')
  </script>
  