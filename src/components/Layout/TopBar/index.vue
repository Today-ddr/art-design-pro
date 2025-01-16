<template>
  <div class="top-bar" :style="{ width: topBarWidth() }">
    <div class="menu">
      <div class="left" style="display: flex">
        <!-- 系统信息  -->
        <div class="top-header" @click="toHome" v-if="isTopMenu">
          <svg class="svg-icon2" aria-hidden="true">
            <use xlink:href="#iconsys-zhaopian-copy"></use>
          </svg>
          <p v-if="width >= 1300">{{ SystemInfo.name }}</p>
        </div>

        <svg class="svg-icon" aria-hidden="true" @click="toHome()">
          <use xlink:href="#iconsys-zhaopian-copy"></use>
        </svg>
        <!-- 菜单按钮 -->
        <div class="btn-box" v-if="isLeftMenu && showMenuButton">
          <div class="btn menu-btn">
            <i class="iconfont-sys" @click="visibleMenu">&#xe6ba;</i>
          </div>
        </div>
        <!-- 刷新按钮 -->
        <div class="btn-box" v-if="showRefreshButton">
          <div class="btn refresh-btn">
            <i class="iconfont-sys" @click="reload()"> &#xe6b3; </i>
          </div>
        </div>

        <!-- 面包屑 -->
        <breadcrumb
          v-if="showCrumbs && isLeftMenu"
          :style="{ paddingLeft: !showRefreshButton && !showMenuButton ? '10px' : '0' }"
        />

        <!-- 顶部菜单 -->
        <MenuTop v-if="isTopMenu" :list="menuList" :width="menuTopWidth" />

        <!-- 混合菜单-顶部 -->
        <MixedMenu v-if="isTopLeftMenu" :list="menuList" :width="menuTopWidth" />
      </div>

      <div class="right">
        <!-- 通知 -->
        <div class="btn-box notice-btn" @click="visibleNotice">
          <div class="btn notice-button">
            <i class="iconfont-sys notice-btn">&#xe6c2;</i>
            <span class="count notice-btn"></span>
          </div>
        </div>
        <!-- 用户头像、菜单 -->
        <div class="user">
          <el-popover
            ref="userMenuPopover"
            placement="bottom-end"
            :width="210"
            :hide-after="0"
            :offset="20"
            trigger="hover"
            :show-arrow="false"
            popper-class="user-menu-popover"
            popper-style="border: 1px solid var(--art-border-dashed-color); border-radius: calc(var(--custom-radius) / 2 + 4px); padding: 5px 16px; 5px 16px;"
          >
            <template #reference>
              <img class="cover" src="@imgs/user/avatar.png" />
            </template>
            <template #default>
              <div class="user-menu-box">
                <div class="user-head">
                  <img class="cover" src="@imgs/user/avatar.png" style="float: left" />
                  <div class="user-wrap">
                    <span class="name">{{ userInfo.username }}</span>
                  </div>
                </div>
                <ul class="user-menu">
                  <li @click="goPage('/user/user')">
                    <i class="menu-icon iconfont-sys">&#xe734;</i>
                    <span class="menu-txt">{{ $t('topBar.user[0]') }}</span>
                  </li>
                  <li @click="loginOut">
                    <i class="menu-icon iconfont-sys">&#xe780;</i>
                    <span class="menu-txt">{{ $t('topBar.user[1]') }}</span>
                  </li>
                </ul>
              </div>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
    <slot></slot>

    <Notice v-model:value="showNotice" ref="notice" />
  </div>
</template>

<script setup lang="ts">
  import Breadcrumb from '../Breadcrumb/index.vue'
  import Notice from '../Notice/index.vue'
  import MixedMenu from '../MixedMenu/index.vue'
  import { MenuTypeEnum, MenuWidth } from '@/enums/appEnum'
  import { useSettingStore } from '@/store/modules/setting'
  import { useUserStore } from '@/store/modules/user'
  import { ElMessageBox } from 'element-plus'
  import { HOME_PAGE } from '@/router'
  import { useI18n } from 'vue-i18n'
  import mittBus from '@/utils/mittBus'
  import { useMenuStore } from '@/store/modules/menu'
  import { SystemInfo } from '@/config/setting'
  // 切换主题

  const settingStore = useSettingStore()
  const userStore = useUserStore()
  const router = useRouter()

  const showMenuButton = computed(() => settingStore.showMenuButton)
  const showRefreshButton = computed(() => settingStore.showRefreshButton)
  const menuOpen = computed(() => settingStore.menuOpen)
  const showCrumbs = computed(() => settingStore.showCrumbs)
  const userInfo = computed(() => userStore.getUserInfo)
  const showNotice = ref(false)
  const notice = ref(null)
  const showSettingGuide = computed(() => settingStore.showSettingGuide)
  const userMenuPopover = ref()
  const menuList = computed(() => useMenuStore().getMenuList)
  const menuType = computed(() => settingStore.menuType)
  const isLeftMenu = computed(() => menuType.value === MenuTypeEnum.LEFT)
  const isTopMenu = computed(() => menuType.value === MenuTypeEnum.TOP)
  const isTopLeftMenu = computed(() => menuType.value === MenuTypeEnum.TOP_LEFT)
  const { t } = useI18n()

  const { width } = useWindowSize()

  const menuTopWidth = computed(() => {
    return width.value * 0.5
  })

  onMounted(() => {
    document.addEventListener('click', bodyCloseNotice)
  })

  onUnmounted(() => {
    document.removeEventListener('click', bodyCloseNotice)
  })

  const topBarWidth = (): string => {
    if (menuType.value === MenuTypeEnum.TOP) {
      return '100%'
    } else {
      return menuOpen.value
        ? `calc(100% - ${settingStore.getMenuOpenWidth})`
        : `calc(100% - ${MenuWidth.CLOSE})`
    }
  }

  const visibleMenu = () => {
    settingStore.setMenuOpen(!menuOpen.value)
  }

  const goPage = (path: string) => {
    router.push(path)
  }

  const toHome = () => {
    router.push(HOME_PAGE)
  }

  const loginOut = () => {
    closeUserMenu()
    setTimeout(() => {
      ElMessageBox.confirm(t('common.logOutTips'), t('common.tips'), {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        customClass: 'login-out-dialog'
      }).then(() => {
        userStore.logOut()
      })
    }, 200)
  }

  const reload = (time: number = 0) => {
    setTimeout(() => {
      settingStore.reload()
    }, time)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openSetting = () => {
    mittBus.emit('openSetting')

    // 隐藏设置引导
    if (showSettingGuide.value) {
      settingStore.hideSettingGuide()
    }
    // 打开设置引导
    // settingStore.openSettingGuide()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openSearchDialog = () => {
    mittBus.emit('openSearchDialog')
  }

  const bodyCloseNotice = (e: any) => {
    let { className } = e.target

    if (showNotice.value) {
      if (typeof className === 'object') {
        showNotice.value = false
        return
      }
    }
  }

  const visibleNotice = () => {
    showNotice.value = !showNotice.value
  }

  const closeUserMenu = () => {
    setTimeout(() => {
      userMenuPopover.value.hide()
    }, 100)
  }
</script>

<style lang="scss" scoped>
  @use './style';
  @use './mobile';
</style>
