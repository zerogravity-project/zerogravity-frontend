import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('counter', () => {
  const recordStatus = ref({status: '', emotionRecordState: ''})

  const resetRecordStatusToSession = () => {
      recordStatus.value.status = ''
      recordStatus.value.emotionRecordState = ''

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

  return { recordStatus, saveRecordStatusToSession, getRecordStatusToSession, resetRecordStatusToSession }
})
