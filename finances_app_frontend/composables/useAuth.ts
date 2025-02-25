import type { userForm } from '@/utils/types';

export default function useAuth() {
    const { t } = useI18n();
    const { api, csrf } = useAxios();
    const localePath = useLocalePath();
    const router = useRouter();

    const user = useState('auth-user', () => null);
    const userAuth = useCookie('user-auth');

    async function login(userForm: userForm) {
        return csrf()
            .then(() => {
                return api.post("/login", {
                    email: userForm.email,
                    password: userForm.password,
                }).then(({ data }) => {
                    me();
                })
            })
            .catch(err => {
                // console.log(err.response?.data?.message); 
                return Promise.reject(t('auth.error'));
            });
    };
    async function register(userForm: userForm) {
        return csrf()
            .then(() => {
                return api.post("/register", {
                    name: userForm.name,
                    email: userForm.email,
                    password: userForm.password,
                    password_confirmation: userForm.password_confirmation,
                });
            })
            .catch(err => {
                // console.log(err.response?.data?.message); 
                return Promise.reject(t('auth.error'));
            });
    };
    async function me() {
        return api.get("/api/user").then(({ data }) => {
            user.value = data;
            userAuth.value = data;
            router.push(localePath('dashboard'));
        })
        .catch(err => {
            user.value = null;
            userAuth.value = null;
            // console.log(err.response?.data?.message); 
            return Promise.reject(t('auth.error'));
        });
    };
    async function logout() {
        return api.post("/api/logout").then(() => {
            user.value = null;
            userAuth.value = null;
            router.push(localePath('index'));
        })
        .catch(err => {
            // console.log(err.response?.data?.message); 
            return Promise.reject(t('auth.error'));
        });
    }
    return { login, register, me, logout };
}