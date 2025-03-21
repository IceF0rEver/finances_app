import axios from "axios";

export default function useAxios() {

    const rtConfig = useRuntimeConfig();
    const { locale } = useI18n();
    
    let api = axios.create({
        baseURL: rtConfig.public.API_URL,
        withCredentials: true,
        withXSRFToken: true,
        headers : {
          'Accept-Language' : locale.value,
        }
    })

    const csrf = async () => {
      await $fetch('sanctum/csrf-cookie', {
        baseURL: rtConfig.public.API_URL,
        method: 'GET',
        credentials: 'include',
        headers : {
          'Accept-Language' : locale.value,
        }
      });
    };

    return {
        api, csrf
    }
}

