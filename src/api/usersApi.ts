import request from '@/utils/http'
import { BaseResult } from '@/types/axios'
import { LoginParams, RegisterParams } from './model/loginModel'

export class UserService {
  // 登录
  static login(params: LoginParams) {
    return request.post<BaseResult>({
      url: '/api/user/login',
      params
    })
  }

  // 退出登录
  static loginOut() {
    return request.post<BaseResult>({
      url: '/api/user/logout'
    })
  }

  // 注册用户
  static userRegister(params: RegisterParams) {
    return request.post<BaseResult>({
      url: '/api/user/register',
      params
    })
  }
}
