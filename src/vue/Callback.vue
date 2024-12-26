<template>
    <div>
      <p v-if="errorMessage">{{ errorMessage }}</p> <!-- 에러 메시지 표시 -->
      <p v-else>카카오 로그인 완료되었습니다.</p>
      <p v-if="user.name">Welcome, {{ user.name }}!</p>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  export default {
    setup() {
      const user = ref({})
      const errorMessage = ref(null)  // 에러 메시지를 저장할 ref
      const router = useRouter()
  
      const getKakaoToken = async (code) => {
        const data = {
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY, // JavaScript API 키
          redirect_uri: "http://localhost:3001/24-02-WSD-Assignment-02-Demo/kakaologin/callback", // 리디렉션 URI
          code: code
        };
  
        const queryString = Object.keys(data)
          .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
          .join("&");
  
        try {
          const result = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            queryString,
            {
              headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          );
          return result.data;
        } catch (e) {
          console.log(e)
          errorMessage.value = "로그인에 실패했습니다. 잠시 후 다시 시도해주세요."; // 네트워크 오류 처리 메시지
          throw e;  // 예외를 다시 던져서 이후 처리가 가능하게 함
        }
      }
  
      const getKakaoUserInfo = async () => {
        let data = ""
        try {
          const response = await window.Kakao.API.request({ url: "/v2/user/me" })
          data = response
        } catch (error) {
          console.log(error)
          errorMessage.value = "사용자 정보를 가져오는 데 실패했습니다."; // API 호출 실패 시 처리
          throw error; // 예외를 다시 던져서 이후 처리가 가능하게 함
        }
        return data
      }
  
      const setKakaoToken = async (code) => {
        try {
          const data = await getKakaoToken(code)
          window.Kakao.Auth.setAccessToken(data.access_token)
          await setUserInfo(data.access_token) // 전달된 토큰을 setUserInfo로 넘김
        } catch (e) {
          // 여기서 이미 errorMessage가 설정되었기 때문에 추가적인 에러 처리는 필요 없음
        }
      }
  
      const setUserInfo = async (accessToken) => {
        const res = await getKakaoUserInfo()
        const userInfo = {
          name: res.kakao_account.profile.nickname,
          email: res.kakao_account.email
        }
        user.value = userInfo
  
        // 카카오 액세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem('Kakao-Access-Token', accessToken)
  
        // TMDb API Key를 로컬 스토리지에 저장
        localStorage.setItem('TMDb-Key', import.meta.env.VITE_TMDB_API_KEY)
  
        // 사용자 이름과 이메일을 로컬 스토리지에 저장
        localStorage.setItem('User-Name', userInfo.name)
        localStorage.setItem('User-Email', userInfo.email)
  
        // 유저 이름과 이메일만 콘솔에 찍기
        console.log('User Name:', userInfo.name)
        console.log('User Email:', userInfo.email)
  
        // 로그인 후 메인 페이지로 리디렉션
        router.push('/')
      }
  
      onMounted(() => {
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.has("code")) {
          const code = urlParams.get("code")
          setKakaoToken(code)
        }
      })
  
      return { user, errorMessage }
    }
  }
  </script>
  