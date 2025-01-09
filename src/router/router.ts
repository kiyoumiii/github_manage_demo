import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routes from './routes'
import { useUserStore } from '@/store/userStore'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const token = userStore.token
    const userInfo = userStore.userInfo

    if (to.meta.requiresAuth) {
        // 需要验证 token 的路由
        if (token) {
            if (to.name === 'login') {
                if (userInfo.userName) {
                    next({ path: '/' })
                } else {
                    userStore.getUserInfo().then(() => {
                        next()
                    }).catch(() => {
                        next('/login')
                    })
                }
            } else {
                if (!userInfo.userName) {
                    userStore.getUserInfo().then(() => {
                        next()
                    }).catch(() => {
                        next('/login')
                    })
                } else {
                    next()
                }
            }
        } else {
            if (to.name === 'login') {
                next()
            } else {
                next({ name: 'login' })
            }
        }
    } else {
        // 不需要验证 token 的路由
        next()
    }
})

console.log(Object.prototype.toString.call(routes))

export default router