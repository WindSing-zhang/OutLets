import { defineStore } from 'pinia'

interface UserInfo {
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

interface UserState {
  userInfo: UserInfo | null
  isLogin: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
    isLogin: false
  }),
  
  getters: {
    getUserInfo(state): UserInfo | null {
      return state.userInfo
    }
  },
  
  actions: {
    setToken(token: string) {
      localStorage.setItem('token', token);
    },

    setUserInfo(info: UserInfo) {
      this.userInfo = info;
      this.isLogin = true;
      // 同时存储到 localStorage
      localStorage.setItem('userInfo', JSON.stringify(info));
    },

    // 从 localStorage 恢复用户信息
    restoreUserInfo() {
      const userInfoStr = localStorage.getItem('userInfo');
      if (userInfoStr) {
        try {
          const userInfo = JSON.parse(userInfoStr);
          this.userInfo = userInfo;
          this.isLogin = true;
        } catch (error) {
          console.error('Failed to restore user info:', error);
        }
      }
    },

    async logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      this.isLogin = false;
      this.userInfo = null;
    }
  }
}) 