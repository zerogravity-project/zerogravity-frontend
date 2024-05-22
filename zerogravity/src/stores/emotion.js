import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useEmotionStore = defineStore('emotion', () => {
  const emotions = ref([])
  const emotionRecords = ref([])
  const emotionRecord = ref(
    {
      emotionRecordId: '',
      userId: 0,
      emotionReason: '',
      emotionRecordType: '',
      emotionRecordLevel: 0,
      emotionRecordState: '',
      diaryEntry: '',
    })

  const saveEmotionRecordToSession = () => {
    sessionStorage.setItem('emotionRecord', JSON.stringify(emotionRecord.value))
  }

  const getEmotionRecordToSession = () => {
    const sessionData = sessionStorage.getItem('emotionRecord')
    if (sessionData) {
      emotionRecord.value = JSON.parse(sessionData)
    }
  }

  async function getAllEmotions(userId, year, month) {
    try {
      const response = await axios.get(`http://localhost:8080/emotion/${userId}`, {
        params: { year, month },
      })
      emotions.value = response.data
    } catch (error) {
      console.error('Error fetching emotions:', error)
    }
  }

  // 사용자의 감정 전체 데이터 가져오기
  async function getEmotionRecords(userId, year, month) {
    try {
      const response = await axios.get(`http://localhost:8080/api-zerogravity/emotions/records/${userId}`, {
        params: { year, month },
      })
      emotionRecords.value = response.data
    } catch (error) {
      console.error('Error fetching emotions:', error)
    }
  }

  // 사용자의 감정 기록
  async function createEmotionRecord(emotionData) {
    try {
      const response = await axios.post('http://localhost:8080/emotions/records', emotionData)
      console.log('Emotion Record Created:', response.data)
    } catch (error) {
      console.error('Error creating emotion record:', error)
    }
  }

  // 사용자의 감정 업데이트
  async function updateEmotionRecord(emotionRecordId, emotionUpdateData) {
    try {
      const response = await axios.get(`http://localhost:8080/emotions/records/${emotionRecordId}`, emotionUpdateData)
      console.log('Emotion Record Updated:', response.data)
    } catch (error) {
      console.error('Error updating emotion record:', error)
    }
  }

  return {
    emotions, emotionRecords, emotionRecord, getAllEmotions, getEmotionRecords, createEmotionRecord, updateEmotionRecord,
    saveEmotionRecordToSession, getEmotionRecordToSession,
  }
})
