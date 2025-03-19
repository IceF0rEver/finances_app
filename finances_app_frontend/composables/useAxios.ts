import axios from "axios";

export default function useAxios() {

    const rtConfig = useRuntimeConfig()

    let api = axios.create({
        baseURL: rtConfig.public.API_URL,
        withCredentials: true,
        withXSRFToken: true,
    })

    const csrf = async () => {
      await $fetch('sanctum/csrf-cookie', {
        baseURL: rtConfig.public.API_URL,
        method: 'GET',
        credentials: 'include',
      });
    };

    return {
        api, csrf
    }
}

