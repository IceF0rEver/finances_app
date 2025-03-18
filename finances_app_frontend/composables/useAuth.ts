import type { userForm, userAuth } from '@/utils/types';

export default function useAuth() {
    const { t } = useI18n();
    const { api, csrf } = useAxios();
    const localePath = useLocalePath();
    const router = useRouter();
    const rtConfig = useRuntimeConfig()

    const userAuth = useCookie<userAuth | null>('user-auth');
    
    async function login(userForm: userForm) {
        try {
            await csrf();
            await api.post("/api/login", {
                email: userForm.email,
                password: userForm.password,
            });
            await getUserAuth();
            router.push(localePath('dashboard'));
        } catch (err) {
            return Promise.reject(t('auth.error.message'));
        }
    };
    async function register(userForm: userForm) {
        try {
            await csrf();
            await api.post("/api/register", {
                name: userForm.name,
                email: userForm.email,
                password: userForm.password,
                password_confirmation: userForm.password_confirmation,
            });
            router.push(localePath('index'));
        } catch (err) {
            return Promise.reject(t('auth.error.message'));
        }
    };

    async function update(userForm: userForm) {
        try {
            await csrf();
            await api.patch("/api/user/update", {
                name: userForm.name,
                email: userForm.email,
                password: userForm.password,
                password_confirmation: userForm.password_confirmation,
            });
            if (userAuth.value) {
                userAuth.value.name = userForm.name;
                userAuth.value.email = userForm.email;
            }
            return Promise.resolve(t('auth.success.message'));
        } catch (err) {
            return Promise.reject(t('auth.error.message'));
        }
    };

    async function logout() {
        try {
            await csrf();
            await api.post("/api/logout");
            userAuth.value = null;
            router.push(localePath('index'));
        } catch (err) {
            return Promise.reject(t('auth.error.message'));
        }
    };

    async function getUserAuth() {
        const data = await $fetch<userAuth>('/api/user', {
            baseURL: rtConfig.public.API_URL,
            credentials: 'include'
        });
        userAuth.value = data;
    };

    return { login, register, logout, update };
}