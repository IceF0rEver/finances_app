<template>
  <SidebarProvider :defaultOpen="defaultOpen"> 
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-14 shrink-0 items-center gap-2">
        <div class="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <RouterView />
        </div>
        <div class="flex flex-row gap-2 p-2">
          <DarkMode class="my-auto"/>
          <Separator orientation="vertical" class="h-8 my-auto" />
          <SelectLang/>
        </div>
      </header>
      <div></div>
    </SidebarInset>
  </SidebarProvider>
</template>
<script setup>
    definePageMeta({
        middleware: ['auth']
    })
    import AppSidebar from '@/components/AppSidebar.vue'
    import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'
    import { Separator } from '@/components/ui/separator'

    const defaultOpen = useCookie('sidebar_state')
</script>
