import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import StartView from '@/views/Spaceout/StartView.vue'
import MainView from '@/views/Spaceout/MainView.vue'
import ResultView from '@/views/Spaceout/ResultView.vue'
import RecordView from '@/views/RecordView.vue'
import CalendarView from '@/views/Profile/CalendarView.vue'
import ChartView from '@/views/Profile/ChartView.vue'
import SettingView from '@/views/Profile/SettingView.vue'
import CustomizeView from '@/views/Profile/Setting/CustomizeView.vue'

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
      name: 'Record',
      component: RecordView,
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
