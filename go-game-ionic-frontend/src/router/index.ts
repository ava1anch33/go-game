import { createRouter, createWebHistory } from '@ionic/vue-router'
import TabsPage from '../views/TabsPage.vue'
import Login from '@/views/Login.vue'
import { useAuthStore } from '@/stores'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/go',
            component: TabsPage,
            children: [
                {
                    path: 'analysis',
                    name: 'Analysis',
                    component: () => import('@/views/Analyst.vue'),
                },
                {
                    path: 'setting',
                    name: 'Setting',
                    component: () => import('@/views/Setting.vue'),
                },
                {
                    path: 'ai-game',
                    name: 'AiGame',
                    component: () => import('@/views/AiGame.vue'),
                },
                {
                    path: '',
                    redirect: { name: 'AiGame' },
                },
            ],
            meta: { requiresAuth: true },
        },
    ],
})

router.beforeEach((to, from, next) => {
    const auth = useAuthStore()

    if (to.name === 'login' && auth.hasToken()) {
        next({ name: 'Practice' })
        return
    }

    if (to.meta.requiresAuth && !auth.hasToken()) {
        next({ name: 'Login' })
        return
    }

    next()
})

export default router
