<template>
    <div>
        <h1 class="text-3xl font-bold">{{ $t('sidebar.menu.name.subscription') }}</h1>
        <p class="text-muted-foreground py-2">{{ $t('sidebar.menu.description.subscription') }}</p>
        <Separator class="my-4" />
    </div>
    <div class="flex flex-col xl:flex-row gap-6 pt-4">
        <div class="w-full xl:w-2/5">
            <SubscriptionCalendar :subscriptions="subscriptions" @valueCalendar="(val) => valueCalendar = val"/>
        </div>
        <div class="w-full xl:w-3/5">
            <SubscriptionList :subscriptions="subscriptions" :date="valueCalendar"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Separator } from "@/components/ui/separator";
import type { subscriptionDatas } from "~/utils/types";
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';

const { getSubscriptionData } = useSubscription();

const subscriptions = useState<subscriptionDatas[]>('subscription-data', () => []);
const isLoadingSubscription = useState<boolean>('is-loading-subscription', () => false);

const valueCalendar = ref(today(getLocalTimeZone())) as Ref<DateValue>;

if (subscriptions.value.length === 0 && !isLoadingSubscription.value){
    const { data, pending, error } = await getSubscriptionData();
    isLoadingSubscription.value = true;
    if (data !== null) {
        subscriptions.value = data;
    }
}
</script>
  
  