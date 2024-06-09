import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import { useUserStore } from './user'

export const dailyChartStore = defineStore('chart', () => {
    const useStore = useUserStore()
    const { userId } = storeToRefs(useStore)

    const dailyCharts = ref([])
    const countCharts = ref([])
    const dailyChart = ref({
        dailyChartId: null,
        userId: null,
        dailySum: null,
        dailyCount: null,
        dailyAverage: null,
        createdTime: null,
    })
    const countChart = ref({
        emotionRecordId: null,
        userId: null,
        emotionReason: null,
        emotionRecordType: null,
        emotionRecordLevel: null,
        emotionRecordState: null,
        diaryEntry: null,
    })

    const formatDateToCustomString = (date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    async function getAllCharts(userId, period, searchDate) {
        try {
            const response = await axios.get(`http://localhost:8080/api-zerogravity/chart/level/${userId}`, {
                params: { period, searchDate },
            })
            dailyCharts.value = response.data
        } catch (error) {
            console.error('Error fetching chart:', error)
        }
    }

    async function getAllCounts(userId, period, searchDate) {
        try {
            const response = await axios.get(`http://localhost:8080/api-zerogravity/chart/count/${userId}`, {
                params: { period, searchDate },
            })
            countCharts.value = response.data
        } catch (error) {
            console.error('Error fetching chart:', error)
        }
    }

    return {
        dailyCharts,
        dailyChart,
        countCharts,
        countChart,
        getAllCharts,
        getAllCounts,
    }
})
