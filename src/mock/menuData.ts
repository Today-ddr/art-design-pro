import { MenuListType } from '@/types/menu'

export const menuData: MenuListType[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/dashboard',
    meta: {
      title: '首页',
      title_en: 'Dashboard',
      icon: '&#xe721;'
    },
    children: [
      {
        id: 101,
        path: '/dashboard/console',
        meta: {
          title: '工作台',
          title_en: 'Workbench',
          keepAlive: true
        }
      },
      {
        id: 102,
        path: '/dashboard/analysis',
        meta: {
          title: '分析页',
          title_en: 'Analysis',
          keepAlive: true
        }
      }
    ]
  },
  {
    id: 2,
    name: 'User',
    path: '/user',
    meta: {
      title: '用户管理',
      title_en: 'User manguage',
      icon: '&#xe86e;'
    },
    children: [
      {
        id: 301,
        path: '/user/user',
        meta: {
          title: '个人中心',
          title_en: 'User center',
          isHide: true,
          keepAlive: true,
          isHideTab: true
        }
      },
      {
        id: 302,
        path: '/user/account',
        meta: {
          title: '账号管理',
          title_en: 'Account manguage',
          keepAlive: true
        }
      },
      {
        id: 303,
        path: '/user/department',
        meta: {
          title: '部门管理',
          title_en: 'Department manguage',
          keepAlive: true
        }
      },
      {
        id: 304,
        path: '/user/role',
        meta: {
          title: '角色权限',
          title_en: 'Roles',
          keepAlive: true
        }
      }
    ]
  }
]
