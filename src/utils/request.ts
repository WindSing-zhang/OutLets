import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { showToast } from '@nutui/nutui'
import { useUserStore } from '@/stores/user'
import router from '@/router'
// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: 'https://outlets.pluss.top/api', // 从环境变量获取基础URL
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在这里可以添加token等认证信息
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    if (data.code === 401) {
      const userStore = useUserStore()
      // 清除用户信息和token
      userStore.logout()
      // 显示提示
      showToast.fail(data.message)
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('未授权，请重新登录'))
    }
    // 这里可以根据后端的数据结构进行调整
    if (data.code === 200) {
      return data.data
    } else {
      showToast.fail(data.message || '请求失败')
      return Promise.reject(new Error(data.message || '请求失败'))
    }
  },
  (error) => {
    console.error('响应错误：', error)
    const message = error.response?.data?.message || '网络错误'
    showToast.fail(message)
    return Promise.reject(error)
  }
)

export default service 