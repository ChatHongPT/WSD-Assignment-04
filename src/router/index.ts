import { createRouter, createWebHistory } from 'vue-router' // 변경된 부분
import SignIn from '@/vue/SignIn.vue';
import Home from "../vue/home.vue";
import Callback from '@/views/Callback.vue'; // Callback.vue로 변경

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Home,
    meta: { requiresAuth: true }, // 인증이 필요한 경우 설정
    children: [
      {
        name: 'HomeMain',
        component: () => import('@/views/home-main.vue'),
        path: '/',
      },
      {
        name: 'HomePopular',
        component: () => import('@/views/home-popular.vue'),
        path: 'popular',
      },
      {
        name: 'HomeWishList',
        component: () => import('@/views/home-wishlist.vue'),
        path: 'wishlist',
      },
      {
        name: 'HomeSearch',
        component: () => import('@/views/home-search.vue'),
        path: 'search',
      },
      {
        name: 'Callback',
        component: () => import('@/views/Callback.vue'),
        path: '/kakaologin/callback',
      }
      
    ]
  },
  {
    path: '/signin',
    name: 'SignIn', // name 추가
    component: SignIn,
  },
  {
    path: '/kakaologin/callback',  // 콜백 URI
    name: 'Callback',              // 이름을 Callback으로 지정
    component: Callback,          // Callback.vue를 연결
  }
]

const router = createRouter({
  history: createWebHistory('/WSD-Assignment-04/'),  // 변경된 부분
  routes
})

router.beforeEach((to, _from, next): void => {
  const isAuthenticated = localStorage.getItem('TMDb-Key') !== null;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // If the route requires authentication and the user is not authenticated
    if (!isAuthenticated) {
      next({ name: 'SignIn' }); // Redirect to the SignIn page
    } else {
      next(); // Proceed to the requested route
    }
  } else {
    // If the user is already authenticated and tries to access the SignIn page
    if (to.name === 'SignIn' && isAuthenticated) {
      next({ name: '/' }); // Redirect to the home page
    }
    else {
      next(); // Proceed to the requested route
    }
  }
});

export default router;
