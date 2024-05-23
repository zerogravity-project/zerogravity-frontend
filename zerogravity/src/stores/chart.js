import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const dailyChartStore = defineStore('chart', () => {
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
        getAllCharts,
        countCharts,
        countChart,
        getAllCounts,
    }
})
