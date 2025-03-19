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

    const sankeyData = useState<sankeyDatas[]>('sankey-data', () => []);
    const sankeyDataFromDb = ref<sankeyDatas[]>([]);
    const isOpenInput = ref(false);

    const { getSankeyData, setSankeyData } = useSankey();

    if (sankeyData.value.length === 0) {
        const { data, pending, error } = await getSankeyData();
        if (data !== null) {
            sankeyDataFromDb.value = data;
            if (sankeyDataFromDb.value.length === 0) {
                isOpenInput.value = true;
            } else {
                sankeyData.value = sankeyDataFromDb.value;
            }
        }
    }

    const handleSankeyData = async (data: sankeyDatas[]) => {
        sankeyData.value = data;
        if ((isOpenInput.value === true) && (sankeyDataFromDb.value.length === 0)) {
            await setSankeyData(sankeyData.value);
            isOpenInput.value = false;
        } else if (sankeyData.value.length === 0) {
            isOpenInput.value = true;
        }
    };
</script>


