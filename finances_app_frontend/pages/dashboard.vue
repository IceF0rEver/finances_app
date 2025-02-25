
<template>
    <SidebarProvider :defaultOpen="defaultOpen">
    <AppSidebar />
    <main>
      <SidebarTrigger />
      <RouterView />
      <div class="p-4">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium pariatur voluptatum nesciunt quisquam sed, porro enim, similique molestias odio quam recusandae aut ullam assumenda? Accusantium quidem at nulla ducimus rem!
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium pariatur voluptatum nesciunt quisquam sed, porro enim, similique molestias odio quam recusandae aut ullam assumenda? Accusantium quidem at nulla ducimus rem!</p>
      </div>
    </main>
  </SidebarProvider>
</template>
<script setup>
    definePageMeta({
        middleware: ['auth']
    })
    import AppSidebar from '@/components/AppSidebar.vue'
    import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

    const defaultOpen = useCookie('sidebar_state')
</script>
