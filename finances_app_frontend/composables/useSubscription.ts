import type { subscriptionDatas } from "~/utils/types";
export default function useAuth() {
    const rtConfig = useRuntimeConfig();
    const { api, csrf } = useAxios();
    const { start, finish } = useLoadingIndicator(); 
    const { locale } = useI18n();


    async function getSubscriptionData() {
        start();
        const { data, pending, error } = await useFetch<subscriptionDatas[]>('/api/subscription', {
            baseURL: rtConfig.public.API_URL,
            method: 'GET',
            credentials: 'include',
            headers : {
                'Accept-Language' : locale.value,
              }
        });
        finish();
        return { data: data.value, pending, error };
    };

    async function setSubscriptionData(data: subscriptionDatas) { 
        try {
            start();
            await csrf();
            await api.post("/api/subscription", { 
                name : data.name,
                amount : data.amount,
                recurrence : data.recurrence,
                execution_date : data.execution_date,
                icon : data.icon,
             });
            finish();
        } catch (err : any) {
            finish();
            console.log(err.response?.data?.message);
        }
    };

    async function updateSubscriptionData(data: subscriptionDatas) {
        try {
            start();
            await csrf();
            await api.patch("/api/subscription/update/" + data.id, {
                name : data.name,
                amount : data.amount,
                recurrence : data.recurrence,
                execution_date : data.execution_date,
                icon : data.icon,
             });
            finish();
        } catch (err : any) {
            finish();
            console.log(err.response?.data?.message);
        }

    };
    async function removeSubscriptionData(id: string) {
        try {
            start();
            await csrf();
            await api.delete("/api/subscription/" + id);
            finish();
        } catch (err : any) {
            finish();
            console.log(err.response?.data?.message);
        }
    };
   
    return { getSubscriptionData, setSubscriptionData, updateSubscriptionData, removeSubscriptionData };
}