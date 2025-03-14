<template>
    <Tabs v-model=TabValue :class="props.isInitSankey ? 'w-[700px]' : ''">
        <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="incomes">
            {{ $t('budget.form.title.incomes')}}
        </TabsTrigger>
        <TabsTrigger value="expenses">
            {{ $t('budget.form.title.expenses')}}
        </TabsTrigger>
        </TabsList>
        <TabsContent value="incomes" >
            <Card :class="props.isInitSankey ? '' : 'border-none shadow-none p-1'">
                <CardHeader :class="props.isInitSankey ? '' : 'p-1'">
                <CardTitle>{{ $t('budget.form.title.incomes')}}</CardTitle>
                <CardDescription>
                    {{ $t('budget.form.description.incomes')}}
                    <Separator class="mt-3"/>
                    <p v-if="errorMessage" class="text-red-500 text-sm pt-2">{{ errorMessage }}</p>
                </CardDescription>
                </CardHeader>
                <CardContent class="grid grid-cols-11 gap-3" :class="props.isInitSankey ? '' : 'p-0'"  v-for="itemIcome in data.filter(i => i.type === 'income')" :key="itemIcome.id">
                <div :class="props.isInitSankey ? 'col-span-5' : 'col-span-6'">
                    <Label for="name">{{ $t('budget.form.label.name')}}</Label>
                    <Input v-model="itemIcome.from" id="name"/>
                </div>
                <div :class="props.isInitSankey ? 'col-span-5' : 'col-span-3'">
                    <Label for="amount">{{ $t('budget.form.label.amount')}}</Label>
                    <Input v-model="itemIcome.amount" id="amount" type="number" />
                </div>
                <div class="flex items-end" :class="props.isInitSankey ? 'col-span-1' : 'col-span-2'" >
                    <Button variant="destructive" @click="remove('category', itemIcome.id)" class="w-full p-2">
                        <Icon name="lucide:trash-2" size="20"/>
                    </Button>
                </div>
                </CardContent>
                <CardFooter :class="props.isInitSankey ? 'flex justify-between' : 'p-2'">
                    <Button :class="props.isInitSankey ? '' : 'w-full'" variant="secondary" @click="add('income')">{{ $t('budget.button.addIncome')}}</Button>
                </CardFooter>
            </Card>
        </TabsContent>
        <TabsContent value="expenses">
            <Card :class="props.isInitSankey ? '' : 'border-none shadow-none'">
                <CardHeader :class="props.isInitSankey ? 'pb-0' : 'p-2'">
                <CardTitle>{{ $t('budget.form.title.expenses')}}</CardTitle>
                <CardDescription>
                    {{ $t('budget.form.description.expenses')}}
                    <Separator class="mt-3"/>
                    <p v-if="errorMessage" class="text-red-500 text-sm pt-2">{{ errorMessage }}</p>
                </CardDescription>
                </CardHeader>
                    <Card :class="props.isInitSankey ? 'm-2' : 'mt-2'" v-for="itemExpenseCategory in data.filter(i => i.type === 'expense' && i.from === 'budget')" :key="itemExpenseCategory.id">
                        <div class="relative">
                            <div class="absolute right-0">
                                <Button class="p-2 rounded-none rounded-bl-md rounded-tr-md" variant="secondary" @click="remove('category', itemExpenseCategory.id), remove('subCategory', itemExpenseCategory.id)"><Icon name="lucide:trash-2" size="20"/></Button>
                            </div>
                        </div>
                        <CardContent class="grid grid-cols-11 gap-3" :class="props.isInitSankey ? 'p-4' : 'p-1'">
                            <div :class="props.isInitSankey ? 'col-span-5' : 'col-span-6'">
                                <Label for="categoryName">{{ $t('budget.form.label.categoryName')}}</Label>
                                <Input  id="categoryName" v-model="itemExpenseCategory.to"/>
                            </div>
                            <div class="col-span-11 row-start-2">
                                <div class="grid grid-cols-11 gap-3" v-for="itemExpense in data.filter(i => i.type === 'expense' && i.from !== 'budget' && i.parent_id === itemExpenseCategory.id)" :key="itemExpense.id">
                                    <div :class="props.isInitSankey ? 'col-span-5' : 'col-span-6'">
                                        <Label for="name">{{ $t('budget.form.label.name')}}</Label>
                                        <Input v-model="itemExpense.to" id="name"/>
                                    </div>
                                    <div :class="props.isInitSankey ? 'col-span-5' : 'col-span-3'">
                                        <Label for="amount">{{ $t('budget.form.label.amount')}}</Label>
                                        <Input v-model="itemExpense.amount" id="amount" type="number" />
                                    </div>
                                    <div :class="props.isInitSankey ? 'col-span-1' : 'col-span-2'" class="flex items-end">
                                        <Button variant="destructive" @click="remove('category', itemExpense.id)" class="w-full p-2">
                                            <Icon name="lucide:trash-2" size="20"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </CardContent>
                        <CardFooter :class="props.isInitSankey ? 'flex justify-between px-4 pb-4' : 'p-2'">
                            <Button :class="props.isInitSankey ? '' : 'w-full'" variant="secondary" @click="add('expense', itemExpenseCategory.id)">{{ $t('budget.button.addExpense')}}</Button>
                        </CardFooter>
                    </Card>
                    <div :class="props.isInitSankey ? 'm-2' : 'my-2'">
                        <Button class="border border-dashed w-full h-[75px]" variant="ghost" @click="add('category')">
                            {{ $t('budget.button.addCategoryExpense')}}
                        </Button>
                    </div>
            </Card>
            <div v-if="props.isInitSankey" class="pt-3 flex justify-end">
                <Button @click="updateSankeyData()">{{ $t('budget.button.sankeyChart')}}</Button>
            </div>
            <div v-if="!props.isInitSankey" class="pt-3 flex justify-end">
                <Button v-if="TabValue==='expenses'" @click="updateSankeyData()">{{ $t('budget.button.saveChange')}}</Button>
            </div>
        </TabsContent>
    </Tabs>
</template>
<script lang="ts" setup>
    import { Separator } from "@/components/ui/separator";
    import { Button } from '@/components/ui/button';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/toast/use-toast'
    import type { sankeyDatas } from "~/utils/types";

    const emit = defineEmits(["sankeyData", "closeSheet", "reloadChart"]);
    const props = defineProps<{
        data?: sankeyDatas[];
        isInitSankey: boolean;
    }>();
    
    const { removeSankeyData, setSankeyData } = useSankey();
    const { t } = useI18n();
    const { toast } = useToast();
    
    let TabValue = ref('incomes');
    let errorMessage = ref('');
    const toastMessage = ref('');

    let data = ref<sankeyDatas[]>([
        {
            id: 1,
            from: "",
            to: "budget",
            amount: 0,
            type: "income",
            parent_id: undefined
        },
    ]);
    if (!props.isInitSankey) {
        data = ref([...(props.data ?? [])]);
    }

    const generateId = (): number => {
        let id : number;
        do {
            id = Math.floor(Math.random() * 10000);
        } while (data.value.some(item => item.id === id));
        return id;
    };

    const add = (type : 'income'|'expense'|'category', parentId ?: number) => {
        switch (type) {
            case 'income':
                data.value.push({ id: Number(generateId()), from: '', to: 'budget', amount: 0, type: 'income', parent_id: undefined });
                break;
            case 'category':
                const id = Number(generateId())
                data.value.push({ id: id, from: 'budget', to: '', amount: 0, type: 'expense', parent_id: undefined });
                break;
            case 'expense':
                if (data.value.find(item => item.id === parentId)){
                    data.value.push({ id: Number(generateId()), from: '', to: '', amount: 0, type: 'expense', parent_id: parentId });
                }
                break;
        }
    };

    const remove = (type: 'category' | 'subCategory', id?: number) => {
        switch (type) {
            case 'category':
                if (data.value.findIndex(item => item.id === id) !== -1) {
                    data.value.splice(data.value.findIndex(item => item.id === id), 1);
                }
                break;
            case 'subCategory':
                data.value = data.value.filter(item => item.parent_id !== id);
                break;
        }
    };

    const updateSankeyData = async () => {
        errorMessage.value = "";
        if ((data.value.length === 0) || ((!data.value.some(item => item.type === 'income')) || (!data.value.some(item => item.type === 'expense')))) {
            errorMessage.value = t('budget.error.input.incomeInput');
            return;
        } else {
            for (const itemData of data.value) {
                if (itemData.from === '' && itemData.parent_id !== undefined) {
                    itemData.from = data.value.find(item => item.id === itemData.parent_id)?.to || '';
                }
                if ((itemData.parent_id === null || itemData.parent_id === undefined) && itemData.type === 'expense' && itemData.from === 'budget') {
                    itemData.amount = data.value.filter(item => item.parent_id === itemData.id).reduce((sum, expense) => sum + expense.amount, 0);
                }
                if ((itemData.from === '' && itemData.type === 'income') || (itemData.to === '' && itemData.type === 'expense')) {
                    errorMessage.value = t('budget.error.input.incomeInput');
                    return;
                }
            }
        }

        if (props.isInitSankey) {
            emit('sankeyData', data.value);
        } else {
            try {
                emit("closeSheet");
                toastMessage.value = t('budget.update.success');
                emit('sankeyData', data.value);
                await removeSankeyData();
                await setSankeyData(data.value);
            } catch {
                toastMessage.value = t('budget.update.error');
            }
            toast({
                    description: toastMessage.value,
                });
        }
    };
</script>