import {RouteRecordRaw} from "vue-router"
// import home from '@/views/layout-home/layout-home.vue'
import layout from "@/views/base-layout/base-layout.vue"
const routes:Array<RouteRecordRaw> = [
    {
        path:'/',
        redirect:{name:"home"},
        component:layout,
        children:[
            {
            path:'/home',
            name:'home',
            component:() => import('@/views/layout-home/layout-home.vue'),
            meta:{name:'首页',icon:'icon-home', requiresAuth: false }
            },
            {
            path:'/repository',
            name:'repository',
            component:() => import('@/views/layout-home/layout-home.vue'),
                meta: { name: '仓库', icon: 'icon-ziliaoku', requiresAuth: false }
            },
            {
            path:'/reference',
            name:'reference',
            component:() => import('@/views/layout-home/layout-home.vue'),
                meta: { name: '参考资料', icon: 'icon-daohang', requiresAuth: false }
            },
            {
            path:'/authority',
            name:'authority',
            component:() => import('@/views/layout-home/layout-home.vue'),
                meta: { name: '用户管理', icon: 'icon-yonghuguanli', requiresAuth: false }
            },
            {
                path:'/setting',
                name:'setting',
                redirect:{name:'theme'},
                component:()=>import('@/views/layout-setting/layout-setting.vue'),
                meta: { name: '设置', icon: 'icon-shezhi-xianxing', requiresAuth: false },
                children:[
                    {
                        path:'/setting/theme',
                        name:'theme',
                        component:()=>import('@/components/setting-theme.vue')
                    },
                    {
                        path:'/setting/myinfo',
                        name:'myinfo',
                        component:()=>import('@/views/layout-setting/layout-setting-myinfo.vue')
                    }
                ]
            }]
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('@/views/base-login/base-login.vue')
    }
    
]
export default routes