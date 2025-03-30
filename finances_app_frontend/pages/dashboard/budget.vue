<template>
     <div class="p-6">
        <div>
            <h1 class="text-3xl font-bold">{{$t('sidebar.menu.name.budget')}}</h1>
            <p class="py-2">{{$t('sidebar.menu.description.budget')}}</p>
            <Separator class="my-4" />           
        </div>
        <div v-if="isOpenInput" class="flex justify-center md:p-6">
            <BudgetManageChart :isInitSankey="true" :data="sankeyData" />
        </div>
        <div>
            <Budget v-if="!isOpenInput && sankeyData.length > 0" :data="sankeyData"/>
        </div>
    </div>
 </template>
<script lang="ts" setup>
import { Separator } from "@/components/ui/separator";
import type { sankeyDatas } from "~/utils/types";

const { getSankeyData } = useSankey();

const sankeyData = useState<sankeyDatas[]>('sankey-data', () => []);
const isOpenInput = useState<boolean>('sankey-is-open-input', () => false);
const sankeyDataFromDb = ref<sankeyDatas[]>([]);

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
</script>


