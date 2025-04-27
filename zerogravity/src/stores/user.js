import { ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const recordStatus = ref({ status: null, emotionRecordState: null })
  const userId = ref(1)
  const userInfo = ref(null)
  const isAuthenticated = ref(false)

  /**
   * User API Controls
   */
  const getUserInfo = async () => {
    try {
      const response = await axios.get('http://api.zerogv.com/api-zerogravity/users/me', { withCredentials: true })
      // 로그인 안한 상태
      if (response.status === 204) {
        console.log('🔓 No content: User not authenticated.')
        isAuthenticated.value = false
      } else {
        console.log('✅ User Info Fetched')
        userInfo.value = response.data
        isAuthenticated.value = true
        console.log(userInfo.value)
      }
    } catch (error) {
      isAuthenticated.value = false
      console.error('😱 Error fetching User Info:', error)
    }
  }

  const checkAuthentication = async () => {
    try {
      await getUserInfo()
    } catch {
      isAuthenticated.value = false
    }
  }

  const logout = async () => {
    try {
      const response = await axios.post('http://api.zerogv.com/api-zerogravity/users/logout', null, { withCredentials: true })
      if (response.status === 204) {
        await checkAuthentication()
        router.push('/')
      }
    } catch (error) {
      console.error('😱 Error during logout:', error)
    }
  }

  const deleteUser = async () => {
    try {
      const response = await axios.delete('http://api.zerogv.com/api-zerogravity/users/me', { withCredentials: true })
      if (response.status === 204) {
        // 로그아웃 처리
        await logout()
      }
    } catch (error) {
      console.error('😱 Error during user deletion:', error)
    }
  }

  watchEffect(() => {
    checkAuthentication()
  })

  /**
   * SessionStorage Controls
   */
  const resetRecordStatusToSession = () => {
    recordStatus.value.status = null
    recordStatus.value.emotionRecordState = null

    sessionStorage.removeItem('recordStatus')
  }

  const saveRecordStatusToSession = () => {
    sessionStorage.setItem('recordStatus', JSON.stringify(recordStatus.value))
  }

  const getRecordStatusToSession = () => {
    const sessionData = sessionStorage.getItem('recordStatus')
    if (sessionData) {
      recordStatus.value = JSON.parse(sessionData)
    }
  }

  return {
    recordStatus,
    userId,
    userInfo,
    isAuthenticated,
    getUserInfo,
    checkAuthentication,
    logout,
    deleteUser,
    resetRecordStatusToSession,
    saveRecordStatusToSession,
    getRecordStatusToSession,
  }
})
