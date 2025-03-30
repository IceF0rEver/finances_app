<template>
    <div class="w-[calc(100vw-3rem)] md:w-full">
        <div>
            <BudgetUpdateChart :data="props.data"/>
            <div class="overflow-x-auto">
                <highchart :options="options" class="pt-12 min-w-[750px]" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Highcharts from "highcharts";
import Sankey from "highcharts/modules/sankey";
import type { sankeyDatas } from "~/utils/types";

const props = defineProps<{
    data: sankeyDatas[];
}>();

Sankey(Highcharts);

const options = computed(() => ({
    credits: {
        enabled: false
    },
    title: {
        text: ''
    },
    subtitle: {
        enabled: false
    },
    accessibility: {
        enabled: false
    },
    series: [{
        keys: ['from', 'to', 'weight'],
        data: props.data.map(item => [item.from, item.to, item.amount]),
        dataLabels: {
            align: 'left',
            x: 5,
            nodeFormat: '{point.name}: {point.sum:.2f}€',
            padding: 2,
            style: {
                fontSize: '0.75em',
                textOutline: 'none',
            },
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 3,
        },
        type: 'sankey',
        name: '',
        linkOpacity: 0.3,
        nodePadding: 20,
        curveFactor: 0.5,
        nodeWidth: 20,
        borderRadius: 0,
    }],
    responsive : {
        rules: [{
            condition: {
                minWidth: 700,
            },
        }],
    }
}));
</script>