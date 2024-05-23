import { ref, computed, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useUserStore } from './user'
import axios from 'axios'

export const useEmotionStore = defineStore('emotion', () => {
  const useStore = useUserStore()
  const { userId } = storeToRefs(useStore)

  const emotions = ref([])

  // 추가하기 위한 레코드
  const emotionRecords = ref([])
  const emotionRecord = ref(
    {
      emotionRecordId: '',
      userId: 0,
      emotionReason: [],
      emotionRecordType: '',
      emotionRecordLevel: 0,
      emotionRecordState: '',
      diaryEntry: '',
      createdTime: '',
    })

  // 오늘 날짜 데이터
  const todayDate = ref(new Date())
  const todayDay = computed(() => todayDate.value.getDate())
  const todayWeekDay = computed(() => todayDate.value.getDay())

  const todayMainEmotion = ref(null)

  // 선택된 날짜 데이터
  const selectedDate = ref(todayDate.value)
  const selectedDateNum = computed(() => selectedDate.value.getDate())
  const selectedYear = ref(selectedDate.value.getFullYear())
  const selectedMonth = ref(selectedDate.value.getMonth())
  const selectedWeek = ref(0)
  const selectedDateText = computed(() => `${selectedYear.value}년 ${selectedMonth.value + 1}월 ${selectedDateNum.value}일`)
  const selectedFormattedDate = computed(() => selectedDate.value.toISOString().split('T')[0]) // 2024-xx-xx

  const selectedMonthRecords  = ref([])
  const selectedEmotionRecords = ref([])

  // 모든 감정 레코드를 날짜별로 그룹화
  const groupedEmotions = computed(() => groupEmotionByDate(emotions.value))

  // 오늘 날짜에 해당하는 감정 레코드
  const todayEmotions = computed(() => {
    const todayFormatted = todayDate.value.toISOString().split('T')[0]
    return groupedEmotions.value[todayFormatted] || []
  })

  // 오늘의 주요 감정 설정
  watch(todayEmotions, (newEmotions) => {
    todayMainEmotion.value = newEmotions.find(emotion => emotion.emotionRecordState === 'main') || null
  }, { immediate: true })

  const selectedMainEmotion = computed(() => {
    return selectedEmotionRecords.value.find(emotion => emotion.emotionRecordState === 'main') || null
  })

  const selectedMomentEmotions = computed(() => {
    return selectedEmotionRecords.value.filter(emotion => emotion.emotionRecordState === 'moment') || null
  })

  // 만약 달이 바뀐다면 다시 불러와야함
  watch(selectedMonth, async() => {
    selectedMonthRecords.value = await getEmotionRecords(selectedYear.value, selectedMonth.value + 1)
  }, {immediate: true})

  watch(selectedDate, ()=>{
    selectedEmotionRecords.value = selectedMonthRecords.value ?.[selectedFormattedDate.value] || []
    // console.log(selectedEmotionRecords.value)
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

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`
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
    emotionRecord.value =
    {
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

    console.log(sortedEmotionsByDate)
    // emotionRecords.value = sortedEmotionsByDate
    return sortedEmotionsByDate
  }

  /**
   * API Controls
   */
  // 사용자의 감정 전체 데이터 가져오기
  async function getEmotionRecords(year, month) {
    try {
      const response = await axios.get(`http://localhost:8080/api-zerogravity/emotions/records/${userId.value}`, {
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
    console.log('yes')
    console.log(emotionData)
    try {
      const response = await axios.post('http://localhost:8080/api-zerogravity/emotions/records', emotionData)
      console.log('✅ Emotion Record Created:', response)

      await refreshEmotionRecords()
    } catch (error) {
      console.error('😱 Error creating emotion record:', error)
    }
  }

  // 사용자의 감정 업데이트
  async function updateEmotionRecord(emotionRecordId, emotionUpdateData) {
    try {
      const response = await axios.put(`http://localhost:8080/api-zerogravity/emotions/records/${emotionRecordId}`, emotionUpdateData)
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

  return {
    emotions,
    emotionRecords,
    emotionRecord,
    todayDate,
    todayDay,
    todayWeekDay,
    todayMainEmotion,
    selectedDate,
    selectedYear,
    selectedMonth,
    selectedWeek,
    selectedDateText,
    selectedEmotionRecords,
    selectedMainEmotion,
    selectedMomentEmotions,
    selectedMonthRecords,
    formatDateToTimestamp,
    resetEmotionRecordToSession,
    getEmotionRecords,
    createEmotionRecord,
    updateEmotionRecord,
    saveEmotionRecordToSession,
    getEmotionRecordToSession,
  }
})
