import type { sankeyDatas } from "~/utils/types";
export default function useAuth() {
    const rtConfig = useRuntimeConfig();
    const { t } = useI18n();
    const { api, csrf } = useAxios();
    const localePath = useLocalePath();
    const router = useRouter();


    async function getSankeyData() {
        const { data, pending, error } = await useFetch('/api/sankey', {
            baseURL: rtConfig.public.API_URL,
            method: 'GET',
            credentials: 'include'
        });
        return data.value;
    };

    async function setSankeyData(data: sankeyDatas[]) {
        try {
            await csrf();
            await api.post("/api/sankey", { data });
        } catch (err : any) {
            console.log(err.response?.data?.message);
            // return Promise.reject(t('auth.error.message'));
        }
    };

    async function updateSankeyData(data: sankeyDatas[]) {
        try {
            await csrf();
            await api.patch("/api/sankey/update", { data });
        } catch (err : any) {
            console.log(err.response?.data?.message);
            // return Promise.reject(t('auth.error.message'));
        }
    };
    async function removeSankeyData() {
        try {
            await csrf();
            await api.delete("/api/sankey");
        } catch (err : any) {
            console.log(err.response?.data?.message);
            // return Promise.reject(t('auth.error.message'));
        }
    };
   
    return { getSankeyData, setSankeyData, removeSankeyData, updateSankeyData };
}