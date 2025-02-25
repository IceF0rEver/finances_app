import axios from "axios";

export default function useAxios() {

    const rtConfig = useRuntimeConfig()

    let api = axios.create({
        baseURL: rtConfig.public.API_URL,
        withCredentials: true,
        withXSRFToken: true,
    })

    const csrf = async () => {
      try {
        await api.get('sanctum/csrf-cookie');
        // console.log('CSRF token récupéré et stocké dans les cookies.');
      } catch (error) {
        console.error('Erreur lors de la récupération du CSRF token:', error);
      }
    }

    return {
        api, csrf
    }
}

