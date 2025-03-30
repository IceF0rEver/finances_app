import type { userForm, userAuth, userAuthError, sankeyDatas, subscriptionDatas } from '@/utils/types';

export default function useAuth() {
    const { t, locale } = useI18n();
    const { api, csrf } = useAxios();
    const localePath = useLocalePath();
    const router = useRouter();
    const rtConfig = useRuntimeConfig()
    const { start, finish } = useLoadingIndicator();

    const userAuth = useCookie<userAuth | null>('user-auth');
    const userAuthError = useState<userAuthError>('user-auth-error');
    const sankeyData = useState<sankeyDatas[]>('sankey-data');
    const subscriptionData = useState<subscriptionDatas[]>('subscription-data');
    const isOpenInput = useState<boolean>('sankey-is-open-input');
    const isLoadingSubscription = useState<boolean>('is-loading-subscription');
    
    async function login(userForm: userForm) {
        try {
            start();
            await csrf();
            await api.post("/api/login", {
                email: userForm.email,
                password: userForm.password,
            });
            await getUserAuth();
            finish();
            router.push(localePath('dashboard'));
        } catch (error : any) {
            userAuthError.value = error.response?.data?.errors;
            finish();
        }
    };
    async function register(userForm: userForm) {
        try {
            start();
            await csrf();
            await api.post("/api/register", {
                name: userForm.name,
                email: userForm.email,
                password: userForm.password,
                password_confirmation: userForm.password_confirmation,
            });
            finish();
            await getUserAuth();
            router.push(localePath('dashboard'));
        } catch (error : any) {
            userAuthError.value = error.response?.data?.errors;
            finish();
        }
    };

    async function update(userForm: userForm) {
        try {
            start();
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
            finish();
            return Promise.resolve(t('auth.success.message'));
        } catch (error : any) {
            userAuthError.value = error.response?.data?.errors;
            finish();
        }
    };

    async function logout() {
        try {
            await csrf();
            await api.post("/api/logout");
            userAuth.value = null;
            sankeyData.value = [];
            subscriptionData.value = [];
            isOpenInput.value = false;
            isLoadingSubscription.value = false;
            router.push(localePath('index'));
        } catch (error : any) {
            userAuthError.value = error.response?.data?.errors;
        }
    };

    async function getUserAuth() {
        const data = await $fetch<userAuth>('/api/user', {
            baseURL: rtConfig.public.API_URL,
            method: 'GET',
            credentials: 'include',
            headers : {
                'Accept-Language' : locale.value,
              }
        });
        userAuth.value = data;
    };

    return { login, register, logout, update };
}