<template>
    <SidebarProvider :defaultOpen="defaultOpen"> 
        <UtilsAppSidebar />
        <SidebarInset>
            <header class="flex h-14 shrink-0 items-center gap-2">
                <div class="flex flex-1 items-center gap-2 px-3">
                    <SidebarTrigger />
                    <Separator orientation="vertical" class="mr-2 h-4" />
                </div>
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
  