import request from '../utils/request'

export interface UserInfo {
  id: number
  phone: string
  nickname: string
  avatar: string
  name: string
  total_growth: number
  growth_percent: number
  can_complete_profile: boolean
  is_profile_completed: boolean
  activity_id: number
}

export interface LoginParams {
  phone: string
  code: string
  activity_id: number
}

export interface LoginResponse {
  token: string
  user_info: UserInfo
}

export const userApi = {
  // 用户登录
  login(data: LoginParams): Promise<LoginResponse> {
    return request({
      url: '/v1/auth/login',
      method: 'post',
      data
    })
  },

  // 获取用户信息
  getUserInfo(): Promise<UserInfo> {
    return request({
      url: '/v1/auth/user/info',
      method: 'get'
    })
  },

  sendSms(data: { phone: string }): Promise<void> {
    return request({
      url: '/v1/auth/sms/send',
      method: 'post',
      data
    })
  },

  //完善用户资料
  completeUserInfo(data: { name: string, remark_phone: string }): Promise<void> {
    return request({
      url: '/v1/auth/user/complete-profile',
      method: 'post',
      data
    })
  }
}
