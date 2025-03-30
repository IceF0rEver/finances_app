<template>
    <div class="relative">
        <div class="absolute z-10 right-0">
            <div class="flex items-start p-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" class="rounded-lg p-2">
                            <Icon name="lucide:more-vertical" size="18" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent :align="'end'">
                        <DropdownMenuItem @click="isSheetOpen = true">
                            <Icon name="lucide:pencil" size="18" class="mr-2" />
                            {{ $t('budget.button.edit') }}
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="isDeleteOpen = true" class="text-destructive focus:text-destructive">
                            <Icon name="lucide:trash-2" size="18" class="mr-2" />
                            {{ $t('budget.button.delete') }}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Sheet v-model:open="isSheetOpen" class="z-50">
            <SheetContent class="p-2 overflow-y-auto">
                <SheetHeader class="p-2">
                    <SheetTitle>{{ $t('budget.update.title') }}</SheetTitle>
                    <SheetDescription>
                        {{ $t('budget.update.description') }}
                        <Separator class="my-2" />
                    </SheetDescription>
                </SheetHeader>
                <div>
                    <BudgetManageChart :isInitSankey="false" :data="props.data" @closeSheet="isSheetOpen = false" />
                </div>
            </SheetContent>
            </Sheet>
    
            <AlertDialog :open="isDeleteOpen" @update:open="isDeleteOpen = $event">
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{{ $t('budget.delete.title') }}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {{ $t('budget.delete.description') }}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel @click="isDeleteOpen = false">{{ $t('budget.delete.back') }}</AlertDialogCancel>
                        <AlertDialogAction @click="removeSankey()">{{ $t('budget.delete.confirm') }}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    </div>
</template>  
<script lang="ts" setup>
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle} from '@/components/ui/alert-dialog';
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/toast/use-toast';
import type { sankeyDatas } from "~/utils/types";

const emit = defineEmits(["change"]);
const props = defineProps<{
    data: sankeyDatas[];
}>();

const isOpenInput = useState<boolean>('sankey-is-open-input');

const { removeSankeyData } = useSankey();
const { t } = useI18n();
const { toast } = useToast();

const toastMessage = ref('');
const isSheetOpen = ref(false);
const isDeleteOpen = ref(false);

const removeSankey = async () => {
    try {
        await removeSankeyData();
        isOpenInput.value = true;
        props.data.length = 0;
        isDeleteOpen.value = false;
        toastMessage.value = t('budget.delete.success');
    } catch {
        toastMessage.value = t('budget.delete.error');
    }
    toast({
        description: toastMessage.value,
    });
};
</script>
  
  