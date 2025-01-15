import type { App } from 'vue'
import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router'
import { useWorktabStore } from '@/store/modules/worktab'
import Home from '@views/index/index.vue'
import { SystemInfo } from '@/config/setting'
import { useUserStore } from '@/store/modules/user'
import { menuService } from '@/api/menuApi'
import { getIframeRoutes, routerMatch } from '@/utils/menu'
import { useMenuStore } from '@/store/modules/menu'
import { useSettingStore } from '@/store/modules/setting'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { isIframe } from '@/utils/utils'
import { useTheme } from '@/composables/useTheme'

// 创建路由守卫参数类型别名
type GuardParams = {
  to: RouteLocationNormalized
  next: NavigationGuardNext
}

// 顶部进度条配置
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 600, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  parent: 'body' //指定进度条的父容器
})

// 路由项扩展
export type AppRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean
}

// 首页
export const HOME_PAGE = '/dashboard/console'

// 不需要权限的路由
const routes = [
  {
    path: '/',
    redirect: HOME_PAGE
  },
  {
    path: '/dashboard',
    component: Home,
    meta: {
      title: '监控中心',
      title_en: 'Dashboard'
    },
    children: [
      {
        path: '/dashboard/console',
        name: 'Console',
        component: () => import(`@views/dashboard/console/index.vue`),
        meta: {
          title: '工作台',
          title_en: 'Workbench',
          keepAlive: false
        }
      },
      {
        path: '/dashboard/analysis',
        name: 'Analysis',
        component: () => import(`@views/dashboard/analysis/index.vue`),
        meta: {
          title: '分析页',
          title_en: 'Analysis',
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@views/login/index.vue'),
    meta: {
      title: '登录',
      isHideTab: true,
      setTheme: true
    }
  },
  {
    path: '/register',
    component: () => import('@views/register/index.vue'),
    meta: {
      title: '注册',
      isHideTab: true,
      noLogin: true,
      setTheme: true
    }
  },
  {
    path: '/forget-password',
    component: () => import('@views/forget-password/index.vue'),
    meta: {
      title: '忘记密码',
      isHideTab: true,
      noLogin: true,
      setTheme: true
    }
  },
  {
    path: '/exception',
    component: Home,
    meta: {
      title: '异常页面',
      title_en: 'Exception'
    },
    children: [
      {
        path: '/exception/403',
        component: () => import('@/views/exception/403.vue'),
        meta: {
          title: '403',
          title_en: '403'
        }
      },
      {
        path: '/exception/404',
        component: () => import('@views/exception/404.vue'),
        meta: {
          title: '404',
          title_en: '404'
        }
      },
      {
        path: '/exception/500',
        component: () => import('@views/exception/500.vue'),
        meta: {
          title: '500',
          title_en: '500'
        }
      }
    ]
  },
  {
    path: '/outside',
    component: Home,
    meta: {
      title: '内嵌页面',
      title_en: 'Outside'
    },
    children: [
      {
        path: '/outside/iframe/:path',
        component: () => import('@/views/outside/Iframe.vue'),
        meta: {
          title: 'iframe',
          title_en: 'iframe'
        }
      }
    ]
  }
] as AppRouteRecordRaw[]

export const router = createRouter({
  history: createWebHashHistory(), // history 模式
  routes: routes, // 路由表
  scrollBehavior: () => ({ left: 0, top: 0 }) // 页面滚动行为
})

// 需要权限的路由
export const roleRoutes: AppRouteRecordRaw[] = [
  {
    path: '/user',
    name: 'User',
    component: Home,
    meta: {
      title: '用户管理'
    },
    children: [
      {
        path: '/user/user',
        name: 'Users',
        component: () => import('@views/user/User.vue'),
        meta: {
          title: '个人中心'
        }
      },
      {
        path: '/user/account',
        name: 'Account',
        component: () => import('@views/user/Account.vue'),
        meta: {
          title: '账号管理'
        }
      },
      {
        path: '/user/department',
        name: 'Department',
        component: () => import('@views/user/Department.vue'),
        meta: {
          title: '部门管理'
        }
      },
      {
        path: '/user/role',
        name: 'Role',
        component: () => import('@views/user/Role.vue'),
        meta: {
          title: '角色权限'
        }
      }
    ]
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Home,
    meta: {
      title: '菜单管理',
      title_en: 'Menu Management'
    },
    children: [
      {
        path: '/menu/menu',
        name: 'Menus',
        component: () => import('@views/menu/Menu.vue'),
        meta: {
          title: '菜单管理',
          title_en: 'Menu Management'
        }
      }
    ]
  }
]

// 是否注册路由
const isRouteRegistered = ref(false)

// 路由跳转前
router.beforeEach(async (to, from, next) => {
  // 显示顶部进度条
  if (useSettingStore().showNprogress) {
    NProgress.start()
  }

  // 设置登录注册页面主题
  setSystemTheme(to)

  // 检查是否登录或者不需要登录
  checkLogin({ to, next })

  // 获取菜单数据，动态注册路由
  if (await handleRegisterRoutes({ to, next })) {
    return
  }

  // 检查路由是否存在
  checkRouteExist({ to, next })

  // 设置标签页
  setWorktab(to)

  // 设置页面标题
  setPageTitle(to)
  next()
})

// 路由跳转完成
router.afterEach(() => {
  // 隐藏顶部进度条
  if (useSettingStore().showNprogress) {
    NProgress.done()
  }
})

// 设置标签页
function setWorktab(to: RouteLocationNormalized) {
  const worktabStore = useWorktabStore()
  const { meta, path, params, query } = to
  const { title, title_en, isHideTab } = meta

  if (!isHideTab) {
    if (isIframe(path)) {
      const iframeRoute = getIframeRoutes().find((route: any) => route.path === to.path)

      if (iframeRoute?.meta) {
        const { title, title_en } = iframeRoute.meta
        worktabStore.router({
          title,
          title_en,
          path,
          params,
          query
        })
      }
    } else {
      worktabStore.router({
        title: title as string,
        title_en: title_en as string,
        path,
        params,
        query
      })
    }
  }
}

// 设置登录注册页面主题
function setSystemTheme(to: RouteLocationNormalized) {
  if (to.meta.setTheme) {
    useTheme().switchTheme(useSettingStore().systemThemeType)
  }
}

// 检查路由是否登录或不需要登录
function checkLogin({ to, next }: GuardParams) {
  const userStore = useUserStore()
  const { meta, path } = to
  const { noLogin } = meta

  if (!userStore.isLogin && path !== '/login' && !noLogin) {
    userStore.logOut()
    next('/login')
    return
  }
}

// 检查路由是否存在
function checkRouteExist({ to, next }: GuardParams) {
  if (to.matched.length === 0) {
    next('/exception/404')
    return
  }
}

// 设置页面标题
function setPageTitle(to: RouteLocationNormalized) {
  const { meta } = to

  if (meta.title) {
    if (meta.title === 'iframe') {
      const title2 = to.path.split('/').pop()
      const decodeTitle = decodeURIComponent(title2 || '')
      document.title = `${decodeTitle} - ${SystemInfo.name}`
    } else {
      document.title = `${meta.title} - ${SystemInfo.name}`
    }
  }
}

// 处理路由注册
async function handleRegisterRoutes({ to, next }: GuardParams) {
  if (!isRouteRegistered.value && useUserStore().isLogin) {
    try {
      await registerRoutes()
      next({ ...to, replace: true })
    } catch (error) {
      console.error('Failed to register routes:', error)
      next('/exception/500')
    }
    return true
  }
  return false
}

// 获取菜单，注册路由
async function registerRoutes(): Promise<void> {
  try {
    // 获取菜单列表
    const { menuList, closeLoading } = await menuService.getMenuList()

    // 判断菜单列表是否为空
    if (!Array.isArray(menuList) || menuList.length === 0) {
      throw new Error('获取菜单列表未空')
    }
    // 菜单列表存储到 pinia
    useMenuStore().setMenuList(menuList as [])
    // 注册路由
    routerMatch(menuList, roleRoutes)
    // 注册完成
    isRouteRegistered.value = true
    // 关闭 loading
    closeLoading()
  } catch (error) {
    console.error('获取菜单列表失败:', error)
    throw error
  }
}

export function initRouter(app: App<Element>) {
  app.use(router)
}
