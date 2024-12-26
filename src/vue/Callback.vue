<template>
    <div>
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <p v-else-if="isLoading">로딩중...</p>
      <p v-else>카카오 로그인 완료되었습니다.</p>
      <p v-if="user.name">Welcome, {{ user.name }}!</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  export default {
    setup() {
      const user = ref({})
      const errorMessage = ref(null)
      const isLoading = ref(true)
      const router = useRouter()
  
      const getKakaoToken = async (code) => {
        try {
          console.log("getkakaotoken");
          const data = {
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY,
            redirect_uri: `${window.location.origin}/WSD-Assignment-04/kakaologin/callback`,
            code: code
          }
  
          const queryString = Object.keys(data)
            .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
            .join("&")
  
          const result = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            queryString,
            {
              headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          )
          return result.data
        } catch (e) {
          errorMessage.value = "로그인에 실패했습니다. 잠시 후 다시 시도해주세요."
          isLoading.value = false
          return null
        }
      }
  
      const getKakaoUserInfo = async () => {
        try {
          console.log("getkakaouserinfo");
          if (!window.Kakao?.API) {
            throw new Error('Kakao SDK not initialized')
          }
          const response = await window.Kakao.API.request({ url: "/v2/user/me" })
          return response
        } catch (error) {
          errorMessage.value = "사용자 정보를 가져오는 데 실패했습니다."
          isLoading.value = false
          return null
        }
      }
  
      const setKakaoToken = async (code) => {
        try {
          console.log("setkakotoken");
          const data = await getKakaoToken(code)
          if (!data) return
          
          window.Kakao.Auth.setAccessToken(data.access_token)
          await setUserInfo(data.access_token)
        } catch (e) {
          errorMessage.value = "토큰 설정에 실패했습니다."
          isLoading.value = false
        }
      }
  
      const setUserInfo = async (accessToken) => {
        try {
          console.log("setuserinfo");
          const res = await getKakaoUserInfo()
          if (!res) return
  
          const userInfo = {
            name: res.kakao_account.profile.nickname,
            email: res.kakao_account.email
          }
          user.value = userInfo
  
          localStorage.setItem('Kakao-Access-Token', accessToken)
          localStorage.setItem('TMDb-Key', import.meta.env.VITE_TMDB_API_KEY)
          localStorage.setItem('User-Name', userInfo.name)
          localStorage.setItem('User-Email', userInfo.email)
  
          isLoading.value = false
          router.push('/')
        } catch (e) {
          errorMessage.value = "사용자 정보 저장에 실패했습니다."
          isLoading.value = false
        }
      }
  
      onMounted(async () => {
        try {
          console.log("onmounted");
          const urlParams = new URLSearchParams(window.location.search)
          if (urlParams.has("code")) {
            const code = urlParams.get("code")
            await setKakaoToken(code)
          } else {
            isLoading.value = false
          }
        } catch (e) {
          errorMessage.value = "초기화 중 오류가 발생했습니다."
          isLoading.value = false
        }
      })
  
      return { user, errorMessage, isLoading }
    }
  }
  </script>
  