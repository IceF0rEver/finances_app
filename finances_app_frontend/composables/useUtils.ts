import type { subscriptionDatas } from "~/utils/types";

export default function useUtils() {
   
    const calendarCheckDate = (item : subscriptionDatas, dateValue : any) => {
        const execDate = new Date(item.execution_date);
        const valueDate = new Date(dateValue);

        return (execDate.getDate() === valueDate.getDate() && execDate.getMonth() === valueDate.getMonth() && item.recurrence === 'annually') 
        || (execDate.getDate() === valueDate.getDate() && item.recurrence === 'monthly')
    };

    return { calendarCheckDate };
}