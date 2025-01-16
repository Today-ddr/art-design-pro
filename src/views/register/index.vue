<template>
  <div class="login register">
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
          <h3 class="title">{{ $t('register.title') }}</h3>
          <p class="sub-title">{{ $t('register.subTitle') }}</p>
          <el-form ref="formRef" :model="formData" :rules="rules" label-position="top">
            <el-form-item prop="username">
              <el-input
                v-model.trim="formData.username"
                :placeholder="$t('register.placeholder[3]')"
                size="large"
              />
            </el-form-item>

            <el-form-item prop="userAccount">
              <el-input
                v-model.trim="formData.userAccount"
                :placeholder="$t('register.placeholder[0]')"
                size="large"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model.trim="formData.userPassword"
                :placeholder="$t('register.placeholder[1]')"
                size="large"
                type="password"
                autocomplete="off"
              />
            </el-form-item>

            <el-form-item prop="checkPassword">
              <el-input
                v-model.trim="formData.checkPassword"
                :placeholder="$t('register.placeholder[2]')"
                size="large"
                type="password"
                autocomplete="off"
                @keyup.enter="register"
              />
            </el-form-item>

            <el-form-item prop="agreement">
              <el-checkbox v-model="formData.agreement">
                {{ $t('register.agreeText') }}
                <router-link
                  class="custom-text"
                  style="color: var(--main-color); text-decoration: none"
                  to="/privacy-policy"
                  >{{ $t('register.privacyPolicy') }}
                </router-link>
              </el-checkbox>
            </el-form-item>

            <div style="margin-top: 15px">
              <el-button
                class="register-btn"
                size="large"
                type="primary"
                @click="register"
                :loading="loading"
              >
                {{ $t('register.submitBtnText') }}
              </el-button>
            </div>

            <div class="footer">
              <p>
                {{ $t('register.hasAccount') }}
                <router-link class="custom-text" to="/login"
                  >{{ $t('register.toLogin') }}
                </router-link>
              </p>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import LeftView from '@/components/Pages/Login/LeftView.vue'
  import { SystemInfo } from '@/config/setting'
  import type { FormInstance, FormRules } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import { useI18n } from 'vue-i18n'
  import { UserService } from '@/api/usersApi'
  import { ApiStatus } from '@/utils/http/status'

  const { t } = useI18n()

  const router = useRouter()
  const formRef = ref<FormInstance>()

  const systemName = SystemInfo.name
  const loading = ref(false)

  const formData = reactive({
    userAccount: '',
    userPassword: '',
    checkPassword: '',
    username: '',
    agreement: false
  })

  const validatePass = (rule: any, value: string, callback: any) => {
    if (value === '') {
      callback(new Error(t('register.placeholder[1]')))
    } else {
      if (formData.checkPassword !== '') {
        formRef.value?.validateField('checkPassword')
      }
      callback()
    }
  }

  const validatePass2 = (rule: any, value: string, callback: any) => {
    if (value === '') {
      callback(new Error(t('login.rule[0]')))
    } else if (value !== formData.userPassword) {
      callback(new Error(t('login.rule[1]')))
    } else {
      callback()
    }
  }

  const rules = reactive<FormRules>({
    userAccount: [
      { required: true, message: t('register.placeholder[0]'), trigger: 'blur' },
      { min: 4, max: 20, message: t('login.rule[2]'), trigger: 'blur' }
    ],
    password: [
      { required: true, validator: validatePass, trigger: 'blur' },
      { min: 8, message: t('login.rule[3]'), trigger: 'blur' }
    ],
    checkPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
    agreement: [
      {
        validator: (rule: any, value: boolean, callback: any) => {
          if (!value) {
            callback(new Error(t('login.rule[4]')))
          } else {
            callback()
          }
        },
        trigger: 'change'
      }
    ]
  })
  const toLogin = () => {
    setTimeout(() => {
      router.push('/login')
    }, 1000)
  }

  const register = async () => {
    if (!formRef.value) return

    try {
      //获取参数
      const params = {
        userAccount: formData.userAccount,
        userPassword: formData.userPassword,
        checkPassword: formData.checkPassword,
        username: formData.username
      }

      await formRef.value.validate()
      loading.value = true
      console.log(params)

      const res = await UserService.userRegister(params)
      console.log(res)
      //登录成功
      if (res.code === ApiStatus.success) {
        loading.value = false
        ElMessage.success('注册成功')
        toLogin()
      } else {
        ElMessage.error('登录失败，' + res.description)
      }
    } catch (error) {
      console.log('验证失败', error)
    } finally {
      loading.value = false // 无论成功还是失败，都停止加载
    }
  }
</script>

<style lang="scss" scoped>
  @use '../login/index' as login;
  @use './index' as register;
</style>
