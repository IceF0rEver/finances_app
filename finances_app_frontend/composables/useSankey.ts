import type { sankeyDatas } from "~/utils/types";
export default function useAuth() {
    const { t } = useI18n();
    const { api, csrf } = useAxios();
    const localePath = useLocalePath();
    const router = useRouter();


    async function getSankeyData() {
        return csrf()
            .then(() => {
                return api.get("/api/sankey");
            })
            .catch(err => {
                console.log(err.response?.data?.message); 
                // return Promise.reject(t('auth.error.message'));
            });
    };

    async function setSankeyData(data: sankeyDatas[]) {
        return csrf()
            .then(() => {
                return api.post("/api/sankey", { data });
            })
            .catch(err => {
                console.log(err.response?.data?.message); 
                // return Promise.reject(t('auth.error.message'));
            });
    };
    async function removeSankeyData() {
        return csrf()
            .then(() => {
                return api.delete("/api/sankey");
            })
            .catch(err => {
                console.log(err.response?.data?.message); 
                // return Promise.reject(t('auth.error.message'));
            });
    };
   
    return { getSankeyData, setSankeyData, removeSankeyData };
}