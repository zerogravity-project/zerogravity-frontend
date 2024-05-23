import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userId = ref(1)
  const recordStatus = ref({status: null, emotionRecordState: null})

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
    if(sessionData) {
      recordStatus.value = JSON.parse(sessionData)
    }
  }

  return { userId, recordStatus, saveRecordStatusToSession, getRecordStatusToSession, resetRecordStatusToSession }
})
