import { ref, computed, watch, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useEmotionStore = defineStore('emotion', () => {
  // 추가하기 위한 레코드
  const emotions = ref([])
  const emotionRecords = ref([])
  const emotionWeeklyRecord = ref([])
  const emotionRecord = ref({
    emotionRecordId: '',
    emotionReason: [],
    emotionRecordType: '',
    emotionRecordLevel: 0,
    emotionRecordState: '',
    diaryEntry: '',
    createdTime: '',
  })

  const getWeekOfMonth = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const dayOfWeek = firstDayOfMonth.getDay()
    const dayOfMonth = date.getDate()
    const adjustedDayOfMonth = dayOfMonth + dayOfWeek
    return Math.ceil(adjustedDayOfMonth / 7)
  }

  const getAdjustedWeekOfMonth = (date) => {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay())
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    return Math.ceil((date.getDate() + firstDayOfWeek) / 7)
  }

  // 오늘 날짜 데이터
  const todayDate = ref(new Date())
  const todayDay = computed(() => todayDate.value.getDate())
  const todayWeekDay = computed(() => todayDate.value.getDay())
  const todayMonth = computed(() => todayDate.value.getMonth())
  const todayYear = computed(() => todayDate.value.getFullYear())
  const todayMonthRecords = ref([])
  const todayEmotionRecords = ref([])
  const todayMainEmotion = ref(null)
  const todayMomentEmotions = ref(null)
  const todayFormattedDate = computed(() => todayDate.value.toISOString().split('T')[0])

  // 선택된 날짜 데이터
  const selectedDate = ref(todayDate.value)
  const selectedDateNum = computed(() => selectedDate.value.getDate())
  const selectedYear = ref(selectedDate.value.getFullYear())
  const selectedMonth = ref(selectedDate.value.getMonth())
  const selectedWeek = ref(getAdjustedWeekOfMonth(selectedDate.value))
  const selectedDateText = computed(() => `${selectedYear.value}년 ${selectedMonth.value + 1}월 ${selectedDateNum.value}일`)
  const selectedFormattedDate = computed(() => selectedDate.value.toISOString().split('T')[0])

  const selectedWeeklyRecords = ref([])
  const selectedMonthRecords = ref([])
  const selectedEmotionRecords = ref([])

  const selectedMainEmotion = computed(() => {
    return selectedEmotionRecords.value.find(emotion => emotion.emotionRecordState === 'main') || null
  })

  const selectedMomentEmotions = computed(() => {
    return selectedEmotionRecords.value.filter(emotion => emotion.emotionRecordState === 'moment') || null
  })

  const selectedWeeklyMainEmotion = computed(() => {
    return Array.isArray(selectedWeeklyRecords.value)
      ? selectedWeeklyRecords.value.filter(emotion => emotion.emotionRecordState === 'main')
      : null
  })

  const selectedWeeklyMomentEmotion = computed(() => {
    return Array.isArray(selectedWeeklyRecords.value)
      ? selectedWeeklyRecords.value.filter(emotion => emotion.emotionRecordState === 'moment')
      : null
  })

  const getWeekDates = (date) => {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - (date.getDay() || 7))
    const dates = []
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(startOfWeek)
      newDate.setDate(startOfWeek.getDate() + i)
      dates.push(newDate)
    }
    return dates
  }

  const todayWeekDates = computed(() => getWeekDates(todayDate.value))
  const selectedWeekDates = computed(() => getWeekDates(selectedDate.value))
  // 만약 달이 바뀐다면 다시 불러와야함
  watch(selectedMonth, async () => {
    selectedMonthRecords.value = await getEmotionRecords(selectedYear.value, selectedMonth.value + 1)
  }, { immediate: true })

  watch(selectedDate, async () => {
    selectedEmotionRecords.value = selectedMonthRecords.value?.[selectedFormattedDate.value] || []
    selectedWeek.value = getAdjustedWeekOfMonth(selectedDate.value)

    const period = 'weekly'
    const searchDate = formatDateToCustomString(selectedDate.value)
    selectedWeeklyRecords.value = await getWeeklyEmotionRecord(period, searchDate)
  })

  watchEffect(async () => {
    todayMonthRecords.value = await getEmotionRecords(todayYear.value, todayMonth.value + 1)
    todayEmotionRecords.value = todayMonthRecords.value?.[todayFormattedDate.value] || []
    todayMainEmotion.value = todayEmotionRecords.value.find(emotion => emotion.emotionRecordState === 'main') || null
    todayMomentEmotions.value = todayEmotionRecords.value.filter(emotion => emotion.emotionRecordState === 'moment') || null
  })
  /**
   * 시간 관리
   */
  // 타임스탬프 만드는 함수 (POST & PUT)
  const formatDateToTimestamp = (date) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`
  }

  const formatDateToCustomString = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
  /**
   * SessionStorage Controls
   */
  const saveEmotionRecordToSession = () => {
    sessionStorage.setItem('emotionRecord', JSON.stringify(emotionRecord.value))
  }

  const getEmotionRecordToSession = () => {
    const sessionData = sessionStorage.getItem('emotionRecord')
    if (sessionData) {
      emotionRecord.value = JSON.parse(sessionData)
    }
  }

  const resetEmotionRecordToSession = () => {
    emotionRecord.value = {
      emotionRecordId: '',
      userId: 0,
      emotionReason: [],
      emotionRecordType: '',
      emotionRecordLevel: 0,
      emotionRecordState: '',
      diaryEntry: '',
      createdTime: '',
    }

    sessionStorage.removeItem('emotionRecord')
  }
  /**
   * 감정 데이터 관리
   */
  const groupEmotionByDate = (allEmotionRecords) => {
    const emotionsByDate = {}
    for (const record of allEmotionRecords) {
      const recordDate = record.createdTime.split('T')[0]
      if (!emotionsByDate[recordDate]) {
        emotionsByDate[recordDate] = []
      }
      emotionsByDate[recordDate].push(record)
    }

    const sortedKeys = Object.keys(emotionsByDate).sort()

    const sortedEmotionsByDate = {}
    for (const key of sortedKeys) {
      sortedEmotionsByDate[key] = emotionsByDate[key]
    }

    return sortedEmotionsByDate
  }
  /**
 * API Controls
 */
  // 사용자의 감정 전체 데이터 가져오기
  async function getEmotionRecords(year, month) {
    try {
      const response = await axios.get('/emotions/records', {
        params: { year, month },
      })
      console.log('✅ Emotion Records Fetched: ', emotionRecords.value)
      const allEmotionRecords = response.data
      const groupedEmotion = groupEmotionByDate(allEmotionRecords)

      return groupedEmotion
    } catch (error) {
      console.error('😱 Error fetching emotions:', error)
      return {}
    }
  }
  // 사용자의 감정 기록
  async function createEmotionRecord(emotionData) {
    try {
      const response = await axios.post('/emotions/records', emotionData)
      console.log('✅ Emotion Record Created:', response)

      await refreshEmotionRecords()
    } catch (error) {
      console.error('😱 Error creating emotion record:', error)
    }
  }
  // 사용자의 감정 업데이트
  async function updateEmotionRecord(emotionRecordId, emotionUpdateData) {
    try {
      const response = await axios.put(`/emotions/records/${emotionRecordId}`, emotionUpdateData)
      console.log('✅ Emotion Record Updated:', response)
      await refreshEmotionRecords()
    } catch (error) {
      console.error('😱 Error updating emotion record:', error)
    }
  }

  async function refreshEmotionRecords() {
    // 선택된 월의 감정 기록을 다시 불러오기
    selectedMonthRecords.value = await getEmotionRecords(selectedYear.value, selectedMonth.value + 1)
  }

  async function getWeeklyEmotionRecord(period, searchDate) {
    try {
      const response = await axios.get('/chart/count', {
        params: { period, searchDate },
      })
      console.log('✅ Weekly Record Updated:', response)
      const allWeeklyEmotion = response.data
      return Array.isArray(allWeeklyEmotion) ? allWeeklyEmotion : []
    } catch (error) {
      console.error('Error fetching chart:', error)
      return []
    }
  }

  const getPreviousWeek = async () => {
    const newDate = new Date(selectedDate.value)
    newDate.setDate(newDate.getDate() - 7)
    // newDate.setHours(12, 0, 0, 0)

    const period = 'weekly'
    const searchDate = formatDateToCustomString(newDate)
    selectedWeeklyRecords.value = await getWeeklyEmotionRecord(period, searchDate)

    selectedDate.value = newDate
    selectedWeek.value = getAdjustedWeekOfMonth(newDate)
    updateMonthAndYear(newDate)
  }

  const getNextWeek = async () => {
    const newDate = new Date(selectedDate.value)
    newDate.setDate(newDate.getDate() + 7)
    // newDate.setHours(12, 0, 0, 0)

    const period = 'weekly'
    const searchDate = formatDateToCustomString(newDate)
    selectedWeeklyRecords.value = await getWeeklyEmotionRecord(period, searchDate)

    selectedDate.value = newDate
    selectedWeek.value = getAdjustedWeekOfMonth(newDate)
    updateMonthAndYear(newDate)
  }

  const updateMonthAndYear = (date) => {
    selectedYear.value = date.getFullYear()
    selectedMonth.value = date.getMonth()
  }

  const filteredMainEmotions = computed(() => {
    if (!selectedDate.value) {
      return []
    }

    const filteredEmotions = selectedWeeklyMainEmotion.value.filter(emotion => {
      const emotionDate = new Date(emotion.createdTime)
      return emotionDate.getMonth() === selectedDate.value.getMonth() &&
        emotionDate.getDate() === selectedDate.value.getDate()
    })

    if (filteredEmotions.length === 0) {
      return [{ createdTime: selectedDate.value.toISOString(), emotionRecordType: '', emotionRecordLevel: 0, emotionReason: '[]' }]
    }

    return filteredEmotions
  })

  return {
    emotions,
    emotionRecords,
    emotionRecord,
    todayDate,
    todayDay,
    todayWeekDay,
    todayMainEmotion,
    todayMonth,
    todayYear,
    selectedDate,
    selectedYear,
    selectedMonth,
    selectedWeek,
    selectedDateText,
    selectedEmotionRecords,
    selectedWeeklyRecords,
    emotionWeeklyRecord,
    selectedMainEmotion,
    selectedMomentEmotions,
    selectedWeeklyMainEmotion,
    selectedWeeklyMomentEmotion,
    selectedMonthRecords,
    selectedWeekDates,
    todayWeekDates,
    getWeekOfMonth,
    formatDateToTimestamp,
    resetEmotionRecordToSession,
    getEmotionRecords,
    createEmotionRecord,
    updateEmotionRecord,
    getEmotionRecordToSession,
    saveEmotionRecordToSession,
    getWeeklyEmotionRecord,
    getPreviousWeek,
    getNextWeek,
    updateMonthAndYear,
    filteredMainEmotions,
  }
})
