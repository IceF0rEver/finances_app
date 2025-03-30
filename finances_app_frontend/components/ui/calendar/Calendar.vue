<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { CalendarRoot, type CalendarRootEmits, type CalendarRootProps, useForwardPropsEmits } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading, CalendarNextButton, CalendarPrevButton } from '.'
import type { subscriptionDatas } from "~/utils/types";
const { calendarCheckDate } = useUtils();


const props = defineProps<CalendarRootProps & { 
  class?: HTMLAttributes['class'],
  subscriptions?: subscriptionDatas[];
 }>()

const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <CalendarRoot
    v-slot="{ grid, weekDays }"
    :class="cn('p-3', props.class)"
    v-bind="forwarded"
  >
    <CalendarHeader>
      <CalendarPrevButton />
      <CalendarHeading />
      <CalendarNextButton />
    </CalendarHeader>

    <div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <CalendarGrid v-for="month in grid" :key="month.value.toString()">
        <CalendarGridHead>
          <CalendarGridRow>
            <CalendarHeadCell
              class="w-full"
              v-for="day in weekDays" :key="day"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody>
          <CalendarGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`" class="mt-2 w-full flex gap-1">
            <CalendarCell
              class="size-full aspect-square relative border border-secondary rounded-md"
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
            >
              <CalendarCellTrigger
                class="size-full aspect-square flex items-start justify-end p-1"
                :day="weekDate"
                :month="month.value"
                />
               <div v-for="(subscription, index) in props.subscriptions?.filter(s => calendarCheckDate(s, weekDate))" 
                  :key="subscription.id" 
                  :style="{ zIndex: 20 - index }"
                  class="absolute w-full bottom-0 flex justify-start p-1 overflow-hidden"
                >
                  <span 
                    :style="{ transform: `translateX(${index * 50}%)`, filter: `brightness(${100 - (index * 20)}%)`,}"
                    class="bg-secondary border border-black rounded-full w-5/12 aspect-square flex items-center justify-center" 
                  >
                    <Icon :name="subscription.icon" class="size-11/12"/>
                  </span>
                </div>
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
