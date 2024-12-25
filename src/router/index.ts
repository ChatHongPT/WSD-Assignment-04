import { createRouter, createWebHashHistory } from 'vue-router';
import SignIn from '@/vue/SignIn.vue';
import Home from "@/vue/home.vue";

const routes = [
    {
        path: '/WSD-Assignment-04/',
        name: 'Main',
        component: Home,
        meta: { requiresAuth: true },
        children: [
            { name: 'HomeMain', component: () => import('@/views/home-main.vue'), path: '/' },
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
    history: createWebHashHistory('/WSD-Assignment-04/'),
    routes
});

router.beforeEach((to, _from, next) => {
    const isAuthenticated = localStorage.getItem('TMDb-Key') !== null;

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
