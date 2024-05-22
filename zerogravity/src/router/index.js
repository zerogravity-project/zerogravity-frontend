import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import StartView from '@/views/spaceout/StartView.vue'
import MainView from '@/views/spaceout/MainView.vue'
import ResultView from '@/views/spaceout/ResultView.vue'
import EmotionView from '@/views/record/EmotionView.vue'
import ReasonView from '@/views/record/ReasonView.vue'
import DiaryView from '@/views/record/DiaryView.vue'
import CalendarView from '@/views/profile/CalendarView.vue'
import ChartView from '@/views/profile/ChartView.vue'
import SettingView from '@/views/profile/SettingView.vue'
import CustomizeView from '@/views/profile/setting/CustomizeView.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const perRouteGuardForLoggin = (to, from) => {
  console.log(`form: ${from.path} => to: ${to.path}`)
  return true
}

const checkBeforeRecordEmotion = async (to, from, next) => {
  const userStore = useUserStore()
  const { recordStatus } = storeToRefs(userStore)

  userStore.getRecordStatusToSession()

  // 만약 유저가 명상을 완료했거나 감정 기록을 했다면
  if (recordStatus.value.status === 'meditationComplete' || recordStatus.value.status === 'newEmotionRecord') {
    next()
  } else {
    next(from.fullPath)
  }
}

const checkBeforeRecordReason = async () => {
  const userStore = useUserStore()
  const { recordStatus } = storeToRefs(userStore)

  userStore.getRecordStatusToSession()
  // 만약 유저가 감정을 체크를 했다면 진입 가능
  if (recordStatus.value.status === 'emotionChecked') {
    return true
  } else {
    return false
  }
}

const checkBeforeRecordDiary = async () => {
  const userStore = useUserStore()
  const { recordStatus } = storeToRefs(userStore)

  userStore.getRecordStatusToSession()
  // 만약에 유저가 원인 체크했고, main 감정 기록이라면
  if ((recordStatus.value.status === 'reasonChecked' && recordStatus.value.type === 'main') ||
  recordStatus.value.type === 'diary'
  ) {
    return true
  } else {
    return false
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      beforeEnter: [perRouteGuardForLoggin],
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      beforeEnter: [perRouteGuardForLoggin],
    },
    {
      path: '/spaceout',
      children: [
        {
          path: 'start',
          name: 'SpaceoutStart',
          component: StartView,
          beforeEnter: [perRouteGuardForLoggin],
        },
        {
          path: 'main',
          name: 'SpaceoutMain',
          component: MainView,
          beforeEnter: [perRouteGuardForLoggin],
        },
        {
          path: 'result',
          name: 'SpaceoutResult',
          component: ResultView,
          beforeEnter: [perRouteGuardForLoggin],
        },
      ],
    },
    {
      path: '/record',
      children: [
        {
          path: 'emotion',
          name: 'EmotionRecord',
          component: EmotionView,
          beforeEnter: [perRouteGuardForLoggin, checkBeforeRecordEmotion],
        },
        {
          path: 'reason',
          name: 'ReasonRecord',
          component: ReasonView,
          beforeEnter: [perRouteGuardForLoggin, checkBeforeRecordReason],
        },
        {
          path: 'diary',
          name: 'DiaryRecord',
          component: DiaryView,
          beforeEnter: [perRouteGuardForLoggin, checkBeforeRecordDiary],
        },
      ],
    },
    {
      path: '/profile',
      children: [
        {
          path: 'calendar',
          name: 'Calendar',
          component: CalendarView,
          beforeEnter: [perRouteGuardForLoggin],
        },
        {
          path: 'chart',
          name: 'Chart',
          component: ChartView,
          beforeEnter: [perRouteGuardForLoggin],
        },
        {
          path: 'setting',
          name: 'Setting',
          component: SettingView,
          beforeEnter: [perRouteGuardForLoggin],
          children: [
            {
              path: 'customize',
              name: 'Customize',
              component: CustomizeView,
              beforeEnter: [perRouteGuardForLoggin],
            },
          ],
        },
      ],
    },
  ],
})

export default router
