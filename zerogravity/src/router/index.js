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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/spaceout',
      children: [
        {
          path: 'start',
          name: 'SpaceoutStart',
          component: StartView,
        },
        {
          path: 'main',
          name: 'SpaceoutMain',
          component: MainView,
        },
        {
          path: 'result',
          name: 'SpaceoutResult',
          component: ResultView,
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
        },
        {
          path: 'reason',
          name: 'ReasonRecord',
          component: ReasonView,
        },
        {
          path: 'diary',
          name: 'DiaryRecord',
          component: DiaryView,
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
        },
        {
          path: 'chart',
          name: 'Chart',
          component: ChartView,
        },
        {
          path: 'setting',
          name: 'Setting',
          component: SettingView,
          children: [
            {
              path: 'customize',
              name: 'Customize',
              component: CustomizeView,
            },
          ],
        },
      ],
    },
  ],
})

export default router
