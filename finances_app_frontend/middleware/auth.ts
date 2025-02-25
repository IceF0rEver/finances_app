export default defineNuxtRouteMiddleware((to, from) => {
    const router = useRouter();
    const localePath = useLocalePath();

    const userAuth = useCookie('user-auth');

    if(!userAuth.value) {
        return router.push(localePath('index'));
    }
})