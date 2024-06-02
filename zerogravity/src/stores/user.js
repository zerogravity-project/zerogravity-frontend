import { ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const recordStatus = ref({ status: null, emotionRecordState: null })
  const userId = ref(1)
  const user = ref(null)
  const isAuthenticated = ref(false)

  /**
   * User API Controls
   */
  const getProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api-zerogravity/users/profile', { withCredentials: true })
      console.log('✅ User Info Fetched')
      user.value = response.data
      isAuthenticated.value = true
      console.log(user.value)
    } catch (error) {
      isAuthenticated.value = false
      console.error('😱 Error fetching User Info:', error)
    }
  }

  watchEffect(() => {
    // console.log(document.cookie.includes('token'))
    getProfile()
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
    user,
    isAuthenticated,
    getProfile,
    resetRecordStatusToSession,
    saveRecordStatusToSession,
    getRecordStatusToSession,
  }
})
