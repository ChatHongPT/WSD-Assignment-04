import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '@/vue/SignIn.vue';
import Home from "@/vue/home.vue";

const routes = [
    {
        path: '/',  // 기본 경로를 '/'로 변경
        name: 'Main',
        component: Home,
        meta: { requiresAuth: true },
        children: [
            { name: 'HomeMain', component: () => import('@/views/home-main.vue'), path: '' },
            { name: 'HomePopular', component: () => import('@/views/home-popular.vue'), path: 'popular' },
            { name: 'HomeWishList', component: () => import('@/views/home-wishlist.vue'), path: 'wishlist' },
            { name: 'HomeSearch', component: () => import('@/views/home-search.vue'), path: 'search' }
        ]
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn,
    },
];

const router = createRouter({
    history: createWebHistory('/WSD-Assignment-04/'),  // createWebHashHistory 대신 createWebHistory 사용
    routes
});

router.beforeEach((to, _from, next) => {
    // TMDb-Key와 isLoggedIn 둘 다 체크
    const isAuthenticated = localStorage.getItem('TMDb-Key') !== null || 
                          localStorage.getItem('isLoggedIn') === 'true';

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({ name: 'SignIn' });
        } else {
            next();
        }
    } else {
        if (to.name === 'SignIn' && isAuthenticated) {
            next({ name: 'Main' });
        } else {
            next();
        }
    }
});

export default router;