<template>
    <div class="relative">
        <div class="absolute z-10 right-0 flex flex-row items-center">
            <Sheet v-model:open="isSheetOpen" class="z-50">
                <SheetTrigger>
                    <Button variant="outline" class="rounded-none rounded-l-lg p-2">
                        <Icon name="lucide:square-pen" size="18"/>
                    </Button>
                </SheetTrigger>
                <SheetContent class="p-2 overflow-y-auto">
                    <SheetHeader  class="p-2">
                        <SheetTitle>{{ $t('budget.update.title') }}</SheetTitle>
                        <SheetDescription>
                            {{ $t('budget.update.description') }}
                            <Separator  class="my-2" />         
                        </SheetDescription>
                    </SheetHeader>
                    <div>
                        <BudgetManageChart :isInitSankey="false" :data="props.data" @closeSheet="isSheetOpen = false" @sankeyData="handleSankeyData"/>
                    </div>
                </SheetContent>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant="outline" class="rounded-none rounded-r-lg p-2">
                            <Icon name="lucide:trash-2" size="18" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{{ $t('budget.delete.title') }}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {{ $t('budget.delete.description') }}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{{ $t('budget.delete.back') }}</AlertDialogCancel>
                        <AlertDialogAction @click="removeSankey()">{{ $t('budget.delete.confirm') }}</AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </Sheet>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { Separator } from "@/components/ui/separator";
    import { Button } from '@/components/ui/button';
    import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
    import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from '@/components/ui/alert-dialog'
    import { useToast } from '@/components/ui/toast/use-toast'
    import type { sankeyDatas } from "~/utils/types";
    const props = defineProps<{
        data: sankeyDatas[];
    }>();
    const emit = defineEmits(["sankeyData"]);
    
    const { removeSankeyData } = useSankey();
    const { t } = useI18n();
    const { toast } = useToast();
    const toastMessage = ref('');

    
    const isSheetOpen = ref(false);
    
    const removeSankey = async () => {
        await removeSankeyData();
        emit('sankeyData', []);
        toastMessage.value = t('budget.delete.success');
        toast({
                    description: toastMessage.value,
                });
    }

    const handleSankeyData = (data: sankeyDatas[]) => {
        emit('sankeyData', data);
    };
</script>