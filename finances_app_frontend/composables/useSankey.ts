import type { sankeyDatas } from "~/utils/types";
export default function useAuth() {
    const rtConfig = useRuntimeConfig();
    const { t } = useI18n();
    const { api, csrf } = useAxios();
    const localePath = useLocalePath();
    const router = useRouter();
    const { start, finish } = useLoadingIndicator(); 
    const { locale } = useI18n();


    async function getSankeyData() {
        start();
        const { data, pending, error } = await useFetch<sankeyDatas[]>('/api/sankey', {
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

    async function setSankeyData(data: sankeyDatas[]) { 
        try {
            start();
            await csrf();
            await api.post("/api/sankey", { data });
            finish();
        } catch (err : any) {
            finish();
            console.log(err.response?.data?.message);
            // return Promise.reject(t('auth.error.message'));
        }
    };

    async function updateSankeyData(data: sankeyDatas[]) {
        try {
            start();
            await csrf();
            await api.patch("/api/sankey/update", { data });
            finish();
        } catch (err : any) {
            finish();
            console.log(err.response?.data?.message);
            // return Promise.reject(t('auth.error.message'));
        }

    };
    async function removeSankeyData() {
        try {
            start();
            await csrf();
            await api.delete("/api/sankey");
            finish();
        } catch (err : any) {
            finish();
            console.log(err.response?.data?.message);
            // return Promise.reject(t('auth.error.message'));
        }
    };
   
    return { getSankeyData, setSankeyData, removeSankeyData, updateSankeyData };
}