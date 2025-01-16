<template>
  <div class="login">
    <div class="left-wrap">
      <left-view></left-view>
    </div>
    <div class="right-wrap">
      <div class="header">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconsys-zhaopian-copy"></use>
        </svg>
        <h1>{{ systemName }}</h1>
      </div>
      <div class="login-wrap">
        <div class="form">
          <h3 class="title">{{ $t('login.title') }}</h3>
          <p class="sub-title">{{ $t('login.subTitle') }}</p>
          <div class="input-wrap">
            <el-input
              :placeholder="$t('login.placeholder[0]')"
              size="large"
              v-model.trim="username"
            />
          </div>
          <div class="input-wrap">
            <el-input
              :placeholder="$t('login.placeholder[1]')"
              size="large"
              v-model.trim="password"
              type="password"
              radius="8px"
              autocomplete="off"
              @keyup.enter="login"
            />
          </div>
          <div class="drag-verify">
            <div class="drag-verify-content" :class="{ error: !isPassing && isClickPass }">
              <!-- :background="isDark ? '#181818' : '#eee'" -->
              <DragVerify
                ref="dragVerify"
                v-model:value="isPassing"
                :width="width < 500 ? 328 : 438"
                :text="$t('login.sliderText')"
                textColor="var(--art-gray-800)"
                :successText="$t('login.sliderSuccessText')"
                :progressBarBg="getCssVariable('--el-color-primary')"
                background="var(--art-gray-200)"
                handlerBg="var(--art-main-bg-color)"
                @pass="onPass"
              />
            </div>
            <p class="error-text" :class="{ 'show-error-text': !isPassing && isClickPass }">{{
              $t('login.placeholder[2]')
            }}</p>
          </div>

          <div class="forget-password">
            <el-checkbox v-model="rememberPassword">{{ $t('login.rememberPwd') }}</el-checkbox>
            <router-link class="custom-text" to="/forget-password"
              >{{ $t('login.forgetPwd') }}
            </router-link>
          </div>

          <div style="margin-top: 30px">
            <el-button
              class="login-btn"
              size="large"
              type="primary"
              @click="login"
              :loading="loading"
            >
              {{ $t('login.btnText') }}
            </el-button>
          </div>

          <div class="footer">
            <p>
              {{ $t('login.noAccount') }}
              <router-link class="custom-text" to="/register"
                >{{ $t('login.register') }}
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import LeftView from '@/components/Pages/Login/LeftView.vue'
  import { SystemInfo } from '@/config/setting'
  import { ElMessage, ElNotification } from 'element-plus'
  import { useUserStore } from '@/store/modules/user'
  import { HOME_PAGE } from '@/router'
  import { ApiStatus } from '@/utils/http/status'
  import { getCssVariable, getGreeting } from '@/utils/utils'
  import { UserService } from '@/api/usersApi'

  const userStore = useUserStore()
  const router = useRouter()
  const isPassing = ref(false)
  const isClickPass = ref(false)

  const systemName = SystemInfo.name
  const username = ref(SystemInfo.login.username)
  const password = ref(SystemInfo.login.password)
  const loading = ref(false)
  const rememberPassword = ref(true)
  const { width } = useWindowSize()

  const onPass = () => {}

  const login = async () => {
    if (!username.value) {
      ElMessage.error('请输入账号')
      return
    }

    if (!password.value) {
      ElMessage.error('请输入密码')
      return
    }

    if (!isPassing.value) {
      isClickPass.value = true
      return
    }

    loading.value = true

    const params = {
      userAccount: username.value,
      userPassword: password.value
    }

    try {
      //封装 axios 登录，替换掉 .env 中的 VITE_API_URL 为你的 api 地址
      const res = await UserService.login(params)
      console.log(res)
      //登录成功
      if (res.code === ApiStatus.success) {
        const { token, data } = res
        if (res.data) {
          const user = { ...data, token }
          userStore.setUserInfo(user)
          userStore.setLoginStatus(true)
          showLoginSuccessNotice(res.data.username)
          await router.push(HOME_PAGE) // 登录成功后跳转到主页
        }
      } else {
        ElMessage.error('登录失败，' + res.description)
      }
    } finally {
      loading.value = false // 无论成功还是失败，都停止加载
    }
  }

  // 登录成功提示
  const showLoginSuccessNotice = (userName: any) => {
    setTimeout(() => {
      ElNotification({
        title: getGreeting(),
        type: 'success',
        showClose: false,
        duration: 2500,
        zIndex: 10000,
        message: `欢迎登录 ${userName}`
      })
    }, 300)
  }
</script>

<style lang="scss" scoped>
  @use './index';
</style>
