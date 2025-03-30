<template>
    <Card>
        <CardHeader>
            <div>
                <CardTitle class="text-xl font-medium">{{ $t('subscription.title.calendar') }}</CardTitle>
                <CardDescription>{{ $t('subscription.description.calendar') }}</CardDescription>
            </div>
        </CardHeader>
        <CardContent class="px-2 md:px-4">
            <Calendar 
            v-model="value"
            :locale="locale" 
            :subscriptions="props.subscriptions" 
            :weekday-format="'short'" 
            class="rounded-md border mx-auto" 
            />
        </CardContent>
    </Card>
</template>
<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import type { subscriptionDatas } from "~/utils/types";
import { Calendar } from '@/components/ui/calendar';

const emit = defineEmits(["valueCalendar"]);
const props = defineProps<{
  subscriptions: subscriptionDatas[];
}>();

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>;
const { locale } = useI18n();

watch(value, (newValue) => {
  emit("valueCalendar", newValue);
});
</script>