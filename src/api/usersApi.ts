import request from '@/utils/http'
import { BaseResult } from '@/types/axios'
import { LoginParams } from './model/loginModel'

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
}
