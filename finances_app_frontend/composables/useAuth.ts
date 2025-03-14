import type { userForm, userAuth } from '@/utils/types';

export default function useAuth() {
    const { t } = useI18n();
    const { api, csrf } = useAxios();
    const localePath = useLocalePath();
    const router = useRouter();

    const userAuth = useCookie<userAuth | null>('user-auth');

    async function login(userForm: userForm) {
        return csrf()
            .then(async () => {
                return api.post("/api/login", {
                    email: userForm.email,
                    password: userForm.password,
                }).then(async () => {
                    api.get("/api/user").then(({ data }) => {
                        userAuth.value = data;
                        router.push(localePath('dashboard'));
                    })
                });
            })
            .catch(err => {
                userAuth.value = null;
                // console.log(err.response?.data?.message); 
                return Promise.reject(t('auth.error.message'));
            });
    };
    async function register(userForm: userForm) {
        return csrf()
            .then(() => {
                return api.post("/api/register", {
                    name: userForm.name,
                    email: userForm.email,
                    password: userForm.password,
                    password_confirmation: userForm.password_confirmation,
                });
            })
            .catch(err => {
                // console.log(err.response?.data?.message); 
                return Promise.reject(t('auth.error.message'));
            });
    };
    async function update(userForm: userForm) {
        return csrf()
            .then(async () => {
                return api.patch("/api/user/update", {
                    name: userForm.name,
                    email: userForm.email,
                    password: userForm.password,
                    password_confirmation: userForm.password_confirmation,
                }).then(async () => {
                    api.get("/api/user").then(({ data }) => {
                        userAuth.value = data;
                    })
                    return Promise.resolve(t('auth.success.message'));
                });
            })
            .catch(err => {
                console.log(err.response?.data?.message); 
                return Promise.reject(t('auth.error.message'));
            });
    };
    async function logout() {
        return csrf()
            .then(async () => {
                return api.post("/api/logout").then(() => {
                    userAuth.value = null;
                    router.push(localePath('index'));
                })
                .catch(err => {
                    // console.log(err.response?.data?.message); 
                    return Promise.reject(t('auth.error.message'));
                });
            })
    };
    return { login, register, logout, update };
}