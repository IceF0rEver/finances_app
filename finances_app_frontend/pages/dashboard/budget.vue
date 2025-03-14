<template>
     <div class="p-6">
        <div>
            <h1 class="text-3xl font-bold">{{$t('sidebar.menu.name.budget')}}</h1>
            <p class="py-2">{{$t('sidebar.menu.description.budget')}}</p>
            <Separator class="my-4" />           
        </div>
        <div v-if="isOpenInput" class="flex justify-center p-6">
            <BudgetManageChart :isInitSankey="true" @sankeyData="handleSankeyData" />
        </div>
        <div>
            <BudgetSankeyChart v-if="!isOpenInput && sankeyData.length > 0" :data="sankeyData" @sankeyData="handleSankeyData"/>
        </div>
    </div>
 </template>
<script lang="ts" setup>
    import { Separator } from "@/components/ui/separator";
    import type { sankeyDatas } from "~/utils/types";

    const isOpenInput = ref(false);
    const sankeyData = ref<sankeyDatas[]>([]);
    const sankeyDataFromDb = ref<any>([]);

    const { getSankeyData, setSankeyData } = useSankey();

    if (sankeyData.value.length === 0) {
        sankeyDataFromDb.value = await getSankeyData();
        if (sankeyDataFromDb.value.data.length === 0) {
            isOpenInput.value = true;
        } else {
            sankeyData.value = sankeyDataFromDb.value.data;
        }
    }

    const handleSankeyData = async (data: sankeyDatas[]) => {
        sankeyData.value = data;
        if (sankeyData.value.length != 0){
            await setSankeyData(sankeyData.value);
            isOpenInput.value = false;
        } else {
            isOpenInput.value = true;
        }
    };
</script>


