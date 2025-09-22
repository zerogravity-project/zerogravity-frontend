import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api-zerogravity`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 요청 보내기 전 수행할 작업
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('인증 에러가 발생했습니다.')
      // 여기서 로그인 페이지로 리다이렉트하거나 다른 처리를 할 수 있습니다
    }
    return Promise.reject(error)
  },
)

export default axiosInstance