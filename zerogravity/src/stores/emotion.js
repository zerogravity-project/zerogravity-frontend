import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useEmotionStore = defineStore('emotion', () => {
  const emotions = ref([])
  const emotionRecords = ref([])
  const emotionRecord = ref(
    {
      emotionRecordId: null,
      userId: null,
      emotionReason: null,
      emotionRecordType: null,
      emotionRecordLevel: null,
      emotionRecordState: null,
      diaryEntry: null,
    })

  const resetEmotionRecordToSession = () => {
    emotionRecord.value =
    {
      emotionRecordId: '',
      userId: 0,
      emotionReason: [],
      emotionRecordType: '',
      emotionRecordLevel: 0,
      emotionRecordState: '',
      diaryEntry: '',
    }

    sessionStorage.removeItem('emotionRecord')
  }

  const saveEmotionRecordToSession = () => {
    sessionStorage.setItem('emotionRecord', JSON.stringify(emotionRecord.value))
  }

  const getEmotionRecordToSession = () => {
    const sessionData = sessionStorage.getItem('emotionRecord')
    if (sessionData) {
      emotionRecord.value = JSON.parse(sessionData)
    }
  }

  async function getAllEmotions(userId, searchDate) {
    try {
      const response = await axios.get(`http://localhost:8080/api-zerogravity/emotion/${userId}`, {
        params: { searchDate },
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
      const allEmotionRecords = response.data

      // 날짜별 그룹핑
      const emotionsByDate = {}
      for (const record of allEmotionRecords) {
        const recordDate = record.createdTime.split('T')[0]
        if (!emotionsByDate[recordDate]) {
          emotionsByDate[recordDate] = []
        }
        emotionsByDate[recordDate].push(record)
      }

      emotionRecords.value = emotionsByDate
      console.log('Emotion Records Fetched: ', emotionRecords.value)
    } catch (error) {
      console.error('Error fetching emotions:', error)
    }
  }

  // 사용자의 감정 기록
  async function createEmotionRecord(emotionData) {
    console.log('yes')
    try {
      const response = await axios.post('http://localhost:8080/api-zerogravity/emotions/records', emotionData)
      console.log('Emotion Record Created:', response)
    } catch (error) {
      console.error('Error creating emotion record:', error)
    }
  }

  // 사용자의 감정 업데이트
  async function updateEmotionRecord(emotionRecordId, emotionUpdateData) {
    try {
      const response = await axios.put(`http://localhost:8080/api-zerogravity/emotions/records/${emotionRecordId}`, emotionUpdateData)
      console.log('Emotion Record Updated:', response)
    } catch (error) {
      console.error('Error updating emotion record:', error)
    }
  }

  return {
    emotions, emotionRecords, emotionRecord, resetEmotionRecordToSession, getAllEmotions, getEmotionRecords, createEmotionRecord, updateEmotionRecord,
    saveEmotionRecordToSession, getEmotionRecordToSession,
  }
})
