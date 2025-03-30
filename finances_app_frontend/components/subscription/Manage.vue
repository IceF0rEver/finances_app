<template>
  <Sheet v-model:open="isSheetOpen" class="z-40">
    <SheetContent>
        <SheetHeader>
            <SheetTitle>                                
                {{ props.status === true ? $t('subscription.update.title') : $t('subscription.add.title') }}
            </SheetTitle>
            <SheetDescription>
                {{ props.status === true ? $t('subscription.update.description') : $t('subscription.add.description') }}
                <Separator class="my-2" />
            </SheetDescription>
        </SheetHeader>
        <p v-if="errorMessage" class="text-red-500 text-sm pt-2">{{ errorMessage }}</p>
        <div class="grid gap-4 py-4">
            <div>
                <Label for="name">{{ $t('subscription.form.label.name') }}</Label>
                <Input v-model="props.data.name"  id="name" required />
            </div>
            <div>
                <Label for="amount">{{ $t('subscription.form.label.amount')}}</Label>
                <Input v-model="props.data.amount" id="amount" type="number" required />
            </div>
            <div>
                <Label for="recurrence">{{ $t('subscription.form.label.recurrence')}}</Label>
                <RadioGroup default-value="monthly" v-model="props.data.recurrence" :orientation="'horizontal'" class="flex flex-row gap-4">
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="monthly" value="monthly" />
                        <Label for="monthly">{{ $t('subscription.form.label.monthly')}}</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="annually" value="annually" />
                        <Label for="annually">{{ $t('subscription.form.label.annually')}}</Label>
                    </div>
                </RadioGroup>
            </div>
            <div>
                <Label for="executionDate">{{ $t('subscription.form.label.executionDate')}}</Label>
                <Popover>
                    <PopoverTrigger as-child>
                        <Button
                            variant="outline" class="w-full text-start font-normal text-muted-foreground">
                            <span>{{ value }}</span>
                            <Icon name="lucide:calendar" class="ms-auto h-4 w-4 opacity-50" />
                        </Button>
                        <input hidden>
                    </PopoverTrigger>
                    <PopoverContent class="w-auto p-0">
                        <Calendar v-model="value" :locale="locale"/>
                    </PopoverContent>
                </Popover>
            </div>
            <div>
                <UtilsIconInput :selectedIcon="props.data.icon" @icon="props.data.icon = $event"/>
            </div>
        </div>
        <SheetFooter>
                <Button v-if="props.status === true" type="submit" @click="manage('update')">
                    {{ $t('subscription.button.update')  }}
                </Button>
                <Button v-else type="submit" @click="manage('add')">
                    {{ $t('subscription.button.add') }}
                </Button>
        </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {Sheet,SheetContent,SheetDescription,SheetFooter,SheetHeader,SheetTitle} from '@/components/ui/sheet'
import { type DateValue, getLocalTimeZone, today, CalendarDate } from '@internationalized/date';
import { Calendar } from '@/components/ui/calendar';
import type { subscriptionDatas } from "~/utils/types";
import { useToast } from '@/components/ui/toast/use-toast'

const { setSubscriptionData, updateSubscriptionData } = useSubscription();
const { t } = useI18n();
const { toast } = useToast();
const { locale } = useI18n();

const emit = defineEmits(["closeSheet"]);
const props = defineProps<{
    status: boolean;
    data: subscriptionDatas;
}>();

const subscriptions = useState<subscriptionDatas[]>('subscription-data', () => []);

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>;
const isSheetOpen = ref(false);
const toastMessage = ref('');
const errorMessage = ref('');

watch(() => props.data, (newData) => {
    if (newData && newData.execution_date) {
        value.value = new CalendarDate(
            new Date(newData.execution_date).getFullYear(),
            new Date(newData.execution_date).getMonth() + 1,
            new Date(newData.execution_date).getDate()
        );
    } else {
        value.value = today(getLocalTimeZone());
    }
});

const manage = async (type : 'update' | 'add') => {
    errorMessage.value = "";
    props.data.execution_date = new Date(value.value.toString());

    if (props.data.name === "" || props.data.icon === ""){
        errorMessage.value = t('subscription.error.input.emptyInput');
    } else {
        try {
            switch (type) {
                case 'update':
                    emit("closeSheet");
                    await updateSubscriptionData(props.data);
                    toastMessage.value = t('subscription.update.success');
                    break;
                case 'add':
                    emit("closeSheet"); 
                    await setSubscriptionData(props.data);
                    subscriptions.value.push(props.data);
                    toastMessage.value = t('subscription.add.success');
                    break;
            }
        } catch {
            switch (type) {
                case 'update':
                    toastMessage.value = t('subscription.update.error');
                    break;
                case 'add':
                    toastMessage.value = t('subscription.add.error');
                    break;
            }
        }
        toast({
                description: toastMessage.value,
            });
    }
}
</script>