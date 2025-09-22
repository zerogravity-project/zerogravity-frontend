import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const dailyChartStore = defineStore('chart', () => {
    const dailyCharts = ref([])
    const countCharts = ref([])
    const dailyChart = ref({
        dailyChartId: null,
        dailySum: null,
        dailyCount: null,
        dailyAverage: null,
        createdTime: null,
    })
    const countChart = ref({
        emotionRecordId: null,
        emotionReason: null,
        emotionRecordType: null,
        emotionRecordLevel: null,
        emotionRecordState: null,
        diaryEntry: null,
    })

    async function getAllCharts(period, searchDate) {
        try {
            const response = await axios.get('/chart/level', {
                params: { period, searchDate },
            })
            dailyCharts.value = response.data
        } catch (error) {
            console.error('Error fetching chart:', error)
        }
    }

    async function getAllCounts(period, searchDate) {
        try {
            const response = await axios.get('/chart/count', {
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
