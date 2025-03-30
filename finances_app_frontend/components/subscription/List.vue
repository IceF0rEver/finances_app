<template>
    <Card>
        <SubscriptionManage v-model:open="isSheetOpen" :status="isEdit" :data="subscriptionData" @closeSheet="isSheetOpen = false"/>
        <CardHeader>
            <div class="flex items-center justify-between">
                <div>
                    <CardTitle class="text-2xl font-bold">{{ $t('subscription.title.yourSubscriptions') }}</CardTitle>
                    <CardDescription>{{ $t('subscription.description.yourSubscriptions') }}</CardDescription>
                </div>
                <Button @click="isSheetOpen = true; isEdit = false; subscriptionData = { name: '', amount: 0, recurrence: 'monthly', execution_date: new Date(), icon: '' }" class="flex items-center gap-1.5">
                    <Icon name="lucide:plus-circle" class="h-4 w-4" />
                    <span>{{ $t('subscription.button.add') }}</span>
                </Button>
            </div>
            <Tabs v-model="activeTab" class="w-full mt-4">
                <TabsList class="grid grid-cols-4 w-full">
                    <TabsTrigger value="this-day">{{ $t('subscription.tabs.thisDay') }}</TabsTrigger>
                    <TabsTrigger value="all">{{ $t('subscription.tabs.all') }}</TabsTrigger>
                    <TabsTrigger value="annually">{{ $t('subscription.tabs.annually') }}</TabsTrigger>
                    <TabsTrigger value="monthly">{{ $t('subscription.tabs.monthly') }}</TabsTrigger>
                </TabsList>
            </Tabs>
        </CardHeader>
        <CardContent class="p-4 overflow-y-auto max-h-[350px] md:max-h-[calc(100vw-(100vw/4)*3)]">
            <div v-if="filteredSubscriptions.length > 0" class="space-y-3">
                <div v-for="subscription in filteredSubscriptions" :key="subscription.id" class="w-full">
                    <Card class="overflow-hidden border-border/40 hover:border-border/80 transition-colors">
                        <div class="flex">
                            <div class="flex items-center justify-center bg-muted w-16 sm:w-20">
                                <div class="flex items-center justify-center">
                                    <Icon :name="subscription.icon" class="size-10 sm:size-12"/>
                                </div>
                            </div>
                            <CardContent class="flex-1 p-3 sm:p-4">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h3 class="font-semibold text-base sm:text-lg">{{ subscription.name }}</h3>
                                        <div class="flex flex-wrap items-center gap-2 mt-1">
                                            <Badge :variant="subscription.recurrence === 'monthly' ? 'default' : 'outline'" class="text-xs">
                                                {{ subscription.recurrence === "monthly" ? $t('subscription.tabs.monthly') : $t('subscription.tabs.annually') }}
                                            </Badge>
                                            <span class="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                                                <Icon name="lucide:calendar" class="h-3 w-3" /> 
                                                {{ useDateFormat(subscription.execution_date, 'YYYY-MM-DD') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="font-bold text-right whitespace-nowrap">
                                        {{ subscription.amount }} €
                                    </div>
                                </div>
                            </CardContent>
                            <div class="flex items-start p-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" class="h-8 w-8">
                                            <Icon name="lucide:more-vertical" class="h-4 w-4" />
                                            <span class="sr-only">{{ $t('subscription.button.menu') }}</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent :align="'end'">
                                        <DropdownMenuItem @click="isSheetOpen = true, isEdit = true, subscriptionData = subscription" class="flex items-center gap-2 cursor-pointer">
                                            <Icon name="lucide:pencil" class="h-4 w-4" /> 
                                            {{ $t('subscription.button.update') }}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                        class="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                                        @click="isDeleteOpen = true"
                                        >
                                            <Icon name="lucide:trash-2" class="h-4 w-4" /> 
                                            {{ $t('subscription.button.delete') }}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <AlertDialog :open="isDeleteOpen" @update:open="isDeleteOpen = $event">
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>{{ $t('subscription.delete.title') }}</AlertDialogTitle>
                                            <AlertDialogDescription>{{ $t('subscription.delete.description') }}</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel @click="isDeleteOpen = false">{{ $t('subscription.delete.back') }}</AlertDialogCancel>
                                            <AlertDialogAction @click="remove(subscription.id?.toString() ?? '')">{{ $t('subscription.delete.confirm') }}</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <div v-else class="py-8 text-center">
                <div class="mx-auto flex flex-col items-center justify-center">
                    <Icon name="lucide:calendar-x" class="h-12 w-12 text-muted-foreground/60" />
                    <h3 class="mt-4 text-lg font-medium">{{ $t('subscription.title.emptySubscriptions') }}</h3>
                    <p class="mt-2 text-sm text-muted-foreground">{{ $t('subscription.description.emptySubscriptions') }}</p>
                </div>
            </div>
        </CardContent>
        <CardFooter class="flex-col border-t pt-6 px-6">
            <div class="w-full flex justify-between items-center mb-2 whitespace-nowrap">
                <span class="text-sm text-muted-foreground">{{ $t('subscription.title.totalMonthly') }}</span>
                <span class="font-medium">{{ totalMonthly.toFixed(2) }} €</span>
            </div>
            <div class="w-full flex justify-between items-center whitespace-nowrap">
                <span class="text-sm text-muted-foreground">{{ $t('subscription.title.totalAnnually') }}</span>
                <span class="font-medium">{{ totalAnnual.toFixed(2) }}  €</span>
            </div>
        </CardFooter>
    </Card>
</template>
<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle} from '@/components/ui/alert-dialog';
import type { DateValue } from '@internationalized/date';
import type { subscriptionDatas } from "~/utils/types";
import { useToast } from '@/components/ui/toast/use-toast'

const { removeSubscriptionData } = useSubscription();
const { calendarCheckDate } = useUtils();
const { t } = useI18n();
const { toast } = useToast();

const props = defineProps<{
    subscriptions: subscriptionDatas[];
    date: DateValue;
}>();

const subscriptions = useState<subscriptionDatas[]>('subscription-data', () => []);

const toastMessage = ref('');
const activeTab = ref('this-day');
const isSheetOpen = ref(false);
const isDeleteOpen = ref(false);
const isEdit = ref(false);
const subscriptionData = ref<subscriptionDatas>({
    name: '',
    amount: 0,
    recurrence:'monthly',
    execution_date: new Date(),
    icon: '',
});

const totalMonthly = computed(() => {
    return props.subscriptions
    .filter(sub => sub.recurrence === 'monthly')
    .reduce((sum, sub) => sum + sub.amount, 0);
});

const totalAnnual = computed(() => {
    const monthlyTotal = totalMonthly.value * 12;
    const annualSubs = props.subscriptions
    .filter(sub => sub.recurrence === 'annually')
    .reduce((sum, sub) => sum + sub.amount, 0);
    
    return monthlyTotal + annualSubs;
});

const filteredSubscriptions = computed(() => {
    switch (activeTab.value) {
    case 'this-day':
        return props.subscriptions.filter(s => calendarCheckDate(s, props.date));
    case 'all':
        return props.subscriptions;
    case 'annually':
        return props.subscriptions.filter(item => item.recurrence === 'annually');
    case 'monthly':
        return props.subscriptions.filter(item => item.recurrence === 'monthly');
    default:
        return props.subscriptions;
    }
});

const remove = async (id: string) => {
    try {
        await removeSubscriptionData(id);
        const index = subscriptions.value.findIndex(sub => sub.id?.toString() === id);
        if (index !== -1) {
            subscriptions.value.splice(index, 1);
        }
        toastMessage.value = t('subscription.delete.success');
    } catch {
        toastMessage.value = t('subscription.delete.error');
    }
        toast({
            description: toastMessage.value,
        });
    }
</script>